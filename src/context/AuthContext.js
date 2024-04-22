import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] =useState({});
    const [activePage, setActivePage] = useState('Home');
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    
    const register = (firstName, lastName, phone, email, password, confirmPassword) => {
        // Une fois le formulaire envoyé la page ce met en chargement le temps d'envoyer les infos
        setIsLoading(true);
        axios.post(`${BASE_URL}/users`, {
            user: {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            }
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            // Après envoi de userInfo le chargement peux s'arreter
            setIsLoading(false);


        }).catch(e => {
            console.log(`register error ${e}`);
            setIsLoading(false);
            let errorMessage = "Check your login details and try again."; // Message d'erreur par défaut

            if (e.response && e.response.status === 422) {
                errorMessage = "This email already has an account.";  // Message pour erreur 422
            } else if (e.message) {
                errorMessage = e.message;  // Message d'erreur général basé sur l'exception
            }

            setErrorMessage(errorMessage);
            showMessage({
                message: "Login Error",
                description: errorMessage,
                type: "danger",
                duration: 4000
            });
        })
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/users/sign_in`, {
            email, password
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
        }).catch(e => {
            console.log(`Login error ${e}`);
            setIsLoading(false);
            showMessage({
                message: "Login Error",
                description: "Check your login details and try again.",
                type: "danger",
                duration: 4000
            });
        });
    }

    const logout = () => {
        setIsLoading(true);
        axios.delete(`${BASE_URL}/users/sign_out`, {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        },).then(res => {
            console.log(res.data);
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
            setIsLoading(false);
        }).catch(e => {
            console.log(`Logout error ${e}`);
            setIsLoading(false);
        });
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);
            if(userInfo) {
                setUserInfo(userInfo)
            }
            setSplashLoading(false);
        } catch(e) {
            setSplashLoading(false);
            console.log(`Is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <AuthContext.Provider 
            value={{ 
                isLoading,
                userInfo,
                activePage,
                splashLoading,
                errorMessage,
                register,
                login,
                logout }}>
            {children}
        </AuthContext.Provider>
    );
};