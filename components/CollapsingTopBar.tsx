// CollapsingTopBar.tsx
import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Text,
} from 'react-native';

const HEADER_MAX_HEIGHT = 120; // 확장 상태 헤더 높이
const HEADER_MIN_HEIGHT = 60;  // 축소 상태 헤더 높이
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

interface CollapsingTopBarProps {
  logo: string;                     // 상단 왼쪽의 로고 텍스트
  title: string;                    // 큰 타이틀 텍스트
  imageSource: ImageSourcePropType; // 오른쪽 클릭 이미지
  onImagePress: () => void;
  children: React.ReactNode;        // 스크롤 컨텐츠로 렌더링할 컴포넌트들
}

const CollapsingTopBar: React.FC<CollapsingTopBarProps> = ({
  logo,
  title,
  imageSource,
  onImagePress,
  children
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  // 헤더 높이를 스크롤에 따라 보간합니다.
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // 로고 텍스트의 불투명도를 스크롤에 따라 줄입니다.
  const logoOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });
  // 로고 텍스트의 수직 위치를 약간 위로 올립니다.
  const logoTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  // 작은 타이틀 텍스트의 불투명도를 스크롤에 따라 늘립니다.
  const smallTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  // 큰 타이틀 텍스트의 크기를 축소합니다.
  const bigTitleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });
  // 큰 타이틀 텍스트의 수직 위치를 약간 위로 올립니다.
  const bigTitleTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });
  // 큰 타이틀 텍스트의 불투명도를 스크롤에 따라 줄입니다.
  const bigTitleOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.9, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      {/* 스크롤 가능한 컨텐츠 */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>

      {/* 애니메이션되는 헤더 */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        {/* 로고 텍스트 (스크롤 시 사라짐) */}
        <Animated.Text style={[
          styles.logo, 
            { 
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }],
            }
          ]}
        >
          {logo}
        </Animated.Text>

        {/* 큰 타이틀 텍스트 (스크롤 시 사라짐) */}
        <Animated.Text
          style={[
            styles.bigTitle,
            {
              transform: [
                { translateY: bigTitleTranslateY },
                { scale: bigTitleScale },
              ],
              opacity: bigTitleOpacity
            },
          ]}
        >
          {title}
        </Animated.Text>

        {/* 작은 타이틀 텍스트 (스크롤 시 나타남) */}
        <Animated.Text
          style={[
            styles.smallTitle,
            {
              opacity: smallTitleOpacity,

            }
          ]}
        >
          {title}
        </Animated.Text>

        {/* 오른쪽 클릭 가능한 이미지 */}
        <TouchableOpacity onPress={onImagePress} style={styles.imageContainer}>
          <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D9DADB',
    overflow: 'hidden',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  // 로고 텍스트는 좌측 상단에 배치됨
  logo: {
    position: 'absolute',
    top: 16,
    left: 16,
    color: '#BFBFC3',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // 큰 타이틀 텍스트는 초기에는 좌측에, 스크롤 시 중앙으로 이동/축소됨
  bigTitle: {
    position: 'absolute',
    left: 16,
    top: 50, // 초기 위치 (필요에 따라 조정)
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  smallTitle: {
    position: 'relative',
    // justifyContent: 'center', // 수직 중앙정렬
    alignItems: 'center',     // 수평 중앙정렬
    textAlign: 'center',
    color: 'black',
    fontSize: 24,
  },
  imageContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 50,
  },
});

export default CollapsingTopBar;
