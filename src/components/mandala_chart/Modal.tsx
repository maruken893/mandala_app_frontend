import React, { useState, useRef, useEffect } from 'react';
import {
  createMission,
  createSubMission,
  createTodo,
  updateMission,
  updateSubMission,
  updateTodo,
} from '../../lib/api/mandala';

interface ModalState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  data: any;
  parentData: any;
  position?: number;
}

const items = {
  mission: '目標',
  subMission: 'サブ目標',
  todo: 'todo',
  '': '作成する',
};

const Modal: React.FC<{
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}> = ({ modalState, setModalState }) => {
  const [input, setInput] = useState(modalState.data?.content ?? '');
  const inputRef = useRef<HTMLInputElement>(null!);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  console.log(modalState);

  const handleCreateMissionButton = async () => {
    try {
      if (modalState.item === 'mission') {
        await createMission(input);
      } else if (modalState.item === 'subMission') {
        if (typeof modalState.position === 'number') {
          await createSubMission(
            input,
            modalState.position,
            modalState.parentData
          );
        }
      } else if (modalState.item === 'todo') {
        if (typeof modalState.position === 'number') {
          await createTodo(input, modalState.position, modalState.parentData);
        }
      }
      setModalState((prev) => ({ ...prev, isOpen: false }));
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateMissionButton = async () => {
    try {
      if (modalState.item === 'mission') {
        await updateMission(input, modalState.data);
      } else if (modalState.item === 'subMission') {
        await updateSubMission(input, modalState.data, modalState.parentData);
      } else if (modalState.item === 'todo') {
        await updateTodo(input, modalState.data, modalState.parentData);
      }
      setModalState((prev) => ({ ...prev, isOpen: false }));
      setInput('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseButton = () => {
    setModalState((prev) => ({ ...prev, content: '', isOpen: false }));
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              {modalState.data ? (
                <h3 className="text-3xl font-semibold">
                  {modalState.data.content}({items[modalState.item]}
                  )を変更する
                </h3>
              ) : (
                <h3 className="text-3xl font-semibold">
                  {items[modalState.item]}を作成する
                </h3>
              )}
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <input
                type="text"
                ref={inputRef}
                value={input}
                onChange={handleInput}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              {modalState.data ? (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleUpdateMissionButton}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleCreateMissionButton}
                >
                  Create
                </button>
              )}
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => handleCloseButton()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;

// 参考　https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
