// MyBarChart.tsx
import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

interface MyBarChartProps {
  dataList: number[]
}

const MyBarChart: React.FC<MyBarChartProps> = ({ dataList }) => {
  const screenWidth = Dimensions.get('window').width * 3 / 5;
  const originalData = dataList;

  const data = {
    labels: originalData.map((_, idx) => `#${idx+1}`),
    datasets: [
      {
        data: dataList,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0, // 소수점 없이 정수로 표시
    color: (opacity = 0.2) => `rgba(25, 31, 52, ${opacity})`,
    labelColor: (opacity = 0.2) => `rgba(25, 31, 52, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.chart}
        data={data}
        width={screenWidth - 32} // 좌우 여백 고려
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        yAxisLabel=""
        yAxisSuffix=""
        withInnerLines={false}        // 내부의 보조선 표시 여부
        withHorizontalLabels={false}  // X축/가로 레이블 표시 여부
        withVerticalLabels={false}    // Y축/세로 레이블 표시 여부
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  chart: {
    borderRadius: 16,
  },
});

export default MyBarChart;
