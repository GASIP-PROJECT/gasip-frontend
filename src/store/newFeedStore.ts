import { create } from 'zustand';

interface NewFeedStore {
  showCreateFeedModal: boolean;
  toggleToUpdateFeedsList: boolean;
  selectedProfData: {
    id: number | null;
    name: string;
  };
  setSelectedProfData: (profData: { id: number | null; name: string }) => void;
  openNewFeedModal: (profId?: number | null, profName?: string) => void;
  closeNewFeedModal: () => void;
  triggerFeedListUpdate: () => void;
}

const useNewFeedStore = create<NewFeedStore>((set, get) => ({
  showCreateFeedModal: false,
  toggleToUpdateFeedsList: false,
  selectedProfData: {
    id: null,
    name: '',
  },
  setSelectedProfData: (profData: { id: number | null; name: string }) =>
    set(() => ({ selectedProfData: profData })),
  openNewFeedModal: (profId: number | null = null, profName: string = '') => {
    set(() => ({
      showCreateFeedModal: true,
      selectedProfData: { id: profId, name: profName },
    }));
  },
  closeNewFeedModal: () => {
    set(() => ({
      showCreateFeedModal: false,
      selectedProfData: { id: null, name: '' },
    }));
  },
  triggerFeedListUpdate: () => {
    set(state => ({ toggleToUpdateFeedsList: !state.toggleToUpdateFeedsList }));
  },
}));

export default useNewFeedStore;
