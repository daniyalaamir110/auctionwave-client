import FeaturesSection from "./FeaturesSection";
import GetStartedSection from "./GetStartedSection";
import IntroSection from "./IntroSection";
import WhyUsSection from "./WhyUsSection";

const HomePage = () => {
  return (
    <div className="m-[-2rem]">
      <IntroSection />
      <FeaturesSection />
      <WhyUsSection />
      <GetStartedSection />
    </div>
  );
};

export default HomePage;
