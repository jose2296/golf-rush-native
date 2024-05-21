import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EzzText from '../ezz-text';

interface TabsProps {
    routes: Route[];
    activeRoute: string;
};
export interface Route {
    route: string;
    text: string;
    headerTitle: string;
    disabled?: boolean;
}

export const Tabs = ({  routes, activeRoute }: TabsProps)  => {
    const [active, setActive] = useState(activeRoute);

    const handleActive = (route: Route) => {
        setActive(route.route);
        // router.setOptions({ headerTitle: t(route.headerTitle) as string });
        router.navigate(route.route);
    }

    const styles = StyleSheet.create({
        menuContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 20,
            padding: 20,
            width: '100%',
            position: 'absolute',
            bottom: 0
        },
        active: {
            backgroundColor: 'purple',
            color: 'black',
            fontWeight: 'bold'
        },
        disabled: {
            backgroundColor: '#B2B2B2',
            color: '#ffffff',
            fontWeight: 'bold'
        },
        text: {
            paddingHorizontal: 30,
            paddingVertical: 6,
            lineHeight: 18,
            fontSize: 16,
            borderRadius: 15,
            color: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }
    });

    return (
        <View style={styles.menuContainer}>
            { routes.map(route =>
                <EzzText
                    key={route.route}
                    onPress={ () => route.disabled ? () => {} : handleActive(route)}
                    text={route.text}
                    style={[styles.text, active === route.route ? styles.active : null, route.disabled ? styles.disabled : null]}
                />
            )}
        </View>
    )
}
