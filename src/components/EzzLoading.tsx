import EzzText from '@/components/ezz-text';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';

const animationDuration = 1000;
const lineWidth = 5;
const lineHeight = 30;
const lines = new Array(4).fill(0);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
    linesContainer: {
        marginBottom: 15,
        flexDirection: 'row'
    },
    line: {
        width: lineWidth,
        height: lineHeight,
        backgroundColor: 'red',
        marginRight: lineWidth,
        borderRadius: 6
    }
});


const Line = ({ delay = 0 }: { delay?: number}) => {
    const scaleValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(scaleValue, {
            toValue: 100,
            duration: animationDuration,
            delay,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
        })
    ).start();

    const scale = scaleValue.interpolate({
        inputRange: [0, 20, 49, 100],
        outputRange: [0.5, 1, 1.2, 0.5]
    });

    return (
        <Animated.View style={[
            styles.line,
            { transform: [{ scale }] }
        ]} />
    )
}

interface EzzLoadingProps {
    text?: string;
}

const EzzLoading = ({ text }: EzzLoadingProps) => (
    (['android', 'ios'].includes(Platform.OS)) ?
        <View style={styles.container}>
            <View style={styles.linesContainer}>
                { lines.map((_, index) => <Line key={index} delay={ (index + 1) * 100} />) }
            </View>
            { text && <EzzText text={text} style={ styles.text } />}
        </View>
        :
        <EzzText text={'Loading...'} style={ styles.text } />
);

export default EzzLoading;
