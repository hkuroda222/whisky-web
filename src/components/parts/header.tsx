'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/elements/button';
import { signOut } from '@/libs/firebase/api/auth';

export const Header: React.FC = () => {
  const router = useRouter();
  const parhName = usePathname();

  return (
    <header className="text-gray-600 body-font bg-white">
      <div className="flex justify-between items-center mx-auto p-5">
        <Link
          href={'/list'}
          passHref
          className="flex justify-center items-center title-font font-medium text-xl"
        >
          Taster
        </Link>
        {parhName !== '/' && (
          <nav className="flex justify-center items-center text-base">
            <Button
              onClick={async () => {
                await signOut();
                router.push('/');
              }}
              text="サインアウト"
            />
          </nav>
        )}
      </div>
    </header>
  );
};
