import { collection, doc, getDoc } from 'firebase/firestore'

import { store } from '@remote/firebase'
import { COLLECTIONS } from '@constants/collection'
import { Event } from '@models/event'

async function getEvent(id: string) {
  const snapshot = await getDoc(doc(collection(store, COLLECTIONS.EVENT), id))

  return {
    id: snapshot.id,
    ...(snapshot.data() as Event),
  }
}

export default getEvent
