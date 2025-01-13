import { useQuery } from 'react-query'

import { GetServerSidePropsContext } from 'next'
import Preview from '@components/event/Preview'
import getEvent from '@remote/event'
import { Event } from '@models/event'
import { isAfter, parseISO } from 'date-fns'
import { useAlertContext } from '@contexts/AlertContext'

interface EventPageProps {
  initialEvent: Event
  id: string
}

function EventPage({ initialEvent, id }: EventPageProps) {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const isEndEvent = isAfter(new Date(), parseISO(event.endDate))

      if (isEndEvent) {
        open({
          title: `${event.title} 이벤트가 종료되었습니다`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다',
          onButtonClick: () => {
            window.history.back()
          },
        })
      }
    },
  })

  if (data == null) {
    return null
  }

  return <Preview data={data} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query

  const event = await getEvent(id as string)

  console.log(event)

  return {
    props: {
      id,
      initialEvent: event,
    },
  }
}

export default EventPage