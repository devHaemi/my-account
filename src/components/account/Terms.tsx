import { useState, MouseEvent } from 'react'

import { AccountTerms } from '@constants/account'
import { Term } from '@models/account'
import Agreement from '@components/shared/Agreement'
import FixedBottomButton from '@components/shared/FixedBottomButton'

function Terms({ onNext }: { onNext: (tremIds: string[]) => void }) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(AccountTerms),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) =>
        term.id === id ? { ...term, checked } : term,
      )
    })
  }

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) => ({
        ...term,
        checked,
      }))
    })
  }

  const isAllTermsAgreed = termsAgreements.every((term) => term.checked)
  const isAllRequiredTermsAgreed = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title
          checked={isAllTermsAgreed}
          onChange={handleAllAgreement}
        >
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => handleAgreement(term.id, checked)}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={isAllRequiredTermsAgreed === false}
        onClick={() => {
          onNext(
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }}
      />
    </div>
  )
}

function generateInitialValues(terms: Term[]) {
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
