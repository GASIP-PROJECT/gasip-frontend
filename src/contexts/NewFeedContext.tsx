import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface NewFeedContextValueType {
  showCreateFeedModal: boolean;
  toggleToUpdateFeedsList: boolean;
  // setShowCreateFeedModal: Dispatch<SetStateAction<boolean>>;
  // setToggleToUpdateFeedsList: Dispatch<SetStateAction<boolean>>;
  openNewFeedModal: () => void;
  closeNewFeedModal: () => void;
  triggerFeedListUpdate: () => void;
}

const NewFeedContext = createContext<NewFeedContextValueType>({
  showCreateFeedModal: false,
  toggleToUpdateFeedsList: false,
  // setToggleToUpdateFeedsList: () => {},
  openNewFeedModal: () => {},
  closeNewFeedModal: () => {},
  triggerFeedListUpdate: () => {},
});

export const NewFeedProvider = ({ children }: { children: ReactNode }) => {
  const [toggleToUpdateFeedsList, setToggleToUpdateFeedsList] = useState(false);
  const [showCreateFeedModal, setShowCreateFeedModal] = useState(false);

  const openNewFeedModal = () => {
    setShowCreateFeedModal(true);
  };

  const closeNewFeedModal = () => {
    setShowCreateFeedModal(false);
  };

  // 새로운 피드 작성 후 피드 목록을 업데이트하기 위해 상태 변경
  const triggerFeedListUpdate = () => {
    setToggleToUpdateFeedsList(prev => !prev);
  };

  return (
    <NewFeedContext.Provider
      value={{
        showCreateFeedModal,
        toggleToUpdateFeedsList,
        openNewFeedModal,
        closeNewFeedModal,
        triggerFeedListUpdate,
      }}
    >
      {children}
    </NewFeedContext.Provider>
  );
};

export const useNewFeedContext = () => useContext(NewFeedContext);
