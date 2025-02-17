// MyScreen.tsx
import React from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import CollapsingTopBar from './components/CollapsingTopBar';

const MyScreen: React.FC = () => {
  const goProfile = () => {
    Alert.alert('이미지 클릭', '프로필을 클릭하였습니다.');
  };

  return (
    <View style={styles.container}>
      <CollapsingTopBar
        logo='LOG'
        title="건강등급"
        imageSource={require('./assets/image_profile_default.jpg')}
        onImagePress={goProfile}
      >
        <View style={styles.adBox} />

        <View style={styles.mockCard}/>
        <View style={styles.mockCard}/>
        <View style={styles.mockCard}/>
        <View style={styles.mockCard}/>

      </CollapsingTopBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9DADB',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  scroll_view: {
    flex: 1,
    backgroundColor: '#D9DADB',
  },
  title: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
  adBox: {
    height: 80,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 4,
  },
  mockCard: {
    height: 200,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 16
  },
});

export default MyScreen;
