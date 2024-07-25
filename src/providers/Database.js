import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  serverTimestamp,
  writeBatch,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from './Firebase'
import { uuid } from './Helpers'

const Database = {}

Database.add = async (store, data) => {
  const docData = data

  if (!data.id) docData.id = uuid()
  docData.dateCreated = serverTimestamp()
  const ref = doc(db, `${store}/${docData.id}`)
  await setDoc(ref, data)
  return docData
}

Database.update = async (store, data) => {
  if (!data.id) return false

  const docData = data
  docData.dateUpdated = serverTimestamp()
  const ref = doc(db, `${store}/${data.id}`)
  await updateDoc(ref, data)
  return docData
}


Database.get = async (store, id) => {
  if (id) {
    const ref = doc(db, store, id)
    const docSnap = await getDoc(ref)
    const data = docSnap.data()
    return data
  }

  const ref = collection(db, store)
  const docSnaps = await getDocs(ref)
  const data = []
  docSnaps.forEach((snap) => data.push(snap.data()))
  return data
}

Database.delete = async (store, id) => {
  const ref = doc(db, store, id)
  return deleteDoc(ref)
}

Database.find = async (store, field, value) => {
  const ref = collection(db, store)
  const q = query(ref, where(field, '==', value))

  const querySnaps = await getDocs(q)
  const data = []
  querySnaps.forEach((snap) => data.push(snap.data()))

  return data
}

Database.query = async (store, conditions) => {
  const ref = collection(db, store)
  const qs = []
  conditions.forEach((condition) => {
    qs.push(where(condition.field, condition.operator, condition.value))
  })
  const q = query(ref, ...qs)

  const querySnaps = await getDocs(q)
  const data = []
  querySnaps.forEach((snap) => data.push(snap.data()))

  return data
}

Database.createAccount = async (newAccount, newUser) => {
  const batch = writeBatch(db)

  const userRef = doc(db, 'users', newUser.id)
  batch.set(userRef, newUser)

  const accountRef = doc(db, 'accounts', newAccount.id)
  batch.set(accountRef, newAccount)

  return batch.commit()
}

Database.getRef = (store, id) => {
  if (id) return doc(db, store, id)
  return collection(db, store)
}

Database.observe = (store, observer) => {
  return onSnapshot(collection(db, store), observer)
}

export default Database
