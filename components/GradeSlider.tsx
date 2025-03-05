import { useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface GradeSliderProps {
    minLabel: string,
    maxLabel: string,
    // Literal 타입 - 특정 값만 허용
    grade: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

const GradeSlider: React.FC<GradeSliderProps> = ({
    minLabel, 
    maxLabel,
    grade 
}) => {
    const [value, setValue] = useState(5);

    return (
        <View style={styles.container}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={8}
              value={grade}
              onValueChange={(val) => setValue(val)}
              minimumTrackTintColor="#0000FF"
              maximumTrackTintColor="#FF0000"
              thumbTintColor="#558BCF"
              disabled={true}
            />
            <View style={styles.row}>
                <Text style={styles.labelText}>{minLabel}</Text>
                <Text style={styles.labelText}>{maxLabel}</Text>
            </View>
          </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FF000000',
    },
    slider: {
        flex: 1,
        height: 'auto',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    labelText: {
        color: 'grey',
        marginHorizontal: 16,
    },
});

export default GradeSlider;