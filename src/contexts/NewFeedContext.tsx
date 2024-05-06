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
  setShowCreateFeedModal: Dispatch<SetStateAction<boolean>>;
  toggleToUpdateFeedsList: boolean;
  setToggleToUpdateFeedsList: Dispatch<SetStateAction<boolean>>;
}

const NewFeedContext = createContext<NewFeedContextValueType>({
  showCreateFeedModal: false,
  setShowCreateFeedModal: () => {},
  toggleToUpdateFeedsList: false,
  setToggleToUpdateFeedsList: () => {},
});

export const NewFeedProvider = ({ children }: { children: ReactNode }) => {
  const [toggleToUpdateFeedsList, setToggleToUpdateFeedsList] = useState(false);
  const [showCreateFeedModal, setShowCreateFeedModal] = useState(false);

  return (
    <NewFeedContext.Provider
      value={{
        showCreateFeedModal,
        setShowCreateFeedModal,
        toggleToUpdateFeedsList,
        setToggleToUpdateFeedsList,
      }}
    >
      {children}
    </NewFeedContext.Provider>
  );
};

export const useNewFeedContext = () => useContext(NewFeedContext);
