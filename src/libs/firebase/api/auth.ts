import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/libs/firebase/config';

export const signInWithEmail = async (args: {
  email: string;
  password: string;
}) => {
  try {
    const user = await signInWithEmailAndPassword(
      auth,
      args.email,
      args.password
    );
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const signUpWithEmail = async (args: {
  email: string;
  password: string;
}) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      args.email,
      args.password
    );
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};
