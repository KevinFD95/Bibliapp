import { Text, Pressable, StyleSheet } from 'react-native';

export default function customButton ({text, onPress}) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1B4F72',
        width: "90%",
        marginVertical: 20,
        paddingVertical: 10,
        borderRadius: 10
    },

    text: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
});