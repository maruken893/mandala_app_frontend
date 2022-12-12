import { useEffect, useState } from 'react';

import { fetchMandala } from '../../lib/api/mandala';
import Modal from '../common/Modal';
import NineSquare from './NineSquare';

interface MandalaState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  content: string;
}

const Top = () => {
  // FIXME: 一旦any型
  const [state, setState] = useState<any>([]);

  const [mandalaState, setMandalaState] = useState<MandalaState>({
    isOpen: false,
    item: '',
    content: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMandala();
      setState([...res?.data.data]);
    };
    fetchData();
  }, []);

  return (
    <div className="">
      {mandalaState.isOpen ? (
        <Modal mandalaState={mandalaState} setMandalaState={setMandalaState} />
      ) : null}
      <div className="grid grid-cols-3 grid-rows-3 mt-6 mx-auto border border-red-700 w-84 h-84 sm:w-120 sm:h-120 md:w-156 md:h-156 md:mt-10 lg:ml-8 2xl:w-192 2xl:h-192 2xl:ml-12">
        {state.map((datas: any, i: number) => (
          <NineSquare
            key={i}
            datas={datas}
            sub_mission_pos={i}
            setMandalaState={setMandalaState}
          />
        ))}
      </div>
    </div>
  );
};

export default Top;
