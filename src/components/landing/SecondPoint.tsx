import Image from 'next/image';

const SecondPoint = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex w-[1200px] h-[600px] flex-col rounded-md bg-gray-800 relative'>
        <div className='rounded-md bottom-0 left-[108px] absolute'>
          <Image src={"/todo.png"} alt='todo' width={436} height={502} />
        </div>
        <div className='text-left'>
          <div className='ml-[644px] mt-[123px] text-18 text-gray-400'>Point2</div>
          <div className='ml-[644px] mt-[100px] whitespace-nowrap text-[48px] font-bold text-gray-50'>해야 할 일을</div>
          <div className='ml-[644px] whitespace-nowrap text-[48px] font-bold text-gray-50'>등록하세요</div>
        </div>
      </div>
    </div>
  );
};

export default SecondPoint;