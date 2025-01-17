import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import Text from '@components/shared/Text'
import CardListAddButton from '@components/test/CardListAddButton'
import EventBannerAddButton from '@components/test/EventBannerAddButton'
import EventForm from '@components/test/EventForm'

function TestPage() {
  return (
    <Flex direction="column">
      <Text bold={true}>배너</Text>
      <EventBannerAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>카드</Text>
      <CardListAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />

      <Text bold={true}>이벤트</Text>
      <EventForm />
    </Flex>
  )
}

export default TestPage
