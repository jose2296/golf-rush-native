import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CalendarIcon from '../../assets/svg/Calendar';
import DashboardIcon from '../../assets/svg/Dashboard';
import EditProfileIcon from '../../assets/svg/Edit-profile';
import LeadsIcon from '../../assets/svg/Leads';
import LogOutIcon from '../../assets/svg/Log-out';
import EzzText from '../ezz-text';

enum RouteTypes {
    route = 'Route',
    button = 'Button',
    divider = 'Divider',
}

interface Route {
    type: RouteTypes.route | RouteTypes.button | RouteTypes.divider;
    icon?: JSX.Element;
    routeName?: string;
    text?: string;
    onPress?: () => void;
}

const Item = ({
    data,
    activeRoute,
}: {
    activeRoute: string;
    data: Route;
}) => {
    const styles = StyleSheet.create({
        items: {
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 20,
            marginLeft: 20,
        },
        icon: {
            marginRight: 30,
            width: 30,
            height: 30
        },
        text: {
            fontSize: 16,
        },
        active: {
            color: 'purple',
            fontWeight: 'bold',
        },
    });

    if (data.type === RouteTypes.divider) {
        return (
            // <Divider
            <View
                style={{
                    marginBottom: 20,
                    backgroundColor: 'yellow',
                    height: 1
                }}
            />
        );
    }

    const active = `/${activeRoute}` === data.routeName;
    const onPressButtonType = () => (data.onPress ? data.onPress() : null);
    const onPressRouterType = () => data.routeName ? router.navigate(data.routeName) : null;

    return (
        <TouchableOpacity
            onPress={() =>
                data.type === RouteTypes.button
                    ? onPressButtonType()
                    : onPressRouterType()
            }
        >
            <View style={styles.items}>
                <View style={styles.icon}>
                    {data.icon}
                </View>
                <EzzText text={data.text as string} style={[styles.text, active ? styles.active : null]} />
            </View>
        </TouchableOpacity>
    );
};

export const Drawer = ({
    state,
}: DrawerContentComponentProps) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#f5f6f8',
            height: '100%',
        },
        header: {
            backgroundColor: '#f5f6f8',
            padding: 20,
            height: 50,
            justifyContent: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: 'grey',
        },
        profileImage: {
            marginLeft: 20,
            marginRight: 30,
            width: 50,
            height: 50,
            borderRadius: 50,
        },
        userName: {
            color: 'pink',
            fontSize: 16,
        },
        itemList: {
            marginTop: 20,
        },
        communityContainer: {
            marginTop: 10,
            marginHorizontal: 20,
        },
        genericText: {
            color: '#747373',
            marginRight: 20,
        },
        btnContainer: {
            marginVertical: 30,
            width: 200,
        },
    });

    const userImg = require('../../assets/user_default.png');

    const activeRoute = state.routeNames[state.index];

    const logout = async () => {
        const token = await AsyncStorage.getItem('user-token');
        const options = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        // TODO: FIREBASE LOGOUT
        // Axios.post(`${process.env.EXPO_PUBLIC_API_URL}/logout`, null, options).then(() => {
        //     dispatch({ action: 'logout' });
        // }).catch(error => {
        //     AsyncStorage.removeItem('user-token');
        //     NativeModules.DevSettings.reload();
        // });
    };

    const items: Route[] = [
        {
            type: RouteTypes.route,
            routeName: '/profile',
            icon: <EditProfileIcon/>,
            text: 'edit_profile',
        },
        {
            type: RouteTypes.button,
            onPress: logout,
            icon: <LogOutIcon/>,
            text: 'logout',
        },
        {
            type: RouteTypes.divider,
        },
        {
            type: RouteTypes.route,
            routeName: '/System',
            icon: <DashboardIcon/>,
            text: 'system',
        },
        {
            type: RouteTypes.route,
            routeName: '/Historical',
            icon: <CalendarIcon/>,
            text: 'historical_data',
        },
        {
            type: RouteTypes.route,
            routeName: '/report',
            icon: <LeadsIcon/>,
            text: 'monthly_reports',
        },
        {
            type: RouteTypes.divider,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Image
                        source={userImg}
                        style={styles.profileImage}
                    />
                    <EzzText text={'storeState.user?.name'} style={styles.userName} />
                </View>
                <View style={styles.itemList}>
                    {items.map((item, index) => (
                        <Item
                            key={index}
                            data={item}
                            activeRoute={activeRoute}
                        />
                    ))}
                </View>
                {/* <View style={styles.communityContainer}>
                    <EzzText
                        text='Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Quos, eos ad veritatis ullam quae temporibus ex
                            voluptatem aspernatur deserunt numquam dolorum iste
                            repellat eveniet, consequuntur iure. Dolores asperiores
                            earum eum.'
                        style={styles.genericText}
                    />
                    <View style={styles.btnContainer}>
                        <EzzButton
                            text='go to community'
                            onPress={() => alert('Button clicked')}
                        />
                    </View>
                </View> */}
            </View>
        </SafeAreaView>
    );
};
