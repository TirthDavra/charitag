"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
// import Modal from "../common/Modals/Modal";

// Define the type for modal configuration
type ModalConfig = {
  title?: string;
  content: ReactNode;
  onClose?: () => void;
  className?: string;
  classNameBtn?: string;
  crossMarkRight?: boolean;
  classLabel?: string;
  classNameBg?: string;
  sharedState?: any;
};

// Define the type for modal context
type ModalContextType = {
  modalConfig: ModalConfig | null;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  sharedState: any;
};

// Create a context for the modal
const ModalContext = createContext<ModalContextType>({
  modalConfig: null,
  openModal: () => {},
  closeModal: () => {},
  sharedState: null,
});

// Create a ModalProvider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [sharedState, setSharedState] = useState<any>(null);
  const openModal = (config: ModalConfig) => {
    setModalConfig(config);
    setSharedState(config.sharedState);
  };

  const closeModal = () => {
    setModalConfig(null);
  };
  return (
    <ModalContext.Provider
      value={{
        modalConfig,
        openModal,
        closeModal,
        sharedState,
      }}
    >
      {children}
      {modalConfig && <Modal {...modalConfig} onClose={closeModal} />}
    </ModalContext.Provider>
  );
};

// Custom hook to consume the modal context
export const useModal = (): ModalContextType => {
  return useContext(ModalContext);
};

const Modal: React.FC<ModalConfig & { onClose: () => void }> = ({
  content,
  onClose,
  title,
  classLabel,
  className,
  classNameBg,
  classNameBtn,
  crossMarkRight,
}) => {
  useEffect(() => {
    document.body.style.overflow = !!content ? "hidden" : "auto";

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"; // Reset body overflow when component unmounts
    };
  }, [content]);
  return (
    <div
      className={`max-[500] fixed bottom-0 left-0 right-0 top-0 z-[51] flex items-end justify-center border-r-2 bg-black bg-opacity-75 sm:items-center ${classNameBg}`}
      id="modal-container"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className={`relative w-[100%] max-w-[500px] rounded-t-xl  bg-white sm:rounded-xl ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div>
            {crossMarkRight ? (
              <div
                className={`flex items-center border-b border-blue-100 py-2 ${classLabel}`}
              >
                <span className="flex-grow text-center text-2xl font-semibold">
                  {title}
                </span>
                <button
                  className={`cursor-pointer text-blue-500 ${classNameBtn} mr-2`}
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ) : (
              <div className="flex items-center border-b border-blue-100 py-2">
                <button
                  className={`cursor-pointer text-blue-500 ${classNameBtn} ml-2`}
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>

                <span className="flex-grow text-center text-2xl font-semibold">
                  {title}
                </span>
              </div>
            )}
          </div>
        )}

        {!title && (
          <button
            className={`absolute top-2 ${
              crossMarkRight ? "right-2" : "left-2"
            } cursor-pointer text-gray-500 ${classNameBtn}`}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}

        {content}
      </div>
    </div>
  );
};
