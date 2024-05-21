import { ReactElement } from 'react';
import { View } from 'react-native';

type LayoutBallProps = {
    color: string;
    stela: string;
    extraButton?: ReactElement;
    children: ReactElement;
}

const LayoutBall = ({ color, stela, extraButton, children }: LayoutBallProps) => {

    return (
        <View className='flex-1 flex-row'>
            <View className='flex-1 justify-center items-center'>
                <View className='flex-1 justify-center items-center'>
                    <View className={`size-44 bg-[${color}] rounded-full`} style={{ backgroundColor: color, borderRadius: 100 }}/>
                </View>
                {extraButton}
            </View>
            <View className='flex-1 justify-center items-center'>
                {children}
            </View>
        </View>
        // <div className='grid gap-x-20 gap-y-10 lg:gap-y-20 grid-cols-1 lg:grid-cols-2 flex-1'>
        //     <div className='flex items-center justify-center flex-col'>
        //         <div className='w-full h-96 rounded-xl border-2 border-secondary'>
        //             <Canvas style={{ width: '100%', height: '100%' }} >
        //                 {/* <BallShowcase stela={stela} color={color} /> */}
        //             </Canvas>
        //         </div>
        //         {extraButton}
        //     </div>
        //     <div className='flex flex-col items-center justify-center'>
        //         {children}
        //     </div>
        // </div>
    );
};

export default LayoutBall;
