import React from 'react';
import { TouchableOpacity } from 'react-native';

import useCommentActionMenuBackdropStore from '@store/commentActionMenuBackdropStore';

export default function FeedActionMenuBackdrop() {
  const {
    closeBackdrop,
    closeCommentActionMenu,
    closeReplyActionMenu,
    closeReplyBackdrop,
  } = useCommentActionMenuBackdropStore();

  const handleOnBackdropPress = () => {
    closeBackdrop();
    closeReplyBackdrop();
    closeCommentActionMenu && closeCommentActionMenu();
    closeReplyActionMenu && closeReplyActionMenu();
  };

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 2, // zIndex값을 조절해야됨.
      }}
      onPress={handleOnBackdropPress}
      activeOpacity={1}
    ></TouchableOpacity>
  );
}
