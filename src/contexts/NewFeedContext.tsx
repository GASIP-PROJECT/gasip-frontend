import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
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

const NewFeedProvider = ({ children }: { children: ReactNode }) => {
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
export { NewFeedProvider, NewFeedContext };
