import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Linking,
} from 'react-native';

import GSText from '@components/common/GSText';
import Spacer from '@components/common/Spacer';

import icon_notice from '@assets/icon_home_menu_notice.png';
import icon_portal from '@assets/icon_home_menu_portal.png';
import icon_calendar from '@assets/icon_home_menu_calendar.png';
import icon_homepage from '@assets/icon_home_menu_homepage.png';
import icon_cybercampus from '@assets/icon_home_menu_cybercampus.png';

// 재사용되지 않을 가능성이 높아 컴포넌트 파일 안에서 선언하였음.
const MENU_DATA = [
  {
    title: '공지사항',
    icon: icon_notice,
    linkUrl: 'https://www.gachon.ac.kr/kor/7986/subview.do',
  },
  {
    title: '학사일정',
    icon: icon_calendar,
    linkUrl: 'https://www.gachon.ac.kr/kor/1075/subview.do',
  },
  {
    title: '홈페이지',
    icon: icon_homepage,
    linkUrl: 'https://www.gachon.ac.kr/',
  },
  {
    title: '사이버캠퍼스',
    icon: icon_cybercampus,
    linkUrl: 'https://cyber.gachon.ac.kr',
  },
  {
    title: '포탈',
    icon: icon_portal,
    linkUrl: 'https://portal.gachon.ac.kr',
  },
];

// 홈화면 상단 가천대학교 공지사항 등 메뉴들 컴포넌트
export default function CampusMenus() {
  return (
    <View style={styles.container}>
      {MENU_DATA.map((menu, index) => (
        <MenuItem
          key={index.toString()}
          title={menu.title}
          icon={menu.icon}
          linkUrl={menu.linkUrl}
        />
      ))}
    </View>
  );
}

const MenuItem = ({
  title,
  icon,
  linkUrl,
}: {
  title: string;
  icon: ImageSourcePropType;
  linkUrl: string;
}) => {
  const handleIconPress = () => {
    Linking.openURL(linkUrl);
  };
  return (
    <TouchableOpacity style={styles.menuItem} onPress={handleIconPress}>
      <Image source={icon} style={styles.menuIcon} />
      <Spacer type="height" value={8} />
      <GSText
        style={styles.menuTitle}
        adjustsFontSizeToFit={true}
        numberOfLines={1}
      >
        {title}
      </GSText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 122, 255, 0.03)',
    borderRadius: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    paddingVertical: 17,
  },
  menuItem: {
    alignItems: 'center',
    width: 62, // TODO - width 고정값 줘도 되는지 확신이 없음
  },
  menuIcon: {
    width: 26,
    height: 26,
  },
  menuTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: '#111111', // TODO - 디자인시스템에 없는 색상
  },
});
