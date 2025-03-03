"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

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
  classNameCrossIcon?: string;
  sharedState?: any;
  generalModal?: boolean;
  classNameGeneral?: string;
  onClickGeneral?: () => void;
};

// Define the type for modal context
type ModalContextType = {
  modalConfig: ModalConfig | null;
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  sharedState: any;
  updateSharedState: (newState: any) => void;
};

// Create a context for the modal
const ModalContext = createContext<ModalContextType>({
  modalConfig: null,
  openModal: () => { },
  closeModal: () => { },
  sharedState: null,
  updateSharedState: () => { },
});

// Create a ModalProvider component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalStack, setModalStack] = useState<ModalConfig[]>([]);
  const [sharedState, setSharedState] = useState<any>(null);

  const openModal = (config: ModalConfig) => {
    setModalStack((prevStack) => [...prevStack, config]);
    if (config.sharedState !== undefined) {
      setSharedState(config.sharedState);
    }
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1));
    if (modalStack.length === 1) {
      setSharedState(null); // Reset shared state when all modals are closed
    }
  };

  const updateSharedState = (newState: any) => {
    setSharedState(newState);
  };

  const currentModalConfig = modalStack[modalStack.length - 1] || null;

  return (
    <ModalContext.Provider
      value={{
        modalConfig: currentModalConfig,
        openModal,
        closeModal,
        sharedState,
        updateSharedState,
      }}
    >
      {children}
      {currentModalConfig && <Modal {...currentModalConfig} onClose={closeModal} />}
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
  generalModal = false,
  classNameGeneral,
  onClickGeneral = () => { },
  classNameCrossIcon = "",
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = !!content ? "hidden" : "auto";
    if (content) {
      document.addEventListener("keydown", handleKeyDown);
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto"; // Reset body overflow when component unmounts
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [content]);

  if (generalModal) {
    return (
      <div
        className={`fixed bottom-0 left-0 right-0 top-0 z-[51] ${classNameGeneral}`}
        onClick={() => {
          onClose();
        }}
      >
        <div
          className={`relative  ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      </div>
    );
  }

  const CrossIcon = () => {
    return (
      <FontAwesomeIcon
        icon={faXmark}
        className={`font-thin ${classNameCrossIcon}`}
      />
    );
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-[51] flex items-end justify-center border-r-2 bg-black bg-opacity-75 sm:items-center ${classNameBg}`}
      id="modal-container"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className={`relative w-[100%] max-w-[660px] rounded-t-xl  bg-white sm:rounded-xl ${className}`}
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
                  <CrossIcon />
                </button>
              </div>
            ) : (
              <div className="flex items-center border-b border-blue-100 py-2">
                <button
                  className={`cursor-pointer text-blue-500 ${classNameBtn} ml-2`}
                  onClick={onClose}
                >
                  <CrossIcon />
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
            className={`absolute top-2 ${crossMarkRight ? "right-2" : "left-2"
              } cursor-pointer text-gray-500 ${classNameBtn}`}
            onClick={onClose}
          >
            <CrossIcon />
          </button>
        )}

        {content}
      </div>
    </div>
  );
};
