'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/elements/input';
import { Button } from '@/components/elements/button';
import { signInWithEmail } from '@/libs/firebase/api/auth';

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState<{ mail: string; pass: string }>({
    mail: '',
    pass: '',
  });
  const router = useRouter();

  const onSubmit = async () => {
    const user = await signInWithEmail(loginInfo);
    if (user) {
      router.push('list');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <h1 className="font-bold text-center text-2xl">ログイン</h1>
      {/* <span className="block mt-2">メールアドレスでログインする</span> */}
      <div className="mt-2 w-full">
        <Input
          type="email"
          value={loginInfo.mail}
          onChange={(e) => setLoginInfo({ ...loginInfo, mail: e.target.value })}
          label="メールアドレス"
          placeholder="sample@taster.com"
        />
      </div>
      <div className="mt-4 w-full">
        <Input
          type="password"
          value={loginInfo.pass}
          onChange={(e) => setLoginInfo({ ...loginInfo, pass: e.target.value })}
          label="パスワード"
          placeholder="半角英数字6~20文字以内"
        />
      </div>
      <div className="mt-8 w-full">
        <Button onClick={() => onSubmit()} text="ログイン" />
      </div>
      <div className="mt-4 w-full">
        <Button
          onClick={() => router.push('/signup')}
          text="新規会員登録はこちら"
        />
      </div>
    </div>
  );
};

export default SignIn;
