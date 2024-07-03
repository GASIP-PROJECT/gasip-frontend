import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

interface AuthState {
  isLoading: boolean;
  userToken: string | null;
}

type AuthAction =
  | { type: 'SIGN_IN'; payload: AuthState }
  | { type: 'SIGN_OUT'; payload: AuthState }
  | { type: 'RESTORE_TOKEN'; payload: AuthState };

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  const { type } = action;

  switch (type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        ...action.payload,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        ...action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return prevState;
  }
};

const AuthContext = createContext<
  | {
      authState: AuthState;
      dispatch: Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const initialAuthState = {
    isLoading: true,
    userToken: null,
  };

  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};

export { useAuth, AuthContextProvider };
