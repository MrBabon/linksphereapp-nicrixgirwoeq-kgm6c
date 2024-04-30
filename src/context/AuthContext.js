import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BASE_URL } from '../config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import * as FileSystem from 'expo-file-system'


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] =useState({});
    const [userToken, setUserToken] = useState(null);
    const [activePage, setActivePage] = useState('Home');
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    
    const register = (firstName, lastName, phone, email, password, confirmPassword) => {
        // Une fois le formulaire envoyé la page ce met en chargement le temps d'envoyer les infos
        setIsLoading(true);
        axios.post(`${BASE_URL}signup`, {
            user: {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            }
        }).then(res => {
            let userInfo = res.data.data;
            let token = res.headers['authorization'];
            setUserInfo(userInfo);
            setUserToken(token);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', token);
            // Après envoi de userInfo le chargement peux s'arreter
            setIsLoading(false);
            showMessage({
                message: "Welcome in LinkSphere",
                type: "success",
                duration: 4000
            });

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

        axios.post(`${BASE_URL}login`, {
            user: {
                email: email,
                password: password
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let userInfo = res.data.data;
            let token = res.headers['authorization'];
            setUserInfo(userInfo);
            setUserToken(token);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', token);
            setIsLoading(false);
        }).catch(e => {
            console.log(`Login error ${e}`);
            console.log(e.response.data);
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
        console.log("Token being sent on logout:", userToken);
        axios.delete(`${BASE_URL}logout`, {
            headers: { Authorization: `${userToken}` } // Mettez les headers dans le deuxième paramètre directement
        }).then(res => {
            console.log("Logout successful:", res.data);
            AsyncStorage.removeItem('userInfo');
            AsyncStorage.removeItem('userToken');
            setUserInfo({});
            setUserToken(null);
            setIsLoading(false);
        }).catch(e => {
            console.error(`Logout error:`, e);
            setIsLoading(false);
        });
    }

    const convertImageToBase64 = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to Base64:", error);
        }
    }
    

    const updateProfil = async (firstName, lastName, phone, email, job,  biography, website, linkedin, instagram, facebook, twitter, currentPassword, avatar) => {
        setIsLoading(true);
        console.log('Avatar reçu:', avatar); 
        let formData = new FormData();

        // Ajoute les autres données
        formData.append('user[first_name]', firstName);
        formData.append('user[last_name]', lastName);
        formData.append('user[phone]', phone);
        formData.append('user[email]', email);
        formData.append('user[job]', job);
        formData.append('user[biography]', biography);
        formData.append('user[website]', website);
        formData.append('user[linkedin]', linkedin);
        formData.append('user[instagram]', instagram);
        formData.append('user[facebook]', facebook);
        formData.append('user[twitter]', twitter);
        formData.append('user[current_password]', currentPassword);

        if (Array.isArray(avatar) && avatar.length > 0) {
            const uri = avatar[0];
            if (typeof uri === 'string') {
                const uriParts = uri.split('.');
                const fileType = uriParts[uriParts.length - 1];
                const uniqueName = `avatar-${Date.now()}.${fileType}`;
                formData.append('user[avatar]', {
                    uri: uri,
                    name: uniqueName,
                    type: `image/${fileType}`
                });
            } else {
                console.error('Le premier élément de avatar doit être une chaîne de caractères', uri);
            }
        } else {
            console.error('avatar doit être un tableau avec au moins un élément', avatar);
        }
        
        try {
            const response = await axios.patch(`${BASE_URL}signup`, formData, {
                headers: {
                    Authorization: `${userToken}`,
                    'Content-Type': 'multipart/form-data',
                    accept: 'application/json',
                }
            });
        
            if (response && response.data) {
                console.log("Réponse de l'API:", response.data.data);
                console.log(userToken);
                let userInfo = response.data.data;
                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setUserInfo(userInfo);
                showMessage({ type: 'success', message: 'Profil mis à jour avec succès' });
            } else {
                console.error('Réponse de mise à jour du profil invalide:', response);
                setErrorMessage("Réponse de mise à jour du profil invalide");
                showMessage({ type: 'error', message: 'Erreur de mise à jour' });
            }
        } catch (error) {
            // Affiche un message d'erreur général en cas d'échec de la requête
            console.error('Erreur lors de la mise à jour du profil:', error);
            showMessage({
                message: "Update Failed",
                description: "Une erreur s'est produite lors de la mise à jour du profil.",
                type: "error",
                duration: 4000
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if(userInfo) {
                setUserInfo(userInfo)
                setUserToken(userToken)
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
                userToken,
                activePage,
                splashLoading,
                errorMessage,
                register,
                login,
                logout,
                updateProfil }}>
            {children}
        </AuthContext.Provider>
    );
};