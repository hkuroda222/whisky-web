import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { onAuthStateChanged } from 'firebase/auth';
import { signInUserAtom } from '@/recoil/atom/signInuserAtom';
import { auth } from '@/libs/firebase/config';

export const useAuth = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserAtom);
  const resetStatus = useResetRecoilState(signInUserAtom);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setSignInUser({
          uid: user.uid,
        });
      } else {
        resetStatus();
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [setSignInUser, resetStatus, router]);

  return signInUser;
};
