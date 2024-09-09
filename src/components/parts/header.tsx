'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/elements/button';
import { HamburgerMenu } from '@/components/parts/menu';
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
        {parhName !== '/' && <HamburgerMenu />}
      </div>
    </header>
  );
};
