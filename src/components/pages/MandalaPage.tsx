import MandalaChart from '../mandala_chart/MandalaChart';
import PostSum from '../post/PostSum';

const MandalaPage = () => {
  return (
    <div className="flex">
      <MandalaChart />
      <div className="mt-10 hidden md:block md:w-1/3 lg:w-5/12 lg:mx-auto">
        <PostSum />
      </div>
    </div>
  );
};

export default MandalaPage;
