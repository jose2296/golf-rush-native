import { Box as BoxWeb, CameraControls as CameraControlsWeb } from '@react-three/drei';
import { Box } from '@react-three/drei/native';
import { Canvas as CanvasWeb } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber/native';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const groundSize = {
    width: 1,
    height: 1,
    depth: 1,
};
export default function App() {
    console.log(Platform.OS);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text>dsd</Text>
                <StatusBar style="auto" />
                <View style={{backgroundColor: 'red', flex: 1 }}>
                    <Text>dsd</Text>
                    {['android', 'ios'].includes(Platform.OS) &&
                        <Canvas>
                            <ambientLight />
                            {/* <CameraControls /> */}
                                <Box args={[1, 1, groundSize.depth]}>
                                    <meshStandardMaterial color={'lime'} />
                                </Box>
                        </Canvas>
                    }
                    {Platform.OS === 'web' &&
                        <CanvasWeb camera={{ position: [ 10, 0, 55] }} >
                            <ambientLight />
                            <CameraControlsWeb />
                            <Suspense>
                                <BoxWeb args={[5, 5, groundSize.depth]}>
                                    <meshStandardMaterial color={'lime'} />
                                </BoxWeb>
                            </Suspense>
                        </CanvasWeb>
                    }
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f',
        flexDirection: 'column'
    },
});
