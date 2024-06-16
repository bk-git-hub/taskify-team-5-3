import Header from '@/components/landing/MainHeader';
import MainSection from '@/components/landing/MainSection';
import FirstPoint from '@/components/landing/FirstPoint';
import SecondPoint from '@/components/landing/SecondPoint';
import SettingSection from '@/components/landing/SettingSection';
import MainFooter from '@/components/landing/MainFooter';

const MainPage = () => {
  return (
    <>
      <main className='flex flex-center flex-col gap-24 bg-gray-900'>
        <Header />
        <MainSection />
        <FirstPoint />
        <SecondPoint />
        <SettingSection />
        <MainFooter />
      </main>
    </>
  );
};

export default MainPage;
