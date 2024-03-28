import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
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

export const signUpWithEmail = async (args: {
  email: string;
  password: string;
}) => {
  try {
    await createUserWithEmailAndPassword(auth, args.email, args.password);
  } catch (error) {
    alert('ユーザー登録に失敗しました。');
  }
};

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    alert('サインアウトに失敗しました。');
  }
};
