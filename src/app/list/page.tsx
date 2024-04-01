'use client';
import { Header } from '@/components/parts/header';
import { useAuth } from '@/libs/hooks/useAuth';

const ListPage = () => {
  const userAuth = useAuth();

  return (
    <>
      <Header />
      <div className="h-screen flex justify-center items-center px-3">
        <p>ログイン成功</p>
        {userAuth.uid}
      </div>
    </>
  );
};

export default ListPage;
