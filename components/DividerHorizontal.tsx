import React from 'react';
import { View, StyleSheet } from "react-native";

const DividerHorizontal: React.FC = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: '#ccc',
        alignSelf: 'stretch',        // 부모의 높이를 채우도록 설정
        marginBottom: 8,
    }
})

export default DividerHorizontal;