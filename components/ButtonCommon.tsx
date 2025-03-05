import React from "react";
import { Pressable, StyleSheet, Alert, Text } from "react-native";

interface ButtonCommonProps {
    text: string
}

const ButtonCommon: React.FC<ButtonCommonProps> = ({text}) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.commonButton,
                { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={() => Alert.alert(text, text+' 클릭')}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    commonButton: {
        marginTop: 20,
        backgroundColor: 'black',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    }
})

export default ButtonCommon;