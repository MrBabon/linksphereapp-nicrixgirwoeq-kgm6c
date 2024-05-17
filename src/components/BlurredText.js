import { View, StyleSheet } from 'react-native';
import { TxtInria } from './TxtInria/TxtInria';
import { BlurView } from 'expo-blur';

const BlurredText = ({ text, style }) => (
    <View style={[styles.blurContainer, style]}>
        <BlurView intensity={11} tint="light" style={styles.absolute}>
            <TxtInria style={styles.transparentText}>{text}</TxtInria>
        </BlurView>
    </View>
);

const styles = StyleSheet.create({
    blurContainer: {
        position: 'relative',
        overflow: 'hidden',
        paddingVertical: 2,
        borderRadius: 5,
        zIndex: 0
    },
    
    transparentText: {
        color: "transparent",
    },
});

export default BlurredText;
