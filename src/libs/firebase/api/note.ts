import {
  collection,
  getDoc,
  getDocs,
  doc,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/libs/firebase/config';
import { NoteType } from '@/type/note';

export const getNoteList = async (uid: string) => {
  const q = query(
    collection(db, 'note'),
    where('uid', '==', `${uid}`),
    orderBy('date', 'desc'),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
  return data as NoteType[];
};

export const getNote = async (docId: string) => {
  const snapShot = await getDoc(doc(db, 'note', docId));
  const deta = snapShot.data();
  return deta as NoteType;
};
