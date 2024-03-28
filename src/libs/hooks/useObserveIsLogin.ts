import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { signInUserAtom } from '@/recoil/atom/signInuserAtom';

export const useObserveIsLogin = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserAtom);
  const resetStatus = useResetRecoilState(signInUserAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
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
