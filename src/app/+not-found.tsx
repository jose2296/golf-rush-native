import { Link } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  const logout = () => {
    console.log(222222222);

    const auth = getAuth();
    signOut(auth).then(() => {
    }).catch((error) => {
        console.error(error);
    });
  };
  return (
    <>
        <Link href="/" replace style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
        <Text onPress={logout}>Logout</Text>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 35,
  },
});
