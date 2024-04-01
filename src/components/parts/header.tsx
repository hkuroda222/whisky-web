import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/elements/button';
import { signOut } from '@/libs/firebase/api/auth';

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <header className="text-gray-600 body-font bg-white">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href={'/list'} passHref>
          <span className="flex title-font font-medium items-center mb-4 md:mb-0">
            <span className="ml-3 text-xl">Taster</span>
          </span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Button
            onClick={async () => {
              await signOut();
              router.push('/');
            }}
            text="サインアウト"
          />
        </nav>
      </div>
    </header>
  );
};
