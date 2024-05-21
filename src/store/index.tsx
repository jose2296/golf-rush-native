import { create } from 'zustand';

export interface SetUserData {
    name: string;
    surname: string;
    color: string;
    stela: string;
}

export interface State {
    userData: {
        uid: string;
        name?: string;
        surname?: string;
        color?: string;
        stela?: string;
    } | null;
    inGameMode?: boolean;
    setUserUid: (uid: string) => void;
    toggleInGameMode: (value: boolean) => void;
    setUserData: (userData: SetUserData) => void;
    removeUserData: () => void;
}

const useStore = create<State>((set) => ({
    userData: null,
    setUserUid: (uid: string) => set(() => ({ userData: { uid }})),
    setUserData: (userData: SetUserData) => set((state) => ({ userData: { uid: state.userData?.uid as string, ...userData} })),
    removeUserData: () => set({ userData: null }),
    toggleInGameMode: (value: boolean) => set({ inGameMode: value }),
}));

export default useStore;
