'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/elements/input';
import { Button } from '@/components/elements/button';
import { signUpWithEmail } from '@/libs/firebase/api/auth';

const SignIn = () => {
  const [signupInfo, setSignupInfo] = useState<{
    mail: string;
    pass: string;
    confirmPass: string;
  }>({
    mail: '',
    pass: '',
    confirmPass: '',
  });
  const router = useRouter();

  const onSubmit = async () => {
    const user = await signUpWithEmail({
      mail: signupInfo.mail,
      pass: signupInfo.pass,
    });
    if (user) {
      router.push('list');
    }
  };

  return (
    <div className="max-w-md w-full">
      <h1 className="font-bold text-center text-2xl">新規会員登録</h1>
      <div className="mt-2">
        <Input
          type="email"
          value={signupInfo.mail}
          onChange={(e) =>
            setSignupInfo({ ...signupInfo, mail: e.target.value })
          }
          label="メールアドレス"
          placeholder="sample@taster.com"
        />
      </div>
      <div className="mt-4">
        <Input
          type="password"
          value={signupInfo.pass}
          onChange={(e) =>
            setSignupInfo({ ...signupInfo, pass: e.target.value })
          }
          label="パスワード"
          placeholder="半角英数字6~20文字以内"
        />
      </div>
      <div className="mt-4">
        <Input
          type="password"
          value={signupInfo.confirmPass}
          onChange={(e) =>
            setSignupInfo({ ...signupInfo, confirmPass: e.target.value })
          }
          label="確認用パスワード"
          placeholder="パスワードを入力してください"
        />
      </div>
      <div className="mt-8">
        <Button
          onClick={() =>
            signupInfo.pass === signupInfo.confirmPass
              ? onSubmit()
              : alert('パスワードが異なっています。')
          }
          text="登録する"
        />
      </div>
    </div>
  );
};

export default SignIn;
