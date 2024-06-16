import Image from 'next/image';

const FirstPoint = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex w-[1200px] h-[600px] flex-col rounded-md bg-gray-800 relative'>
        <div className='text-left'>
          <div className='mt-[123px] ml-[60px] text-18 text-gray-400'>Point1</div>
          <div className='mt-[100px] ml-[60px] whitespace-nowrap text-[48px] font-bold text-gray-50'>일의 우선순위를</div>
          <div className='ml-[60px] whitespace-nowrap text-[48px] font-bold text-gray-50'>관리하세요</div>
        </div>
        <div className='rounded-md bottom-0 right-0 absolute'>
          <Image src={"/priority.png"} alt='priority' width={594} height={497.49} />
        </div>
      </div>
    </div>
  );
};

export default FirstPoint;
