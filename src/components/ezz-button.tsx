import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import EzzText from './ezz-text';

const style = StyleSheet.create({
    btn: {
        backgroundColor: 'orange',
        padding: 12,
        borderRadius: 20,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    }
});

interface Props {
    onPress: () => void;
    text: string;
    disabled?: boolean;
    className?: string;
    avoidTranslation?: boolean;
}

const EzzButton = ({
    text,
    avoidTranslation = false,
    disabled = false,
    className,
    onPress,
}: Props) => {
    return (
        <Pressable
            // style={[style.btn, disabled ? { backgroundColor: '#ddd' } : {}]}
            onPress={() => onPress()}
            disabled={disabled}
            className={`p-4 rounded-xl bg-red-600 items-center ${className} ${disabled ? 'bg-gray-500' : ''}`}
        >
            <EzzText
                avoidTranslation={avoidTranslation}
                text={text}
            />
        </Pressable>
    );
};

export default EzzButton;
