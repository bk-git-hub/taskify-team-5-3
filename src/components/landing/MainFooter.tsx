import Image from 'next/image';

const MainFooter = () => {
  return (
      <div className='w-full h-[100px] flex flex-center items-center justify-between text-gray-400 px-[140px]'>
        <div>@codeit - 2023</div>
        <div className='flex justify-between gap-[32px] whitespace-nowrap'>
          <a className='flex items-center' href='/privacy'>
            Privacy Policy
          </a>
          <a className='flex items-center' href='/faq'>
            FAQ
          </a>
        </div>
        <div className='flex gap-[14px]'>
          <button className='w-[20px] h-[20px]'>
            <Image src={"/email.svg"} alt='email' height={15} width={20} />
          </button>

          <button className='w-[20px] h-[20px]'>
            <Image src={"/facebook.svg"} alt='facebook' height={20} width={20} />
          </button>
          <button className='w-[20px] h-[20px]'>
            <Image src={"/instagram.svg"} alt='instagram' height={20} width={20} />
          </button>
        </div>
      </div>
  );
};

export default MainFooter;