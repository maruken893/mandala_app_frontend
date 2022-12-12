import React, { useState } from 'react';
import Modal from '../common/Modal';

interface Data {
  id: number;
  content: string;
  mission_id?: number;
  sub_mission_id?: number;
  created_at: Date;
  updated_at: Date;
  position: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

interface ModalState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  content: string;
}

const colors = [
  'bg-red-400',
  'bg-amber-500',
  'bg-purple-400',
  'bg-indigo-400',
  'bg-gray-200',
  'bg-cyan-300',
  'bg-teal-300',
  'bg-green-400',
  'bg-yellow-300',
  'bg-orange-400',
];

const NineSquare = ({
  datas,
  sub_mission_pos,
  setMandalaState,
}: {
  datas: any;
  sub_mission_pos: number;
  setMandalaState: React.Dispatch<React.SetStateAction<ModalState>>;
}) => {
  const handleGridClick = (
    data: ModalState,
    item: 'mission' | 'subMission' | 'todo'
  ) => {
    setMandalaState((prev) => ({ content: data.content, item, isOpen: true }));
  };
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-3 w-28 h-28  sm:w-40 sm:h-40 md:w-52 md:h-52  2xl:w-64 2xl:h-64">
        {/* FIXME: anyがつかわれてる */}
        {datas.map((data: any, todo_pos: number) => (
          <>
            {/* 真ん中の9マスのmissionとsub_mission (colorsはtodo_postだとうまくマッチする) */}
            {sub_mission_pos === 4 ? (
              <>
                <div
                  key={todo_pos}
                  className={`p-1 leading-3 ${colors[todo_pos]} border border-gray-300 hover:opacity-80 hover:cursor-pointer`}
                  onClick={
                    () =>
                      sub_mission_pos === 4 && todo_pos === 4
                        ? handleGridClick(data, 'mission') // alert(`${sub_mission_pos} ${todo_pos} mission`)
                        : handleGridClick(data, 'subMission') //alert(`${sub_mission_pos} ${todo_pos}sub_mission`)
                  }
                >
                  <p className="leading-3 line-clamp-2 text-xxxs md:line-clamp-3 md:leading-3 lg:pt-2  lg:line-clamp-4 lg:text-xxs 2lg:leading-4">
                    {data ? data.content : `${colors[todo_pos]}`}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* そのほかの9マスの真ん中(sub_mission) */}
                {todo_pos === 4 ? (
                  <div
                    key={todo_pos}
                    className={`p-1 leading-3 ${colors[sub_mission_pos]} border border-gray-300 hover:opacity-80 hover:cursor-pointer`}
                    onClick={() => handleGridClick(data, 'subMission')}
                  >
                    <p className="leading-3 line-clamp-2 text-xxxs md:line-clamp-3 md:leading-3 lg:pt-2  lg:line-clamp-4 lg:text-xxs 2lg:leading-4">
                      {data ? data.content : `${colors[sub_mission_pos]}`}
                    </p>
                  </div>
                ) : (
                  // todo
                  <div
                    key={todo_pos}
                    className={`p-1 leading-3 bg-gray-200  border border-gray-300 hover:bg-gray-300 hover:cursor-pointer`}
                    onClick={() => handleGridClick(data, 'todo')}
                  >
                    <p className="leading-3 line-clamp-2 text-xxxs md:line-clamp-3 md:leading-3 lg:pt-2  lg:line-clamp-4 lg:text-xxs 2lg:leading-4">
                      {data
                        ? data.content
                        : 'あいうえおかきくけこさしすせそたちつてと'}
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem porro earum, vitae suscipit reprehenderit aut fugit facere, aspernatur iusto, numquam natus distinctio. Debitis voluptate placeat architecto dolore, deleniti repellat dolorem.

export default NineSquare;
