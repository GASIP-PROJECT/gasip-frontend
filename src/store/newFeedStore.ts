import { create } from 'zustand';

interface NewFeedStore {
  showCreateFeedModal: boolean;
  toggleToUpdateFeedsList: boolean;
  profId: number | null;
  profName: string;
  setSelectedProfData: (profId: number, profName: string) => void;
  openNewFeedModal: (profId?: number | null, profName?: string) => void;
  closeNewFeedModal: () => void;
  triggerFeedListUpdate: () => void;
}

const useNewFeedStore = create<NewFeedStore>(set => ({
  showCreateFeedModal: false,
  toggleToUpdateFeedsList: false,
  profName: '',
  profId: null,

  setSelectedProfData: (profId: number, profName: string) => {
    set(() => ({
      profId: profId,
      profName: profName,
    }));
  },
  openNewFeedModal: () => {
    set(() => ({
      showCreateFeedModal: true,
    }));
  },
  closeNewFeedModal: () => {
    set(() => ({
      showCreateFeedModal: false,
      profId: null,
      profName: '',
    }));
  },
  triggerFeedListUpdate: () => {
    set(state => ({ toggleToUpdateFeedsList: !state.toggleToUpdateFeedsList }));
  },
}));

export default useNewFeedStore;
