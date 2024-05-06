import axios from 'axios';
import { MMKVStorage } from './mmkv';

const GSBackendClient = axios.create({
  baseURL: 'https://gasip.site',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${MMKVStorage.getString('userToken')}`,
  },
});

// TODO - 함수 데이터에 따라서 typing(모든 함수)
export const getAllFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/all-boards?page=${page}&size=${dataCount}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getAllFeeds error: ', error);
    return [];
  }
};

export const getGeneralFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/0?page=${page}&size=${dataCount}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getGeneralFeeds error: ', error);
    return [];
  }
};

export const getPopularFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/best?page=${page}&size=${dataCount}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getPopularFeeds error: ', error);
    return [];
  }
};

export const getProfessorFeeds = async (
  profId: number,
  page: number,
  dataCount: number = 5,
) => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/${profId}?page=${page}&size=${dataCount}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getProfessorFeeds error: ', error);
    return [];
  }
};

export const createFeed = async (content: string) => {
  try {
    const response = await GSBackendClient.post('/boards/0', {
      content,
    });

    console.log(response.data);
  } catch (error) {
    console.log('createFeed error: ', error);
  }
};

export const deleteFeed = async (postId: number | undefined) => {
  if (!postId) return;

  try {
    const response = await GSBackendClient.delete(`/boards/${postId}`);

    console.log(response.data);
  } catch (error) {
    console.log('deleteFeed error: ', error);
  }
};

export const editFeed = async (postId: number, content: string) => {
  try {
    const response = await GSBackendClient.put(`/boards/${postId}`, {
      content,
    });
  } catch (error) {
    console.log('editFeed error: ', error);
  }
};

export const createProfessorFeed = async (
  content: string,
  profId: number | null | undefined,
) => {
  if (profId === null || profId === undefined) return;

  try {
    const response = await GSBackendClient.post(`/boards/${profId}`, {
      content,
    });
  } catch (error) {
    console.log('createProfessorFeed error: ', error);
  }
};

export const searchFeeds = async (searchText: string) => {
  if (searchText === '') return [];

  try {
    const posts = await GSBackendClient.get(
      `/boards/search?content=${searchText}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('searchFeeds error: ', error);
    return [];
  }
};

export const searchProfessors = async (searchText: string) => {
  if (searchText === '') return [];

  try {
    const posts = await GSBackendClient.get(
      `/professors/search?profName=${searchText}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('searchProfessors error: ', error);
    return [];
  }
};

export const getProfessorData = async (profId: number) => {
  try {
    const response = await GSBackendClient.get(`/professors/${profId}`);

    return response.data.response;
  } catch (error) {
    console.log('getProfessorData error: ', error);
    return null;
  }
};

export const getAllProfessors = async () => {
  try {
    const response = await GSBackendClient.get('/professors');

    console.log(response.data.response);

    return response.data.response;
  } catch (error) {
    console.log('getAllProfessors error: ', error);
    return [];
  }
};

export const getFeedData = async (postId: number) => {
  try {
    const response = await GSBackendClient.get(`/boards/details/${postId}`);

    return response.data.response;
  } catch (error) {
    console.log('getFeedDetail error: ', error);
    return null;
  }
};

export const getCommentsForFeed = async (postId: number) => {
  try {
    const response = await GSBackendClient.get(`/comments/${postId}`);

    return response.data.response;
  } catch (error) {
    console.log('getCommentsForFeed error: ', error);
    return [];
  }
};

export const getAllMyFeeds = async () => {
  try {
    const response = await GSBackendClient.get('/members/myboards');

    return response.data.response;
  } catch (error) {
    console.log('getMyFeeds error: ', error);
    return [];
  }
};

export const changeNickname = async (newNickname: string) => {
  try {
    const response = await GSBackendClient.put('/members/nicknames', {
      nickname: newNickname,
    });

    console.log(response.data.response);

    return response.data.response.nickname;
  } catch (error) {
    console.log('changeNickname error: ', error);
  }
};

export const getUserData = async () => {
  try {
    const response = await GSBackendClient.get('/members/mypage');

    return response.data.response;
  } catch (error) {
    console.log('getUserData error: ', error);
    return null;
  }
};

export const likeFeed = async (postId: number) => {
  try {
    const response = await GSBackendClient.post(`/boards/likes`, {
      postId,
    });
  } catch (error) {
    console.log('likeFeed error: ', error);
  }
};

export const likeFeedCancel = async (postId: number) => {
  try {
    const response = await GSBackendClient.delete(`/boards/likes`, {
      data: {
        postId,
      },
    });
  } catch (error) {
    console.log('likeFeedCancel error: ', error);
  }
};

export const createComment = async (postId: number, content: string) => {
  try {
    const response = await GSBackendClient.post(`/comments/${postId}`, {
      content,
    });
  } catch (error) {
    console.log('createComment error: ', error);
  }
};

export const createCommentReply = async (
  postId: number,
  content: string,
  parentId: number,
) => {
  try {
    const response = await GSBackendClient.post(`/comments/${postId}`, {
      content,
      parentId,
    });
  } catch (error) {
    console.log('createCommentReply error: ', error);
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const response = await GSBackendClient.delete(`/comments/${commentId}`);
  } catch (error) {
    console.log('deleteComment error: ', error);
  }
};

export const editComment = async (commentId: number, content: string) => {
  try {
    const response = await GSBackendClient.put(`/comments/${commentId}`, {
      content,
    });
  } catch (error) {
    console.log('editComment error: ', error);
  }
};

export const likeComment = async (commentId: number, postId: number) => {
  try {
    const response = await GSBackendClient.post(`/comments/likes`, {
      commentId,
      postId,
    });
  } catch (error) {
    console.log('likeComment error: ', error);
  }
};

export const likeCommentCancel = async (commentId: number, postId: number) => {
  try {
    const response = await GSBackendClient.delete(`/comments/likes`, {
      data: {
        commentId,
        postId,
      },
    });
  } catch (error) {
    console.log('likeCommentCancel error: ', error);
  }
};

export const rateProfessor = async (profId: number, rating: number) => {
  try {
    const response = await GSBackendClient.post(`/grades/${profId}`, {
      gradepoint: rating,
    });
  } catch (error) {
    console.log('rateProfessor error: ', error);
  }
};
