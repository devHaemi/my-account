import {
  collection,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { Card } from '@models/card'
import { store } from '@remote/firebase'

export async function getCards(pageParam?: QuerySnapshot<Card>) {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        )
  const cardSnapshot = await getDocs(cardQuery)
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1]

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}
