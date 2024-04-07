import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/libs/firebase/config';
import { NoteType } from '@/type/note';

export const getNote = async (uid: string) => {
  const q = query(
    collection(db, 'note'),
    where('uid', '==', `${uid}`),
    orderBy('date', 'desc'),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data());

  return data as NoteType[];
};
