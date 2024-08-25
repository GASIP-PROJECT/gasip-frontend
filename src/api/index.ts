import axios from 'axios';
import { MMKVStorage } from './mmkv';

// TODO - 테스트 관련 API 호출 구조 잡는 방법 조사

// stage 서버에 호출을 보내려면 IS_TEST_MODE를 true로 변경
const IS_TEST_MODE = false;
const GASIP_MAIN_SERVER_URL = 'https://gasip.site';
const GASIP_STAGE_SERVER_URL = 'http://3.35.82.226:8080';

const GSBackendClient = axios.create({
  baseURL: IS_TEST_MODE ? GASIP_STAGE_SERVER_URL : GASIP_MAIN_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${MMKVStorage.getString('userToken')}`,
  },
});

export const updateAxiosClientHeaderAuthorization = (newUserToken: string) => {
  GSBackendClient.defaults.headers.Authorization = `Bearer ${newUserToken}`;
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await GSBackendClient.post('/members/login', {
      email,
      password,
    });

    return result.data.response;
  } catch (error) {
    console.log('signIn error: ', error);
    return null;
  }
};

// TODO - 함수 데이터에 따라서 typing(모든 함수)
export const getAllProfessorReviews = async (
  page: number,
  dataCount: number = 5,
) => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/professor-boards?page=${page}&size=${dataCount}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getAllFeeds error: ', error);
    return [];
  }
};

// 홈에서 표시할 4개의 피드 데이터 가져오는 함수
export const getAllProfessorReviewsForHomeScreen = async () => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/professor-boards?page=${0}&size=${4}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getAllFeeds error: ', error);
    return [];
  }
};

export const getPopularFeedsForHomeScreen = async () => {
  try {
    const posts = await GSBackendClient.get(`/boards/best?page=${0}&size=${4}`);

    return posts.data.response;
  } catch (error) {
    console.log('getPopularFeeds error: ', error);
    return [];
  }
};

export const getAllGeneralFeedsForHomeScreen = async () => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/free-boards?page=${0}&size=${4}&profId == 0`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getAllGeneralFeeds error: ', error);
    return [];
  }
};

export const getGeneralFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const posts = await GSBackendClient.get(
      // `/boards/free-boards?page=${page}&size=${dataCount}&profId == 0`,
      `/boards/free-boards?page=${page}&size=${20}`,
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

export const getAllProfssorFeedCount = async (profId: number) => {
  try {
    const response = await GSBackendClient.get(`/boards/${profId}`);
    const count = response.data.response.length;

    return count;
  } catch (error) {
    console.log('getAllProfssorFeedCount error: ', error);
    return 0;
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
      `/professors/prof-search?profName=${searchText}`,
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

export const editProfessorRating = async (profId: number, rating: number) => {
  try {
    await GSBackendClient.put(`/grades/${profId}`, {
      gradepoint: rating,
    });
  } catch (error) {
    console.log('editProfessorRating error: ', error);
  }
};

export const changePassword = async (newPassword: string) => {
  try {
    const response = await GSBackendClient.put('/members/passwords', {
      password: newPassword,
    });

    return response.data.response;
  } catch (error) {
    console.log('changePassword error: ', error);
  }
};

export const searchProfessorsByMajor = async (searchedMajor: string) => {
  try {
    const response = await GSBackendClient.get(
      `/professors/major-search?majorName=${searchedMajor}`,
    );

    return response.data.response;
  } catch (error) {
    console.log('searchProfessorsByMajor error: ', error);
    return [];
  }
};

export const deleteAccount = async () => {
  try {
    await GSBackendClient.delete('/members');
  } catch (error) {
    console.log('deleteAccount error: ', error);
  }
};

export const resetPassword = async (email: string, newPassword: string) => {
  try {
    await GSBackendClient.put('/members/passwords/noauth', {
      email,
      password: newPassword,
    });
  } catch (error) {
    console.log('resetPassword error: ', error);
  }
};

export const validateEmailVerificationCode = async (
  emailToVerifyCode: string,
  verificationCode: string,
) => {
  try {
    // email 값 뒤에 gachon.ac.kr 붙여줘야 한다.
    const response = await GSBackendClient.get(
      `/members/emails/verifications?email=${emailToVerifyCode}@gachon.ac.kr&code=${verificationCode}`,
    );

    return response.data.success || false;
  } catch (error) {
    console.log('validateVerificationCode error: ', error);
    return false;
  }
};

// 신고 기능 함수 - 게시글
export const reportFeed = async (postId: number, content: string) => {
  try {
    // TODO - Stage 서버 엔드포인트 main 서버로 교체 필요
    console.log(postId, content);
    const response = await GSBackendClient.post(
      'http://3.35.82.226:8080/boards/report',
      {
        postId,
        content,
      },
    );

    console.log('신고 완료!');
    console.log(response.data);
  } catch (error) {
    console.log('reportFeed error: ', error);
    return false;
  }
};

// 신고 기능 함수 - 댓글
