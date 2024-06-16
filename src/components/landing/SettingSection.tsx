import Image from 'next/image';

const SettingSection = () => {
  return (
    <section className="mt-[90px]">
      <h4 className="flex text-[28px] ml-[360px] font-bold text-gray-50">생산성을 높이는 다양한 설정 ⚡</h4>
      <ul className="mx-[360px] mt-[36px] lg:flex gap-[33px]">
        <li className="w-full lg:w-[32%] xl:w-[378px]">
          <div className="h-[69.333vw] bg-gray-600 flex items-center justify-center rounded-t-lg lg:h-[260px]">
            <Image src={"/setting.png"} alt="setting" width={300} height={123} />
          </div>
          <div className="p-[32px] bg-gray-800 text-[18px] rounded-b-lg text-gray-50">
            <h5 className="font-bold text-[18px]">대시보드 설정</h5>
            <p className="text-[16px] mt-[18px]">대시보드 사진과 이름을 변경할 수 있어요.</p>
          </div>
        </li>
        <li className="w-full lg:w-[32%] xl:w-[378px]">
          <div className="h-[69.333vw] bg-gray-600 flex items-center justify-center rounded-t-lg lg:h-[260px]">
            <Image src={"/invite.png"} alt="invite" width={300} height={230} />
          </div>
          <div className="p-[32px] bg-gray-800 text-[18px] rounded-b-lg text-gray-50">
            <h5 className="font-bold text-[18px]">초대</h5>
            <p className="text-[16px] mt-[18px]">새로운 팀원을 초대할 수 있어요.</p>
          </div>
        </li>
        <li className="w-full lg:w-[32%] xl:w-[378px]">
          <div className="h-[69.333vw] bg-gray-600 flex items-center justify-center rounded-t-lg lg:h-[260px]">
            <Image src={"/member.png"} alt="member" width={300} height={195} />
          </div>
          <div className="p-[32px] bg-gray-800 text-[18px] rounded-b-lg text-gray-50">
            <h5 className="font-bold text-[18px]">구성원</h5>
            <p className="text-[16px] mt-[18px]">구성원을 초대하고 내보낼 수 있어요.</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default SettingSection;
