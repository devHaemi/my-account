import { collection, doc, setDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import { PiggyBank } from '@models/piggybank'

export function createPiggyBank(newPiggyBank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggyBank)
}
