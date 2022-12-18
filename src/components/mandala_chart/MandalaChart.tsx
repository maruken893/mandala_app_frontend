import { useEffect, useState } from 'react';

import { fetchMandala } from '../../lib/api/mandala';
import Modal from '../common/Modal';
import NineSquare from './NineSquare';

interface ModalState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  // FIXME: 一旦any
  data: any;
  parentData: any;
  position?: number;
}

const MandalaChart = () => {
  // FIXME: 一旦any型 mandala_dataの9x9の配列
  const [mandalaState, setMandalaState] = useState<any>([]);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    item: '',
    data: {},
    parentData: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMandala();
      // console.log(res);
      setMandalaState([...res?.data.data]);
    };
    fetchData();
  }, []);

  return (
    <>
      {modalState.isOpen ? (
        <Modal modalState={modalState} setModalState={setModalState} />
      ) : null}
      <div className="grid grid-cols-3 grid-rows-3 mt-6 mx-auto border  border-gray-300 w-84 h-84 sm:w-120 sm:h-120 md:w-156 md:h-156 md:mt-10 lg:ml-8 2xl:w-192 2xl:h-192 2xl:ml-12">
        {mandalaState.map((datas: any, i: number) => (
          <NineSquare
            key={i}
            datas={datas}
            sub_mission_pos={i}
            mission={mandalaState[4][4]}
            setModalState={setModalState}
          />
        ))}
      </div>
    </>
  );
};

export default MandalaChart;
