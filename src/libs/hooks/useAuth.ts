import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { signInUserAtom } from '@/recoil/atom/signInuserAtom';
import { auth } from '../firebase/config';

export const useAuth = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserAtom);
  const resetStatus = useResetRecoilState(signInUserAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignInUser({
          uid: user.uid,
        });
      } else {
        resetStatus();
      }
    });
    return () => unsubscribe();
  }, [setSignInUser, resetStatus]);

  return signInUser;
};
