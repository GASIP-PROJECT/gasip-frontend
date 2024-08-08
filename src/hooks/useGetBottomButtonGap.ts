import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TODO - 심사 위한 스크린샷 찍기 위해서 iOS코드 임시로 추가함 -> 제대로 알아보고 수정 필요하다.
export default function useGetBottomButtonGap() {
  const { bottom } = useSafeAreaInsets();
  const insets = useSafeAreaInsets();

  const iOSBottomGap = insets.bottom === 0 ? 16 : bottom;

  const bottomButtonGap = Platform.OS === 'android' ? 15 : iOSBottomGap;

  return { bottomButtonGap };
}
