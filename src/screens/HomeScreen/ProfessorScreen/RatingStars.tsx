import React from 'react';
import { StyleSheet, View } from 'react-native';

import GSIcon from '@components/common/GSIcon';
import Spacer from '@components/common/Spacer';
import { COLORS } from '@styles/colors';

export default function RatingStars({
  currentRating,
}: {
  currentRating: number | 'null';
}) {
  const rating = currentRating === 'null' ? 0 : currentRating;
  return (
    <View style={styles.container}>
      <RatingStar currentRating={rating} compareRating={1} />
      <RatingStar currentRating={rating} compareRating={2} />
      <RatingStar currentRating={rating} compareRating={3} />
      <RatingStar currentRating={rating} compareRating={4} />
      <RatingStar currentRating={rating} compareRating={5} />
    </View>
  );
}

const RatingStar = ({
  currentRating,
  compareRating,
}: {
  currentRating: number;
  compareRating: number;
}) => {
  if (currentRating >= compareRating) {
    return (
      <View>
        <GSIcon name="star" size={16} color="#ffc400" />
      </View>
    );
  }

  return (
    <View>
      <GSIcon name="star" size={16} color={COLORS.GRAY_400} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
