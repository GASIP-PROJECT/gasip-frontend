// 댓글 수정 시 백드롭 관련 처리를 위한 store
import { create } from 'zustand';

interface CommentActionMenuBackdropStore {
  showCommentActionMenuBackdrop: boolean;
  showBackdrop: () => void;
  closeBackdrop: () => void;
  closeCommentActionMenu: null | (() => void);
  setCloseCommentActionMenu: (closeCommentActionMenu: () => void) => void;
  clearCloseCommentActionMenu: () => void;
}

const useCommentActionMenuBackdropStore =
  create<CommentActionMenuBackdropStore>((set, get) => ({
    showCommentActionMenuBackdrop: false,
    showBackdrop: () => {
      set(() => ({
        showCommentActionMenuBackdrop: true,
      }));
    },
    closeBackdrop: () => {
      set(() => ({
        showCommentActionMenuBackdrop: false,
        closeCommentActionMenu: null,
      }));
    },
    closeCommentActionMenu: null,
    setCloseCommentActionMenu: closeCommentActionMenu => {
      set(() => ({
        closeCommentActionMenu,
      }));
    },
    clearCloseCommentActionMenu: () => {
      set(() => ({
        closeCommentActionMenu: null,
      }));
    },
  }));

export default useCommentActionMenuBackdropStore;
