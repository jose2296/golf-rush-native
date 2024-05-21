import EzzLoading from '@/components/EzzLoading';
import useStore from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { initializeApp } from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { Platform } from 'react-native';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_API_KEY,
    authDomain: 'golf-rush-web.firebaseapp.com',
    projectId: 'golf-rush-web',
    storageBucket: 'golf-rush-web.appspot.com',
    messagingSenderId: '432798610549',
    appId: '1:432798610549:web:12ad3127b2ea6017b4b43c',
    measurementId: 'G-ZXE2NDBZHV'
};

const app = initializeApp(firebaseConfig);
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;


firebaseAuth.initializeAuth(app, {
    persistence: ['android', 'ios'].includes(Platform.OS) ? reactNativePersistence(AsyncStorage) : firebaseAuth.browserSessionPersistence,
});

export default function() {
    const setUserUid = useStore((state) => state.setUserUid);

    useEffect(() => {
        // initialize auth
        onAuthStateChanged(firebaseAuth.getAuth(), (user) => {
            if (user) {
                setUserUid(user.uid);
                console.log('loged');
                router.navigate('/(app)')
            } else {
                console.log('logout');
                router.navigate('/(auth)')
            }
        });
    }, []);


    // if (!loading) {
    //     console.log('TEST');

    //     const href = userToken ? '/(app)' : '/(auth)';
    //     return <Redirect href={href} />;
    // }

    return (
        <EzzLoading />
    );
}
