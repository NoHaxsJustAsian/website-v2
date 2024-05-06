'use client'
import Header from "./Header";
import MainContent from "./MainContent";
import Skills from "./Skills";

const HomePage = () => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="flex w-full h-full overflow-auto">
            <div className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                <Header />
            </div>
            <div className="pt-24 lg:w-1/2 lg:py-24">
                <MainContent />
                <Skills />
            </div>
        </div>
    </div>
  );
};

export default HomePage;