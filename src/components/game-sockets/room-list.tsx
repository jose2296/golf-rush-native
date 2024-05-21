// import Button from '@/components/button';
// import Input from '@/components/input';
import { Theme } from '@/constants/theme';
import useStore from '@/store';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet, View, useColorScheme } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import EzzButton from '../ezz-button';
import EzzText from '../ezz-text';
import LayoutBall from '../layout-ball';
import { Room } from './models';

type RoomListProps = {
    rooms: Room[];
    joinRoom: (roomName?: string) => void
    createRoom: (roomName: string) => void
}

export const MAX_PLAYERS_PER_ROOM = 10;



const {height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5

const RoomList = ({ rooms, joinRoom, createRoom }: RoomListProps) => {
    const { t } = useTranslation();
    const useColorSchema = useColorScheme() || 'dark';
    const { control, handleSubmit, reset, setError, formState: { errors } } = useForm<{ roomName: string }>();

    const [openedCreateRoomModal, setOpenedCreateRoomModal] = useState(false);

    const { color, stela } = useStore(state => ({
        color: state.userData?.color,
        stela: state.userData?.stela
    }));
    console.log(color);


    const openCreateRoomModal = () => {
        reset();
        setOpenedCreateRoomModal(true)
        translateY.value = withTiming(-MAX_TRANSLATE_Y);
        closeColor.value = 1;

        // (document.getElementById('createRoomModal') as HTMLDialogElement)?.showModal();
    };

    const _createRoom = ({ roomName }: { roomName: string }) => {
        console.log(roomName);

        if (rooms.find(room => room.name === roomName)) {
            setError('roomName', {
                type: 'custom',
                message: 'roomList.room_exists'
            });

            return;
        }

        createRoom(roomName);
        // (document.getElementById('createRoomModal') as HTMLDialogElement)?.close();


        translateY.value = withTiming(SCREEN_HEIGHT);
        closeColor.value = 1;
    };

    const translateY = useSharedValue(SCREEN_HEIGHT);
    const closeColor = useSharedValue(1);
    const context = useSharedValue({ y: SCREEN_HEIGHT });
    const gesture = Gesture.Pan()
        .onStart(e => {
            context.value = {y: translateY.value}
        })
        .onUpdate(e => {
            translateY.value = e.translationY + context.value.y;
            translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);

            closeColor.value = withTiming(translateY.value > -MIN_TRANSLATE_Y ? 0.4 : 1)
        })
        .onEnd(e => {
            if(translateY.value > -MIN_TRANSLATE_Y){
                translateY.value = withTiming(SCREEN_HEIGHT)
            }
            if(translateY.value < -MIN_TRANSLATE_Y){
                translateY.value = withTiming(-MAX_TRANSLATE_Y)
            }
        })

    const reanimatedBottomStyle = useAnimatedStyle(() => {
        return {
            opacity: closeColor.value,
            transform: [ {translateY: translateY.value} ]
        }
    })
    return (
        <LayoutBall color={color as string} stela={stela as string}>
            <>
                <View className='flex-1 w-full justify-center items-center'>
                    <View className='flex-1 p-10 w-full '>
                        <GestureHandlerRootView style={{ flex: 1, overflow: 'hidden' }}>
                            <View className='flex-1 w-full border-2 rounded-xl border-purple-400 overflow-hidden'>
                                <View className='pt-2 pl-4 flex-row items-center'>
                                    <View className='flex-1'>
                                        <EzzText text={'roomList.rooms_list'} />
                                    </View>
                                    <View className='w-40'>
                                        <EzzButton text='+' onPress={openCreateRoomModal} />
                                    </View>
                                </View>

                                {!rooms?.length &&
                                    <View className='flex-1 h-full items-center justify-center'>
                                        <EzzText text='roomList.no_rooms' />
                                    </View>
                                }
                                {!!rooms?.length &&
                                    <ScrollView className='flex-1 p-4 h-full'>
                                        {rooms.map(room => (
                                            <View key={room.name} className='flex-1 flex-row justify-between items-center'>
                                                <EzzText className='' text={`${room.name} ${room.playersCount}/${MAX_PLAYERS_PER_ROOM}`} avoidTranslation />
                                                <EzzButton
                                                    className="w-100"
                                                    text='roomList.join_room'
                                                    onPress={() => joinRoom(room.name)}
                                                    disabled={room.playersCount >= MAX_PLAYERS_PER_ROOM}
                                                />
                                            </View>
                                        ))}

                                        {/* <div className='flex flex-col gap-y-6'>
                                            {rooms.map(room => (
                                                <div key={room.name} className='flex justify-between items-center'>
                                                    <p>{room.name} {room.playersCount}/{MAX_PLAYERS_PER_ROOM}</p>
                                                    <Button
                                                        text='roomList.join_room'
                                                        type='btn-secondary'
                                                        disabled={room.playersCount >= MAX_PLAYERS_PER_ROOM}
                                                        disabledToolTip='roomList.max_players'
                                                        click={() => joinRoom(room.name)}
                                                    />
                                                </div>
                                            ))}
                                        </div> */}
                                    </ScrollView>
                                }

                                <GestureDetector gesture={gesture}>
                                    <Animated.View className='rounded-xl w-full absolute z-50 px-4' style={[styles.bottomsheet_container, reanimatedBottomStyle, { backgroundColor: Theme[useColorSchema].background }]}>
                                        <View className='h-1 w-1/3 bg-white rounded-xl self-center my-4' />

                                        <Controller
                                            control={control}
                                            name="roomName"
                                            render={({ field: { onChange, value, onBlur } }) => (
                                                <TextInput
                                                    placeholder="Enter your name here"
                                                    value={value}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                />
                                            )}
                                            rules={{
                                                required: {
                                                  value: true,
                                                  message: 'Field is required!'
                                                }
                                            }}
                                        />

                                        <EzzButton text='Save' onPress={handleSubmit(_createRoom)} />
                                    </Animated.View>
                                </GestureDetector>
                            </View>
                        </GestureHandlerRootView>
                    </View>
                </View>
                {/* <div className='w-full h-[600px] rounded-xl border-2 border-secondary flex flex-col justify-between overflow-hidden p-5'>
                    <header className='flex items-center justify-between pb-4'>
                        <h1 className='text-xl'>{t('roomList.rooms_list')}</h1>
                        <Button type='btn-secondary' circle icon={<Plus />} click={openCreateRoomMondal} />
                    </header>
                    <div className='flex flex-1 flex-col justify-between'>
                        <div className='flex flex-col flex-1'>
                            {!rooms?.length &&
                                <p className='flex flex-1 items-center justify-center'>{t('roomList.no_rooms')}</p>
                            }
                            {!!rooms?.length &&
                                <div className='flex flex-col gap-y-6'>
                                    {rooms.map(room => (
                                        <div key={room.name} className='flex justify-between items-center'>
                                            <p>{room.name} {room.playersCount}/{MAX_PLAYERS_PER_ROOM}</p>
                                            <Button
                                                text='roomList.join_room'
                                                type='btn-secondary'
                                                disabled={room.playersCount >= MAX_PLAYERS_PER_ROOM}
                                                disabledToolTip='roomList.max_players'
                                                click={() => joinRoom(room.name)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <dialog id='createRoomModal' className='modal outline-none'>
                    <form className='flex flex-col modal-box w-[350px] prose' onSubmit={handleSubmit(_createRoom)}>
                        <h1>{t('roomList.create_room')}</h1>
                        <Input placeholder='roomList.room_name' register={register('roomName', { required: true })} errors={errors.roomName} />
                        <div className='flex justify-end gap-x-6'>
                            <Button text='cancel' nativeType='button' type='normal' click={() => (document.getElementById('createRoomModal') as HTMLDialogElement)?.close()} />
                            <Button text='create' type='btn-primary' />
                        </div>
                    </form>
                </dialog> */}
            </>
        </LayoutBall>
    );
};

export default RoomList;

const styles = StyleSheet.create({
    bottomsheet_container: {
        height: SCREEN_HEIGHT,
        top: SCREEN_HEIGHT / 1.5,
    }
})
