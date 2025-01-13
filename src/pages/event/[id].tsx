import { Event } from '@models/event'
import getEvent from '@remote/event'
import { GetServerSidePropsContext } from 'next'

interface EventPageProps {
  initialEvent: Event
  id: string
}

function EventPage({ initialEvent, id }: EventPageProps) {
  console.log(initialEvent)

  return <div>EventPage</div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)

  return {
    props: {
      id,
      initialEvent: event,
    },
  }
}

export default EventPage
