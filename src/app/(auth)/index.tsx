import EzzButton from '@/components/ezz-button';
import EzzText from '@/components/ezz-text';
import { Theme } from '@/constants/theme';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const { t } = useTranslation();
    const [user, setUser] = useState({
        value: 'josejerez2296@gmail.com',
        placeholder: t('user') + ' *',
        errorMessage: '',
        errors: false,
        label: t('user'),
    });
    const [password, setPassword] = useState({
        value: 'secret',
        placeholder: t('password') + ' *',
        errorMessage: '',
        errors: false,
        label: t('password'),
    });
    const [loginError, setLoginError] = useState(false);
    const colorScheme = useColorScheme() || 'dark';

    const setUserState = (userValue: string) => {
        const userData = {
            ...user,
            value: userValue,
        };

        setUser(userData);
    };

    const setPasswordState = (passwordValue: string) => {
        const passwordData = {
            ...password,
            value: passwordValue,
        };

        setPassword(passwordData);
    };

    const submitForm = () => {
        setLoginError(false);

        const data = {
            email: user.value,
            password: password.value,
        };

        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
            const uid = userCredential.user.uid;
            // setUserUid(uid);
            // setLoading(false);
            // navigate('/app');
        }).catch((error) => {

            // if (error.code === 'auth/invalid-login-credentials') {
            //     setErrorMessage('login.invalid_login_credentials');
            // }
            // setLoading(false);
        });
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: Theme[colorScheme].background }]}>
                <View style={{ backgroundColor: 'red', flex: 2, paddingLeft: 10 }}>
                    <EzzText
                        text='welcome'
                        style={[styles.textInfo, { color: '#fff' }]}
                    />
                    <EzzText
                        text='welcome_description'
                        style={styles.textInfo}
                    />
                </View>
                <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                    <KeyboardAwareScrollView style={{ flex: 1, margin: 10, backgroundColor: 'lime'}}>
                        <EzzButton
                            text='sign_in'
                            onPress={() => submitForm()}
                        />
                        {loginError && (
                            <EzzText
                                text='bad_credentials'
                                style={styles.loginError}
                            />
                        )}
                    </KeyboardAwareScrollView>
                </View>
        </SafeAreaView>
    );
};

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        color: 'white',
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 70,
    },
    textInfo: {
        color: '#a3a7a8',
        fontWeight: 'bold',
        fontSize: 30,
    },
    formContainer: {
        marginTop: 20,
        marginBottom: 50,
        width: '100%',
    },
    loginError: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default Login;
