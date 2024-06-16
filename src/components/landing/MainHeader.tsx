import Link from 'next/link';
import Image from 'next/image';

const MainHeader = () => {
  return (
    <>
      <header className='z-nav flex h-70 w-full items-center justify-between bg-gray-900 px-12'>
        <div className='p-4'>
          <Image src={"/logo-white.svg"} alt='Logo' width={121} height={39} />
        </div>
        <div className='flex gap-9'>
          <Link href='/login'>
            <button className='text-gray-50'>로그인</button>
          </Link>
          <Link href='/signup'>
            <button className='text-gray-50'>회원가입</button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default MainHeader;
