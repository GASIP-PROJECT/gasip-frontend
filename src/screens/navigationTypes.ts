import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type StackParamList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  FeedDetailScreen: undefined;
  ProfessorDetailScreen: undefined;
  HomeScreen: undefined;
  SearchScreen: undefined;
};

export type BottomTabParamList = {
  HomeStack: undefined;
  MyPageStack: undefined;
  CreateFeed: undefined; // 글로벌하게 피드 작성 모달 띄우기 위해서 BottomTab에서도 정의
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  FeedDetailScreen: undefined;
  ProfessorDetailScreen: undefined;
};
export type MyPageStackParamList = {
  MyPage: undefined;
  SettingsScreen: undefined;
  ChangePasswordScreen: undefined;
  ChangeNicknameScreen: undefined;
  MyFeedsScreen: undefined;
};

export type HomeScreenProps = BottomTabScreenProps<HomeStackParamList, 'Home'>;
export type MyPageScreenProps = BottomTabScreenProps<
  MyPageStackParamList,
  'MyPage'
>;

// TODO - type issue 해결
export type CreateFeedModalProps = BottomTabScreenProps<
  HomeStackParamList | MyPageStackParamList
>;
