'use client';
import { useState } from 'react';
import { Input } from '@/components/elements/input';
import { Button } from '@/components/elements/button';

import { signInWithEmail } from '@/libs/firebase/api/auth';

const SignIn = () => {
  const [mail, setMail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const onSubmit = async () => {
    signInWithEmail({ email: mail, password: pass });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-3/4 h-1/2 border-solid border-2">
        <h1>ログイン</h1>
        <span className="block mt-2">メールアドレスでログインする</span>
        <div className="mt-2">
          <Input
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            label="メールアドレス"
            placeholder="sample@taster.com"
          />
        </div>
        <div className="mt-2">
          <Input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            label="パスワード"
            placeholder="0123456abc"
          />
        </div>
        <div className="mt-2">
          <Button onClick={() => onSubmit()} text="ログイン" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
