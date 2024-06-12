import { Dispatch, SetStateAction } from 'react';
import { Alert } from 'react-native';
import { create } from 'zustand';

import { deleteComment, editComment } from '@api/index';

interface CommentEditStore {
  isCommentEditing: boolean;
  setIsCommentEditing: (isCommentEditing: boolean) => void;
  newComment: string;
  setNewComment: (newComment: string) => void;
  editComment: (newComment: string, commentId: number | null) => void;
  deleteComment: (commentId: number) => void;
  selectedCommentId: number | null;
  setSelectedCommentId: (selectedCommentId: number | null) => void;
  updateFeed: boolean;
  toggleUpdateFeed: () => void;
  showCommentReplyActionMenu: boolean;
  setShowCommentReplyActionMenu: (showCommentReplyActionMenu: boolean) => void;
}

const useCommentEditStore = create<CommentEditStore>((set, get) => ({
  isCommentEditing: false,
  selectedCommentId: null,
  newComment: '',
  updateFeed: false,
  showCommentReplyActionMenu: false,
  setShowCommentReplyActionMenu: (showCommentReplyActionMenu: boolean) => {
    set(() => ({
      showCommentReplyActionMenu,
    }));
  },
  setIsCommentEditing: (isCommentEditing: boolean) => {
    set(() => ({
      isCommentEditing,
    }));
  },
  setSelectedCommentId: (selectedCommentId: number | null) => {
    set(() => ({
      selectedCommentId,
    }));
  },
  setNewComment: (newComment: string) => {
    set(() => ({
      newComment,
    }));
  },
  editComment: async (newComment, commentId) => {
    if (newComment === '') {
      Alert.alert('내용을 입력해주세요.');
      return;
    }

    // TODO - null인 경우에 대해서 따로 처리 필요하지 않을지?
    if (commentId === null) return;

    await editComment(commentId, newComment);
    // 댓글이 삭제된 UI를 보여주기 위해 updateFeed를 toggle해서 useEffect실행
    get().toggleUpdateFeed();
    set(() => ({
      isCommentEditing: false,
      newComment: '',
    }));
  },
  deleteComment: async commentId => {
    await deleteComment(commentId);
    // 댓글이 삭제된 UI를 보여주기 위해 updateFeed를 toggle해서 useEffect실행
    get().toggleUpdateFeed();
  },
  toggleUpdateFeed: () => {
    set(prevState => ({
      updateFeed: !prevState.updateFeed,
    }));
  },
}));

export default useCommentEditStore;
