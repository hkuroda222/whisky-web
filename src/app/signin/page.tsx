'use client';
import { useState } from 'react';
import { Input } from '@/components/elements/input';
import { Button } from '@/components/elements/button';

import { signInWithEmail } from '@/libs/firebase/api/auth';

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState<{ mail: string; pass: string }>({
    mail: '',
    pass: '',
  });

  const onSubmit = async () => {
    signInWithEmail(loginInfo);
  };

  return (
    <div className="h-screen flex justify-center items-center px-3">
      <div className="flex flex-col justify-center items-center px-4 py-14 max-w-screen-md w-full h-1/2 border-solid border-2 rounded">
        <div className="max-w-md w-full">
          <h1 className="font-bold text-center text-2xl">ログイン</h1>
          {/* <span className="block mt-2">メールアドレスでログインする</span> */}
          <div className="mt-2">
            <Input
              type="email"
              value={loginInfo.mail}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, mail: e.target.value })
              }
              label="メールアドレス"
              placeholder="sample@taster.com"
            />
          </div>
          <div className="mt-4">
            <Input
              type="password"
              value={loginInfo.pass}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, pass: e.target.value })
              }
              label="パスワード"
              placeholder="半角英数字6~20文字以内"
            />
          </div>
          <div className="mt-8">
            <Button onClick={() => onSubmit()} text="ログイン" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
