import {
  collection,
  getDoc,
  getDocs,
  doc,
  limit,
  orderBy,
  query,
  addDoc,
  updateDoc,
  startAfter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '@/libs/firebase/config';
import { NoteType } from '@/type/note';

export const getNoteList = async (uid: string, listLimit: number) => {
  const q = query(
    collection(db, 'users', uid, 'notes'),
    orderBy('date', 'desc'),
    limit(listLimit)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { data: data as NoteType[], lastVisible: lastVisible };
};

export const getNextList = async (
  uid: string,
  lastVisible: QueryDocumentSnapshot,
  listLimit: number
) => {
  const q = query(
    collection(db, 'users', uid, 'notes'),
    orderBy('date', 'desc'),
    startAfter(lastVisible),
    limit(listLimit)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
  const nextLastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { data: data as NoteType[], nextLastVisible: nextLastVisible };
};

export const getNote = async (uid: string, docId: string) => {
  const snapShot = await getDoc(doc(db, 'users', uid, 'notes', docId));
  const deta = snapShot.data();
  return deta as NoteType;
};

export const addNote = async (noteData: NoteType) => {
  const ref = collection(db, 'users', noteData.uid, 'notes');
  await addDoc(ref, noteData);
};

export const updateNote = async (noteData: NoteType, docId: string) => {
  const docRef = doc(db, 'users', noteData.uid, 'notes', docId);
  await updateDoc(docRef, noteData);
};

export const uploadImage = async (file: File) => {
  const timestamp = new Date().getTime();
  const uniqueFilename = `${timestamp}_${file.name}`;
  const storageRef = ref(storage, `images/${uniqueFilename}`);

  const snapShot = await uploadBytes(storageRef, file);
  const imageUrl = await getDownloadURL(snapShot.ref);
  return imageUrl;
};

export const deleteImage = async (imageUrl: string) => {
  const deleteRef = ref(storage, imageUrl);
  await deleteObject(deleteRef);
};
