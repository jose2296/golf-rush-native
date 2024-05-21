import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Player } from './models';

export type Map = {
    id: number;
    name: string;
    slug: string;
    map?: any;
    playerPosition?: Player['pos'];
}

export const availableMaps: { [key: string]: Map } = {
    'map-1': {
        id: 1,
        slug: 'map-1',
        name: 'Map 1',
        map: <View />,
        // map: <Map />,
        playerPosition: {x: -50, y: 0, z: 0}
    },
    'map-2': {
        id: 2,
        slug: 'map-2',
        name: 'Map 2',
        map: <View />,
        // map: <Ground />,
        playerPosition: {x: 0, y: 10, z: 0}

    }
};

export const useMap = (initialMaps: string[]) => {
    const [maps, setMaps] = useState<string[]>(initialMaps);
    const [map, setMap] = useState<Map>();
    const [currentMapIndex, setCurrentMapIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    // useEffect(() => {
    //     setMaps(initialMaps);
    // }, [initialMaps]);

    useEffect(() => {
        if (maps.length) {
            const nextMap = maps[currentMapIndex];
            console.log(maps, nextMap);

            if (nextMap) {
                setMap(availableMaps[nextMap]);
            } else {
                setFinished(true);
            }
        }

    }, [currentMapIndex, maps]);

    const nextMap = () => {
        setCurrentMapIndex(currentMapIndex + 1);
    };


    return { map, finished, setMaps, nextMap, setFinished };
};
