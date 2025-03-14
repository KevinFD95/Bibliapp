import { Text, Pressable, StyleSheet } from 'react-native';
import colors from '../config/colors.json';

export default function customButton ({text, onPress}) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.buttons,
        width: "90%",
        marginVertical: 20,
        paddingVertical: 10,
        borderRadius: 10
    },

    text: {
        color: colors.text,
        textAlign: 'center'
    }
});