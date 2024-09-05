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
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from '@/libs/firebase/config';
import { NoteType } from '@/type/note';

export const getNoteList = async (uid: string) => {
  const q = query(
    collection(db, 'users', uid, 'notes'),
    orderBy('date', 'desc'),
    limit(20)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), docId: doc.id };
  });
  return data as NoteType[];
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
