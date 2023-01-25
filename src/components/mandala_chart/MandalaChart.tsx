import { useEffect, useState } from 'react';

import { fetchMandala } from '../../lib/api/mandala';
import Modal from './Modal';
import NineSquare from './NineSquare';
import { Mission, SubMission, Todo } from '../../interfaces/mandala';

interface ModalState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  data: Mission | SubMission | Todo | null;
  parentData: Mission | SubMission | null;
  position?: number;
}

const MandalaChart = () => {
  const [mandalaState, setMandalaState] = useState<
    (Mission | SubMission | Todo | null)[][]
  >([]);

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    item: '',
    data: null,
    parentData: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMandala();
      setMandalaState([...res?.data.data]);
    };
    fetchData();
  }, []);

  return (
    <>
      {modalState.isOpen && (
        <Modal
          modalState={modalState}
          setModalState={setModalState}
          setMandalaState={setMandalaState}
        />
      )}
      <div className="grid grid-cols-3 grid-rows-3 mt-6 mx-auto border  border-gray-300 w-84 h-84 sm:w-120 sm:h-120 md:w-156 md:h-156 md:mt-10 lg:ml-8 2xl:w-192 2xl:h-192 2xl:ml-12">
        {mandalaState.map((datas, i) => (
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
