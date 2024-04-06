import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  BottomTabNavigator: undefined;
  CreateFeedModal: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  MyPage: undefined;
};

// export type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, 'Home'>;
export type MyPageScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  'MyPage'
>;

export type CreateFeedModalProps = NativeStackScreenProps<
  StackParamList,
  'CreateFeedModal'
>;
