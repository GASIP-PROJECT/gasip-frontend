import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function useGetBottomButtonGap() {
  const { bottom } = useSafeAreaInsets();

  const bottomButtonGap = Platform.OS === 'android' ? 15 : bottom;

  return { bottomButtonGap };
}
