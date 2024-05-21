import EzzButton from '@/components/ezz-button';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function(){

    return (
        <View className='flex-1 justify-center items-center '>
            <View className='w-[200px]'>
                <EzzButton text='Play' onPress={() => router.navigate('game-socket')} />
            </View>
        </View>
    )
}
