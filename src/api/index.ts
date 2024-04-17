// TODO - 함수 데이터에 따라서 typing
import axios from 'axios';

const GSBackendClient = axios.create({
  baseURL: 'https://gasip.site',
});

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
    console.log('getAllFeeds error: ', error);
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

// TODO - 테스트용 토큰
const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwiZW1haWwiOiJqaUB0ZXN0LmNvbSIsInJvbGVzIjpbIk1FTUJFUiJdLCJleHAiOjE3MTMzNjAzNzB9.7YoW_Epi1UDXcTpydv1Odj84C6oWuhA2fjDJjcTpeIk';

export const createFeed = async (content: string) => {
  try {
    const response = await GSBackendClient.post(
      '/boards/0',
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    console.log(response.data);
  } catch (error) {
    console.log('createFeed error: ', error);
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

export const getFeedData = async (postId: number) => {
  try {
    const response = await GSBackendClient.get(`/boards/details/${postId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

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
    const response = await GSBackendClient.get('/members/myboards', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data.response;
  } catch (error) {
    console.log('getMyFeeds error: ', error);
    return [];
  }
};

export const changeNickname = async (newNickname: string) => {
  try {
    const response = await GSBackendClient.put(
      '/members/nicknames',
      {
        nickname: newNickname,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    console.log(response.data.response);

    return response.data.response.nickname;
  } catch (error) {
    console.log('changeNickname error: ', error);
  }
};

export const getUserData = async () => {
  try {
    const response = await GSBackendClient.get('/members/mypage', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data.response;
  } catch (error) {
    console.log('getUserData error: ', error);
    return null;
  }
};
