import Link from 'next/link';
import Image from 'next/image';

const MainSection = () => {
  return (
    <section className='flex-center mb-100 flex-col mb-24'>
      <div className='flex justify-center items-center'>
        <Image src={"/illustration.png"} alt='Illustration' width={722} height={422.76} />
      </div>
      <div className='flex flex-center pt-12 mt-50 justify-center text-[76px] gap-7'>
        <div className='text-center font-bold text-gray-50'>새로운 일정 관리</div>
        <div className='font-bold text-violet-100'>Taskify</div>
      </div>
      <div className='pt-6 whitespace-break-spaces text-center text-[18px] text-gray-50'>서비스의 메인 설명 들어가는 부분인데 뭐라고 쓰지</div>
      <div className='flex justify-center'>
        <button className='w-[280px] h-[50px] text-center bg-violet-100 text-white text-[18px] rounded-lg hover:bg-violet-100/80 mt-[66px]'>
          <Link href='/login'>로그인하기</Link>
        </button>
      </div>
    </section>
  );
};

export default MainSection;