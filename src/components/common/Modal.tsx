import React, { useState, useRef, useEffect } from 'react';

interface ModalState {
  isOpen: boolean;
  item: 'mission' | 'subMission' | 'todo' | '';
  content: string;
}

const items = {
  mission: '目標',
  subMission: 'サブ目標',
  todo: 'todo',
  '': '???',
};

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

const Modal: React.FC<{
  mandalaState: ModalState;
  setMandalaState: React.Dispatch<React.SetStateAction<ModalState>>;
}> = ({ mandalaState, setMandalaState }) => {
  const [input, setInput] = useState(mandalaState.content);
  const inputRef = useRef<HTMLInputElement>(null!);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCloseButton = () => {
    setMandalaState((prev) => ({ ...prev, content: '', isOpen: false }));
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
              <h3 className="text-3xl font-semibold">
                {mandalaState.content}({items[mandalaState.item]})を変更する
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() =>
                  setMandalaState((prev) => ({ ...prev, isOpen: false }))
                }
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
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
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={() => setInput()}
              >
                Save Changes
              </button>
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
