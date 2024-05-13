import { create } from 'zustand';

interface NewFeedStore {
  showCreateFeedModal: boolean;
  toggleToUpdateFeedsList: boolean;
  profName: string;
  profId: number | null;
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
      selectedProfId: profId,
      profName: profName,
    }));
  },
  openNewFeedModal: (profId: number | null = null, profName: string = '') => {
    set(() => ({
      showCreateFeedModal: true,
      selectedProfId: profId,
      profName: profName,
    }));
  },
  closeNewFeedModal: () => {
    set(() => ({
      showCreateFeedModal: false,
      selectedProfId: null,
      profName: '',
    }));
  },
  triggerFeedListUpdate: () => {
    set(state => ({ toggleToUpdateFeedsList: !state.toggleToUpdateFeedsList }));
  },
}));

export default useNewFeedStore;
