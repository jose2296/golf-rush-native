import { State } from '@/store';

export type SokcetStatus = 'ready-to-connect' | 'connecting' | 'connected' | 'start' | 'in-room' | 'hole-finished' | 'disconnected' | 'error';
export type Player = {
    id: string;
    strokes: number;
    holed: boolean;
    holedTime: Date;
    time: number;
    timeFormatted: string;
    pos: { x: number, y: number, z: number };
    userData: State['userData'];
    roomStatus: 'ready' | 'waiting'
};

export type Room = {
    name: string;
    winner: string;
    admin: string;
    playersCount: number;
    status: 'start' | 'lobby' | 'lobby-ready' | 'finished';
}
