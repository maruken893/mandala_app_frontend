import React, { useState } from 'react';
import Modal from './Modal';

interface Data {
  id: number;
  content: string;
  mission_id?: number;
  sub_mission_id?: number;
  created_at: Date;
  updated_at: Date;
  position?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

interface ModalState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  // FIXME: 一旦any
  data: any;
  parentData: any;
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

// components
const NineSquare = ({
  datas,
  sub_mission_pos,
  setModalState,
  mission,
}: {
  // FIXME: anyいっぱい使ってる
  datas: any;
  sub_mission_pos: number;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  mission: any;
}) => {
  const handleGridClick = (
    // FIXME: any型
    item: 'mission' | 'subMission' | 'todo',
    data: any,
    parentData?: any,
    position?: number
  ) => {
    setModalState((prev) => ({
      data,
      parentData,
      item: item,
      isOpen: true,
      position,
    }));
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
                  onClick={() =>
                    todo_pos === 4
                      ? handleGridClick('mission', data)
                      : handleGridClick('subMission', data, datas[4], todo_pos)
                  }
                >
                  <p className="leading-3 line-clamp-2 text-xxxs md:line-clamp-3 md:leading-3 lg:pt-2  lg:line-clamp-4 lg:text-xxs 2lg:leading-4">
                    {data ? data.content : ``}
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
                    onClick={() =>
                      handleGridClick(
                        'subMission',
                        data,
                        mission,
                        sub_mission_pos
                      )
                    }
                  >
                    <p className="leading-3 line-clamp-2 text-xxxs md:line-clamp-3 md:leading-3 lg:pt-2  lg:line-clamp-4 lg:text-xxs 2lg:leading-4">
                      {data ? data.content : ``}
                    </p>
                  </div>
                ) : (
                  // todo
                  <div
                    key={todo_pos}
                    className={`p-1 leading-3 bg-gray-50  border border-gray-300 hover:bg-gray-200 hover:cursor-pointer`}
                    onClick={() =>
                      handleGridClick('todo', data, datas[4], todo_pos)
                    }
                  >
                    <p className="leading-3 line-clamp-2 text-xxxs md:line-clamp-3 md:leading-3 lg:pt-2  lg:line-clamp-4 lg:text-xxs 2lg:leading-4">
                      {data ? data.content : ''}
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
