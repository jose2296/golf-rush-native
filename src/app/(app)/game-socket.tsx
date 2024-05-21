import EzzButton from '@/components/ezz-button';
import EzzText from '@/components/ezz-text';
import { Player, Room as RoomData, SokcetStatus } from '@/components/game-sockets/models';
import RoomList from '@/components/game-sockets/room-list';
import useTimer from '@/components/game-sockets/timer';
import { availableMaps, useMap } from '@/components/game-sockets/use-map';
import useStore from '@/store';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import parser from 'socket.io-msgpack-parser';

const APIURL = 'https://golf-rush-jose-jerez.koyeb.app' || process.env.EXPO_PUBLIC_API_URL as string;

// const url = 'https://golf-rush-jose-jerez.koyeb.app/';
// const url = 'https://golf-rush-server.onrender.com';
// const url = 'http://localhost:3001';

const socket = io(APIURL, {
    transports: ['websocket'],
    autoConnect: false,
    parser
});

export default function() {
    // const [socket, setSocket] = useState<Socket>();
    const [socketStatus, setSocketStatus] = useState<SokcetStatus>('ready-to-connect');
    const [currentRoom, setCurrentRoom] = useState<string>();
    const [roomData, setRoomData] = useState<RoomData>();
    const [players, setPlayers] = useState<Player[]>();
    const [rooms, setRooms] = useState<RoomData[]>();
    const [loadingGame, setLoadingGame] = useState<boolean>(false);
    const userData = useStore(state => state.userData);
    const { timeFormatted, timer, handleStart, handlePause, handleReset } = useTimer(0);
    const { map, finished, setFinished, nextMap, setMaps } = useMap(Object.keys(availableMaps).reverse());

    useEffect(() => {
        initializeSocketConnection();

        return () => {
            socket?.disconnect();
            setSocketStatus('disconnected');
        };
    }, []);

    const initializeSocketConnection = async () => {
        socket.connect();

        socket.on('connect_error', (err) => {
            console.log(err.message);
        });
        socket.on('connect_error', (err) => {
            console.error(`connect_error due to ${err.message}`);
            setSocketStatus('error');
        });

        setSocketStatus('connecting');

        socket.on('connected', () => {
            setSocketStatus('connected');
        });
        socket.on('update-rooms', (rooms: RoomData[]) => {
            setRooms(rooms);
        });
    };

    const createRoom = (roomName: string) => {
        console.log('CREATING ROOM');

        socket?.emit('create-room', { roomName });
    };

    const joinRoom = (roomNameParam?: string) => {
        const roomName = roomNameParam || 'test';
        socket?.emit('join-room', { roomName, playerPosition: availableMaps['map-1'].playerPosition });
        // setSocketStatus('in-room');
        setCurrentRoom(roomName);
        socket?.emit('set-player-data', { userData, roomName });
        socket?.on('players', (players) => {
            setPlayers(players);
        });
        socket?.on('update-room', (room: RoomData) => {
            setRoomData(room);
            if (room.status === 'start') {
                setLoadingGame(false);
                handleReset();
                handleStart();
                // (document.getElementById('resultsModal') as HTMLDialogElement)?.close();
                setSocketStatus('start');
            }

            if (room.status === 'finished') {
                setTimeout(() => {
                    (document.getElementById('resultsModal') as HTMLDialogElement).showModal();
                }, 200);
            }
        });
    };

    const leaveRoom = () => {
        setRoomData(undefined);
        setSocketStatus('connected');
        socket?.emit('leave-room', ({ roomName: currentRoom }));
    };

    const handleStartGame = () => {
        socket?.emit('start', ({ roomName: currentRoom }));
    };

    const updatePlayer = (position: Player['pos']) => {
        socket?.emit('update-player', ({ position, roomName: currentRoom }));
    };

    const updateStrokes = () => {
        socket?.emit('update-player-strokes', ({ roomName: currentRoom }));
    };

    const onHoleTrigger = (playerId: string) => {
        if (playerId === socket?.id) {
            handlePause();
        }
        socket?.emit('player-hole', ({ playerHole: playerId, roomName: currentRoom, time: timer, timeFormatted }));
    };

    const handleNewGame = () => {
        setLoadingGame(true);

        nextMap();
        socket?.emit('restart-room', ({ roomName: currentRoom, playerPosition: availableMaps['map-1'].playerPosition }));
    };

    const togglePlayerReady = () => {
        socket?.emit('toggle-player-room-ready', ({ roomName: currentRoom }));
    };

    return (
        <>
            {!roomData &&
                <>
                    {socketStatus === 'connecting' &&
                        <EzzText text={'Connecting...'} />
                    }
                    {socketStatus === 'error' &&
                        <EzzText text={'Error conection to server, please wait and try again later'} />
                    }
                    {socketStatus === 'disconnected' &&
                        <>
                            <EzzText text={'Disconnected'} />
                            {/* <button className='btn btn-primary' onClick={initializeSocketConnection}>Reconnect</button> */}
                        </>
                    }
                    {socketStatus === 'connected' &&
                        <RoomList rooms={rooms as RoomData[]} joinRoom={joinRoom} createRoom={createRoom} />
                    }
                </>
            }
            {!!roomData &&
                <>
                    <EzzText text={'ROOM DATA'} />
                    <EzzButton text='exit' onPress={leaveRoom} />
                </>
            }
        </>
    )
}
