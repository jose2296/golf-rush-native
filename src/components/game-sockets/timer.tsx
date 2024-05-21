import { useEffect, useRef, useState } from 'react';

const useTimer = (initialState = 0) => {
    const [timeFormatted, setTimeFormatted] = useState('');
    const [timer, setTimer] = useState(initialState);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const countRef = useRef<any>(null);

    const formatTime = (timer: number) => {
        const miliSeconds = `0${timer % 100}`.slice(-2);
        const seconds = Math.floor(timer / 100);
        const getSeconds = `0${(seconds % 60)}`.slice(-2);
        const minutes = Math.floor(seconds / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes} : ${getSeconds} : ${miliSeconds}`;
    };

    useEffect(() => {
        setTimeFormatted(formatTime(timer));
    }, [timer]);

    const handleStart = () => {
        setIsActive(true);
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 10);
    };

    const handlePause = () => {
        clearInterval(countRef.current);
        setIsPaused(false);
    };

    const handleResume = () => {
        setIsPaused(true);
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);
    };

    const handleReset = () => {
        clearInterval(countRef.current);
        setIsActive(false);
        setIsPaused(false);
        setTimer(0);
    };

    return { timeFormatted, timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset, formatTime };
};

export default useTimer;
