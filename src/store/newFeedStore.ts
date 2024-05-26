import { create } from 'zustand';

interface NewFeedStore {
  showCreateFeedModal: boolean;
  toggleToUpdateFeedsList: boolean;
  profId: number | null;
  profName: string;
  isFreeFeed: boolean;
  setSelectedProfData: (profId: number, profName: string) => void;
  openNewFeedModal: (isFreeFeed?: boolean) => void;
  closeNewFeedModal: () => void;
  triggerFeedListUpdate: () => void;
  setIsFreeFeed: (isFreeFeed: boolean) => void;
}

const useNewFeedStore = create<NewFeedStore>(set => ({
  showCreateFeedModal: false,
  toggleToUpdateFeedsList: false,
  profName: '',
  profId: null,
  isFreeFeed: false, // 자유게시판인지 교수님 리뷰인지 구분하기 위한 변수

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
  setIsFreeFeed: (isFreeFeed: boolean) => {
    set(() => ({
      isFreeFeed: isFreeFeed,
    }));
  },
}));

export default useNewFeedStore;
