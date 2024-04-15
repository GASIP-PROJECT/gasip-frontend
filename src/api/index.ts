// TODO - 함수 데이터에 따라서 typing
import axios from 'axios';

const GSBackendClient = axios.create({
  baseURL: 'https://gasip.site',
});

export const getAllFeeds = async (page: number, dataCount: number = 5) => {
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
  console.log('executed');
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
