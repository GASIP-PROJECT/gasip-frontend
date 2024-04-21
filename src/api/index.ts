import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GSBackendClient = axios.create({
  baseURL: 'https://gasip.site',
});

// TODO - 함수 데이터에 따라서 typing(모든 함수)
export const getAllFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const access_token = await AsyncStorage.getItem('userToken');

    const posts = await GSBackendClient.get(
      `/boards/all-boards?page=${page}&size=${dataCount}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return posts.data.response;
  } catch (error) {
    console.log('getAllFeeds error: ', error);
    return [];
  }
};

export const getGeneralFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const access_token = await AsyncStorage.getItem('userToken');

    const posts = await GSBackendClient.get(
      `/boards/0?page=${page}&size=${dataCount}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return posts.data.response;
  } catch (error) {
    console.log('getGeneralFeeds error: ', error);
    return [];
  }
};

export const getPopularFeeds = async (page: number, dataCount: number = 5) => {
  try {
    const access_token = await AsyncStorage.getItem('userToken');
    const posts = await GSBackendClient.get(
      `/boards/best?page=${page}&size=${dataCount}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
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
    const access_token = await AsyncStorage.getItem('userToken');

    const posts = await GSBackendClient.get(
      `/boards/${profId}?page=${page}&size=${dataCount}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    return posts.data.response;
  } catch (error) {
    console.log('getProfessorFeeds error: ', error);
    return [];
  }
};

export const createFeed = async (content: string) => {
  try {
    const access_token = await AsyncStorage.getItem('userToken');

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
    const access_token = await AsyncStorage.getItem('userToken');

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
    const access_token = await AsyncStorage.getItem('userToken');

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
    const access_token = await AsyncStorage.getItem('userToken');

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
    const access_token = await AsyncStorage.getItem('userToken');

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

export const likeFeed = async (postId: number) => {
  try {
    const access_token = await AsyncStorage.getItem('userToken');

    const response = await GSBackendClient.post(
      `/boards/likes`,
      {
        postId,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
  } catch (error) {
    console.log('likeFeed error: ', error);
  }
};

export const likeFeedCancel = async (postId: number) => {
  try {
    const access_token = await AsyncStorage.getItem('userToken');

    const response = await GSBackendClient.delete(`/boards/likes`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        postId,
      },
    });
  } catch (error) {
    console.log('likeFeedCancel error: ', error);
  }
};
