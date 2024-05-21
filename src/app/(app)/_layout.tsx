import EzzLoading from '@/components/EzzLoading';
import { Theme } from '@/constants/theme';
import useStore, { SetUserData } from '@/store';
import { Slot } from 'expo-router';
import { getApp } from 'firebase/app';
import { Unsubscribe, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Layout() {
    const { t } = useTranslation();
    const colorSchema = useColorScheme() || 'dark';


    const userData = useStore(state => state.userData);
    const inGameMode = useStore(state => state.inGameMode);
    const setUserData = useStore(state => state.setUserData);
    const [loading, setLoading] = useState(true);

    const unsubscribe = useRef<Unsubscribe>();


    useEffect(() => {
        setLoading(true);
        getData();

        return () => {
            unsubscribe.current?.();
        };
    }, []);

    const getData = async () => {
        const db = getFirestore(getApp());
        const usersDoc = doc(db, `/users/${userData?.uid}`);
        // const querySnapshot = await getDoc(usersDoc);
        // const docUserData = querySnapshot.data() as SetUserData;
        // setUserData(docUserData);

        const unSubscribe = onSnapshot(usersDoc, (doc) => {
            const docUserData = doc.data() as SetUserData;
            setUserData(docUserData);
            setLoading(false);
        });
        unsubscribe.current = unSubscribe;
    };

    if (loading) {
        return <EzzLoading />;
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Theme[colorSchema].background }}>
            <View style={{ flex: 1, backgroundColor: Theme[colorSchema].background }}>
                <Slot />
            </View>
        </SafeAreaView>
    );
}
