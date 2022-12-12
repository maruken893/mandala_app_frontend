import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface MessageState {
  message: string;
  isOpen: boolean;
}

interface AlertMessageProps {
  messageState: MessageState;
  setMessageState: React.Dispatch<React.SetStateAction<MessageState>>;
}

const AlertMessage = ({ messageState, setMessageState }: AlertMessageProps) => {
  return (
    <>
      {messageState.isOpen && (
        <div className="flex w-3/5 p-4 mb-6 mx-auto text-sm text-white bg-red-500 rounded-sm">
          <div className="w-11/12">
            <span>{messageState.message}</span>
          </div>
          <div className="w-1/12 ">
            <button
              className="bg-gray-50 hover:bg-gray-200"
              onClick={() => {
                setMessageState((prev) => ({ ...prev, isOpen: false }));
              }}
            >
              <XMarkIcon className="text-gray-600 h-5 w-5 hober:text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertMessage;
