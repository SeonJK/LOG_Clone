// MyScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, SafeAreaView, Button } from 'react-native';
import CollapsingTopBar from './components/CollapsingTopBar';
import GradeSlider from './components/GradeSlider';
import DividerVertical from './components/DividerVertical';
import ButtonCommon from './components/ButtonCommon';
import MyLineChart from './components/MyLineChart';
import DividerHorizontal from './components/DividerHorizontal';
import ChipList from './components/MyChip';
import MyBarChart from './components/MyBarChart';

const MyScreen: React.FC = () => {
  const goProfile = () => {
    Alert.alert('이미지 클릭', '프로필을 클릭하였습니다.');
  };

  const [selectedDisease, setSelectedDisease] = useState('암');
  const diseasePercentList = (() => {
    switch(selectedDisease) {
      case '암':
        return [67, 23, 56];
      case '뇌혈관질환':
        return [54, 17, 118];
      case '심장질환':
        return [50, 7, 151];
      default:
        return [50, 50, 90];
    }
  });

  return (
    <SafeAreaView style={styles.container}>s
      <CollapsingTopBar
        logo='LOG'
        title="건강등급"
        imageSource={require('./assets/image_profile_default.jpg')}
        onImagePress={goProfile}
      >
        {/* 광고영역 */}
        <View style={styles.adBox}>
          <Text
            style={{fontSize: 32}}>
            광고 영역
          </Text>
        </View>

        {/* 등급 요약 정보 카드 */}
        <View style={styles.commonCard}>
          <Text style={styles.gradeTitle}>
            선종균님은{'\n'}무궁무진한 건강잠재력🌱
          </Text>

          <View style={styles.gradeRow}>
            <View style={styles.gradeColumn}>
              <Text style={styles.hintText}>건강등급</Text>
              <Text style={styles.bigText}>6</Text>
              <Text style={styles.hintText}>2025.03.05 기준</Text>
            </View>
            <DividerVertical />
            <View style={styles.gradeColumn}>
              <Text style={styles.hintText}>건강점수</Text>
              <Text style={styles.bigText}>870</Text>
              <Text style={styles.hintText}>상위 64.5%</Text>
            </View>
          </View>

          <GradeSlider
            minLabel='1등급'
            maxLabel='9등급'
            grade={5} 
          />

          <ButtonCommon text='분석 결과 더보기' />
        </View>

        {/* 건강검진 결과 요약 카드 */}
        <View style={styles.commonCard}>
          <Text style={styles.cardTitle}>건강검진 결과</Text>

          <View style={styles.examineRow}>
            <View style={styles.examineColumn}>
              <Text style={styles.examineLabel}>혈압(최고/최저)</Text>
              <Text style={styles.examinesubTitle}>112/63</Text>
              <Text style={styles.examineTag}>정상</Text>
            </View>

            <MyLineChart dataList={[119.0, 116.0, 112.0]} />
          </View>
          <DividerHorizontal />

          <View style={styles.examineRow}>
            <View style={styles.examineColumn}>
              <Text style={styles.examineLabel}>공복혈당</Text>
              <Text style={styles.examinesubTitle}>89</Text>
              <Text style={styles.examineTag}>정상</Text>
            </View>

            <MyLineChart dataList={[89.0, 78.0, 89.0]} />
          </View>
          <DividerHorizontal />

          <View style={styles.examineRow}>
            <View style={styles.examineColumn}>
              <Text style={styles.examineLabel}>총콜레스테롤</Text>
              <Text style={styles.examinesubTitle}>175</Text>
              <Text style={styles.examineTag}>정상</Text>
            </View>

            <MyLineChart dataList={[175]} />
          </View>
          <DividerHorizontal />

          <ButtonCommon text='건강검진 결과 더보기' />
        </View>

        <View style={styles.row}>
          {/* 건강등급 산출 & 검진결과 등록 카드 */}
          <View style={styles.updateCard}>
            <Text style={styles.updateTitle}>건강등급 산출 &{'\n'}검진결과 등록</Text>
            <Text style={styles.updateText}>등급 업데이트하기</Text>
          </View>

          {/* 의료 이용 기록 카드 */}
          <View style={styles.commonCard}>
            <Text style={styles.hsPhTitle}>의료 이용 기록</Text>
            <Text style={styles.hintText}>병원/약국 기록{'\n'}살펴보기</Text>
          </View>
        </View>

        {/* 나의 3대 질병 위험도 카드 */}
        <View style={styles.commonCard}>
          <Text style={styles.cardTitle}>나의 3대 질병 위험도</Text>

          <ChipList 
            chipList={['암', '뇌혈관질환', '심장질환']}
            selectedData={ selectedDisease }
            onPress={ (chip) => setSelectedDisease(chip) }
          />
          <MyBarChart
            dataList={ diseasePercentList() }
          />
        </View>

      </CollapsingTopBar>
    </SafeAreaView>
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
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center', // 수직 정렬
    alignItems: 'center',     // 수평 정렬
  },

  commonCard: {
    height: 'auto',
    flex: 1,
    marginTop: 10,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    flexDirection: 'column',
  },
  
  gradeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  gradeSliderContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  gradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  gradeColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  examineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  examineColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  examineLabel: {
    fontSize: 12,
    color: 'grey',
  },
  examinesubTitle: {
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold'
  },
  examineTag: {
    width: 'auto',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    color: 'white',
    backgroundColor: 'green',
    textAlign: 'center'
  },

  updateCard: {
    backgroundColor: '#a7abee',
    height: 'auto',
    flex: 1,
    marginTop: 10,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'column',
    marginRight: 10,

  },
  updateTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  updateText: {
    color: 'white'
  },
  hsPhTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  cardTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  hintText: {
    color: 'grey',
  },
  bigText: {
    fontSize: 44,
    color: 'black',
    fontWeight: 'bold',
  },

  row: {
    width: '100%',
    flexDirection: 'row',
  },
  mockCard: {
    height: 200,
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 16
  },
});

export default MyScreen;
