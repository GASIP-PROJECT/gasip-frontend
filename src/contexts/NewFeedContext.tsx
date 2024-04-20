import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react';

interface NewFeedContextValueType {
  toggleToUpdateFeedsList: boolean;
  setToggleToUpdateFeedsList: Dispatch<SetStateAction<boolean>>;
}

const NewFeedContext = createContext<NewFeedContextValueType>({
  toggleToUpdateFeedsList: false,
  setToggleToUpdateFeedsList: () => {},
});

const NewFeedProvider = ({ children }: { children: ReactNode }) => {
  const [toggleToUpdateFeedsList, setToggleToUpdateFeedsList] = useState(false);

  return (
    <NewFeedContext.Provider
      value={{ toggleToUpdateFeedsList, setToggleToUpdateFeedsList }}
    >
      {children}
    </NewFeedContext.Provider>
  );
};
export { NewFeedProvider, NewFeedContext };
