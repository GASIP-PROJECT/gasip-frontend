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
  profId: number | null;
  setProfId: Dispatch<SetStateAction<number | null>>;
  // setShowCreateFeedModal: Dispatch<SetStateAction<boolean>>;
  // setToggleToUpdateFeedsList: Dispatch<SetStateAction<boolean>>;
  openNewFeedModal: (profId?: number | null) => void;
  closeNewFeedModal: () => void;
  triggerFeedListUpdate: () => void;
}

const NewFeedContext = createContext<NewFeedContextValueType>({
  showCreateFeedModal: false,
  toggleToUpdateFeedsList: false,
  profId: null,
  setProfId: () => {},
  // setToggleToUpdateFeedsList: () => {},
  openNewFeedModal: () => {},
  closeNewFeedModal: () => {},
  triggerFeedListUpdate: () => {},
});

export const NewFeedProvider = ({ children }: { children: ReactNode }) => {
  const [toggleToUpdateFeedsList, setToggleToUpdateFeedsList] = useState(false);
  const [showCreateFeedModal, setShowCreateFeedModal] = useState(false);

  // 특정 교수에 대한 피드 작성 위해서 교수 id담는 state
  const [profId, setProfId] = useState<number | null>(null);

  const openNewFeedModal = (selectedProfId: number | null = null) => {
    setShowCreateFeedModal(true);
  };

  const closeNewFeedModal = () => {
    setShowCreateFeedModal(false);
    setProfId(null);
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
        profId,
        setProfId,
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
