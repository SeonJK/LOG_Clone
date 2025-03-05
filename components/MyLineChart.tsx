// MyLineChart.tsx
import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface MyLineChartProps {
    data1: number,
    data2: number,
    data3: number,
}

const MyLineChart: React.FC<MyLineChartProps> = ({
    data1, data2, data3
}) => {
    const chartWidth = Dimensions.get('window').width * 3 / 7;

    const originalData = [data1, data2, data3];
    // 0이 아닌 값만 필터링
    const filteredData = originalData.filter(value => value !== 0);

    // 데이터가 하나일 경우: 커스텀 뷰에서 중앙에 도트와 라벨 표시
    if (filteredData.length === 1) {
        return (
        <View style={[styles.centerContainer, { width: chartWidth, height: 60 }]}>
            <View style={styles.centerDot} />
            <Text style={styles.dotLabel}>{filteredData[0].toFixed(1)}</Text>
        </View>
        );
    }

  return (
    <View>
      <LineChart
        data={{
          labels: filteredData.map((_, idx) => `#${idx+1}`),
          datasets: [
            {
              data: filteredData,
            },
          ],
        }}
        width={Dimensions.get('window').width * 3 / 7} // 화면 너비에 맞춤
        height={60}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1, // 소수점 이하 자리수
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,      // 라인 색상
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          fillShadowGradient: '#007aff',                                // 라인 아래 그라데이션 색상
          fillShadowGradientOpacity: 0.2,                               // 그라데이션 불투명도
          strokeWidth: 2,                                               // 꺾은선 두께
          propsForDots: {
            r: '4',             // 데이터 지점(도트)의 반지름
            strokeWidth: '2',
            stroke: '#fff',
          },
        }}
        // 세부 옵션들
        withInnerLines={false}        // 내부의 보조선 표시 여부
        withOuterLines={false}        // 바깥 테두리선 표시 여부
        withHorizontalLabels={false}  // X축/가로 레이블 표시 여부
        withVerticalLabels={false}    // Y축/세로 레이블 표시 여부
        // bezier                        // 곡선 모드 (V자 형태가 더 부드럽게 표현됨)
        // fromZero                      // 데이터가 0부터 시작하도록
        style={styles.chart}
        // 데이터 지점에 커스텀 텍스트(도트 라벨) 표시
        renderDotContent={({ x, y, indexData }) => (
            <Text
            key={`dot-${x}-${y}`}
            style={{
                position: 'absolute',
                left: x - 9,     // 숫자가 도트 가운데 오도록 위치 조정
                top: y - 14,
                fontSize: 8,
                color: 'grey',
                fontWeight: 'bold',
            }}
            >
            {indexData.toFixed(1)}
            </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        alignSelf: 'center'
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        alignSelf: 'center',
    },
    centerDot: {
        width: 4,
        height: 4,
        borderRadius: 6,
        backgroundColor: 'rgba(0, 122, 255, 1)',
        marginBottom: 4,
    },
    dotLabel: {
        fontSize: 8,
        color: 'grey',
        fontWeight: 'bold',
    },
})

export default MyLineChart;
