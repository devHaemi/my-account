import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { format } from 'date-fns'

import withAuth from '@hooks/withAuth'
import Flex from '@components/shared/Flex'
import TextField from '@components/shared/TextField'
import { PiggyBank } from '@models/piggybank'
import useUser from '@hooks/useUser'
import { useMutation } from 'react-query'
import { createPiggyBank } from '@remote/piggybank'
import { useAlertContext } from '@contexts/AlertContext'

const FixedBottomButton = dynamic(
  () => import('@components/shared/FixedBottomButton'),
  {
    ssr: false,
  },
)

function NewPiggyBankPage() {
  const { open } = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const user = useUser()

  const { mutate, isLoading } = useMutation(
    (newPiggyBank: PiggyBank) => createPiggyBank(newPiggyBank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통을 만들었어요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
      onError: (error) => {
        open({
          title: '저금통 생성에 실패했어요.',
          description: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleSubmit = () => {
    const newPiggyBank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as PiggyBank

    mutate(newPiggyBank)

    console.log(newPiggyBank)
  }

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  return (
    <div>
      <Flex direction="column">
        <TextField
          name="name"
          label="통장이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <TextField
          type="date"
          name="endDate"
          label="종료일자"
          min={minDate}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <TextField
          type="number"
          name="goalAmount"
          label="목표금액"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
      </Flex>
      <FixedBottomButton
        label="저금통 생성하기"
        onClick={() => handleSubmit()}
        disabled={isLoading === true}
      />
    </div>
  )
}

export default withAuth(NewPiggyBankPage)
