// 댓글 수정 시 백드롭 관련 처리를 위한 store
import { create } from 'zustand';

interface CommentActionMenuBackdropStore {
  showCommentActionMenuBackdrop: boolean;
  showBackdrop: () => void;
  closeBackdrop: () => void;
  closeCommentActionMenu: null | (() => void);
  setCloseCommentActionMenu: (closeFunction: () => void) => void;
  clearCloseCommentActionMenu: () => void;
  showCommentReplyBackdrop: boolean;
  showReplyBackdrop: () => void;
  closeReplyBackdrop: () => void;
  closeReplyActionMenu: null | (() => void);
  setCloseReplyActionMenu: (closeFunction: () => void) => void;
  clearCloseReplyActionMenu: () => void;
  selectedReplyIndex: null | number;
  setSelectedReplyIndex: (index: number) => void;
}

// TODO - 표시 여부 상태를 관리하는 변수와, 함수가 모두 show로 시작해서 value인지 함수인지 헷갈림
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
        closeCommentActionMenu: closeCommentActionMenu,
      }));
    },
    clearCloseCommentActionMenu: () => {
      set(() => ({
        closeCommentActionMenu: null,
      }));
    },
    // 대댓글 수정/삭제 모달의 backdrop관리를 위한 변수
    showCommentReplyBackdrop: false,
    showReplyBackdrop: () => {
      set(() => ({
        showCommentReplyBackdrop: true,
      }));
    },
    closeReplyBackdrop: () => {
      set(() => ({
        showCommentReplyBackdrop: false,
        closeReplyActionMenu: null,
        selectedReplyIndex: null,
      }));
    },
    closeReplyActionMenu: null,
    setCloseReplyActionMenu: closeReplyActionMenu => {
      set(() => ({
        closeReplyActionMenu: closeReplyActionMenu,
      }));
    },
    clearCloseReplyActionMenu: () => {
      set(() => ({
        closeReplyActionMenu: null,
      }));
    },
    // 대댓글이 여러개 존재할 때, 다른 대댓글 위에 backdrop이 렌더링 되도록
    // 해당 대댓글만 표시되도록 하기 위해서 index 저장
    selectedReplyIndex: null,
    setSelectedReplyIndex: (index: number) => {
      set(() => ({
        selectedReplyIndex: index,
      }));
    },
  }));

export default useCommentActionMenuBackdropStore;
