import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, Text, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

interface EzzTextProps {
    avoidTranslation?: boolean;
    text: string | number;
    className?: string;
    onPress?: () => void;
}

const AnimatedText = Animated.createAnimatedComponent(Text);

const EzzText = ({
    text,
    avoidTranslation = false,
    className,
    onPress,
}: EzzTextProps) => {
    const { t } = useTranslation();

    return (
        <AnimatedText
            onPress={() => (onPress ? onPress() : null)}
            className={`text-white ${className}`}
        >
            {avoidTranslation ? text : t(text as string)}
        </AnimatedText>
    );
};

export default EzzText;
