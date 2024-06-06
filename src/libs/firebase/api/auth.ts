import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/libs/firebase/config';
import { auth } from '@/libs/firebase/config';

export const signInWithEmail = async (args: { mail: string; pass: string }) => {
  try {
    const user = await signInWithEmailAndPassword(auth, args.mail, args.pass);
    return user;
  } catch (error) {
    alert('サインイン認証に失敗しました。');
    return false;
  }
};

export const signUpWithEmail = async (args: { mail: string; pass: string }) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      args.mail,
      args.pass
    ).then(async (userCredential) => {
      const ref = doc(db, 'users', userCredential.user.uid);
      await setDoc(ref, {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      });
      return userCredential.user.uid;
    });
    return user;
  } catch (error) {
    alert('ユーザー登録に失敗しました。');
    return false;
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    alert('サインアウトに失敗しました。');
  }
};
