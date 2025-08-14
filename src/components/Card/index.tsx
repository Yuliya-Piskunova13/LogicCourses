import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import Text from '../Text';
import { styles } from './styles';
import { colors } from '../../theme';

type CardProps = {
  title: string;
  imageUri?: string;
  bgColor?: string;
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

const Card = ({
  title,
  imageUri,
  bgColor = colors.background.primary,
  onPress,
  containerStyle,
  imageStyle,
}: CardProps) => (
  <View style={styles.wrapper}>
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.card}>
        {imageUri && (
          <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
            <FastImage
              resizeMode="contain"
              source={{ uri: imageUri }}
              style={[styles.image, imageStyle]}
            />
          </View>
        )}
        <View style={styles.content}>
          <Text size="header" weight="extraBold" numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export default Card;
