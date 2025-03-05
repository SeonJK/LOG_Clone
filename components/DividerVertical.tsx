import React from 'react';
import { View, StyleSheet } from "react-native";

const DividerVertical: React.FC = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        width: 1,
        backgroundColor: '#ccc',
        alignSelf: 'stretch',        // 부모의 높이를 채우도록 설정
        marginHorizontal: 8,
    }
})

export default DividerVertical;