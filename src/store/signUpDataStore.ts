import { create } from 'zustand';

interface SignUpDataStore {
  verifiedEmail: string;
  password: string;
  setVerifiedEmail: (email: string) => void;
  setPassword: (password: string) => void;
  resetSignUpData: () => void;
}

const useSignUpDataStore = create<SignUpDataStore>(set => ({
  verifiedEmail: '',
  password: '',
  setVerifiedEmail: (email: string) => {
    set(() => ({
      verifiedEmail: email,
    }));
  },
  setPassword: (password: string) => {
    set(() => ({
      password: password,
    }));
  },
  resetSignUpData: () => {
    set(() => ({
      verifiedEmail: '',
      password: '',
    }));
  },
}));

export default useSignUpDataStore;
