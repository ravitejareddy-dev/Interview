import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './styles';

type HeaderProps = {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
};

const HeaderComponent: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  onBackPress,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {showBack ? (
        <TouchableOpacity style={styles.backContainer} onPress={handleBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.backContainer} />
      )}


      <View style={styles.titleContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
      </View>


      <View style={styles.backContainer} />
    </View>
  );
};

export default HeaderComponent;

