import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  HomeScreen  from '../screens/Home/HomeScreen.jsx';
import  LoginScreen  from "../screens/Login/LoginScreen.jsx";
import  RegisterScreen  from "../screens/Register/RegisterScreen.jsx";
import EventIndexScreen from "../screens/Events/EventIndex/EventIndexScreen.jsx";
import EventShowScreen from "../screens/Events/EventShow/EventShowScreen.jsx";
import ProfilScreen from "../screens/User/Profil/ProfilScreen.jsx";
import SettingsScreen from "../screens/User/Settings/SettingsScreen.jsx";
import RepertoireScreen from "../screens/User/Repertoire/RepertoireScreen.jsx";
import EditScreen from "../screens/User/Edit/EditScreen.jsx"
import ScanScreen from '../screens/User/Scan/ScanScreen.jsx';
import SplashScreen from '../screens/SplashScreen.js';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import Footer from "../components/Footer/Footer.jsx";
import { Easing } from "react-native";
import MyEventsScreen from '../screens/User/MyEvents/MyEventsScreen.jsx';


const Stack = createStackNavigator();

const AppNavigator = () => {
    const {userInfo, userToken, splashLoading} = useContext(AuthContext);
    const [activePage, setActivePage] = useState('Home');
    const navigationRef = useRef(null);

    // Pour changer la couleur de l'icon footer
    const onNavigationStateChange = () => {
        const route = navigationRef.current?.getCurrentRoute();
        setActivePage(route?.name);
    }
    // ----------------------------------------


    return (
        <>
            <NavigationContainer ref={navigationRef} onStateChange={onNavigationStateChange}>
                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                        animationEnabled: true,
                        transitionSpec: {
                            open: {
                                animation: 'timing',
                                config: {
                                    duration: 250, // Durée plus courte pour l'ouverture
                                    easing: Easing.out(Easing.poly(4)), // Utilisation d'un easing personnalisé
                                },
                            },
                            close: {
                                animation: 'timing',
                                config: {
                                    duration: 200, // Durée plus courte pour la fermeture
                                    easing: Easing.out(Easing.poly(4)),
                                },
                            },
                        },}} >
                        {splashLoading ? (
                            <Stack.Screen name='Splash Screen' component={SplashScreen} />
                        ) : 
                        userToken ? (
                            <>
                                <Stack.Screen name="Profil" component={ProfilScreen} />
                                <Stack.Screen name="Settings" component={SettingsScreen} />
                                <Stack.Screen name="Events" component={EventIndexScreen} />
                                <Stack.Screen name="Event" component={EventShowScreen} />
                                <Stack.Screen name="MyEvents" component={MyEventsScreen} />
                                <Stack.Screen name="Repertoire" component={RepertoireScreen} />
                                <Stack.Screen name="Scan" component={ScanScreen} />
                                <Stack.Screen name="Edit" component={EditScreen} />
                            </>
                                ) : (
                            <>
                                <Stack.Screen name="Home" component={HomeScreen} />
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name="Register" component={RegisterScreen} />
                            </>
                        )}
                    </Stack.Navigator>   
            </NavigationContainer>
            {userToken ? (
                <Footer navigation={navigationRef.current} activePage={activePage} />

            ) : (
                null
            )}
        </>
    )
};

export default AppNavigator;