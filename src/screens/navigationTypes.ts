import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type StackParamList = {
  BottomTabNavigator: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type BottomTabParamList = {
  HomeStack: undefined;
  MyPageStack: undefined;
  CreateFeed: undefined; // 글로벌하게 피드 작성 모달 띄우기 위해서 BottomTab에서도 정의
};

export type HomeStackParamList = {
  Home: undefined;
  CreateFeed0: undefined;
  FeedDetail: undefined;
};
export type MyPageStackParamList = {
  MyPage: undefined;
  CreateFeed2: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<HomeStackParamList, 'Home'>;
export type MyPageScreenProps = BottomTabScreenProps<
  MyPageStackParamList,
  'MyPage'
>;

// TODO - type issue 해결
export type CreateFeedModalProps = BottomTabScreenProps<
  HomeStackParamList | MyPageStackParamList,
  'CreateFeed0' | 'CreateFeed2' // string/never issue
>;
