// TODO - 함수 데이터에 따라서 typing
import axios from 'axios';

const GSBackendClient = axios.create({
  baseURL: 'https://gasip.site',
});

export const getAllFeeds = async () => {
  try {
    const posts = await GSBackendClient.get('/boards/0');

    return posts.data.response;
  } catch (error) {
    console.log('getAllFeeds error: ', error);
    return [];
  }
};

export const getPopularFeeds = async (page: number, dataCount: number) => {
  try {
    const posts = await GSBackendClient.get(
      `/boards/best?page=${page}&dataCount=${dataCount}`,
    );

    return posts.data.response;
  } catch (error) {
    console.log('getPopularFeeds error: ', error);
    return [];
  }
};
