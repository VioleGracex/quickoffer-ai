import HeaderHome from "../../components/home/HeaderHome";
import Section1 from "../../components/home/Section1";
import Section2 from "../../components/home/Section2";
import Section3 from "../../components/home/Section3";
import PricingHome from "../../components/home/PricingHome";
import FooterHome from "../../components/home/FooterHome";

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <main className="mt-16">
        <Section1 />
        <Section2 />
        <Section3 />
        <PricingHome />
      </main>
      <FooterHome />
    </div>
  );
};

export default Home;