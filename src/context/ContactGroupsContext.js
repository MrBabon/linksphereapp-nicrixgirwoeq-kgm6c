import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ContactGroupsContext = createContext();

export const ContactGroupsProvider = ({ children }) => {
    const {userInfo, userToken} = useContext(AuthContext);
    const [contactGroups, setContactGroups] = useState([]);
    const [splashLoading, setSplashLoading] = useState(false);


    const addContactGroup = (newContactGroup) => {
        setContactGroups([...contactGroups, newContactGroup]);
      };
    
    const removeContactGroup = (contactGroupId) => {
        setContactGroups(contactGroups.filter((group) => group.id !== contactGroupId));
    };   


    const loadContactGroupsFromServer = async () => {
        try {
            setSplashLoading(true);
            let contactGroups = await AsyncStorage.getItem('contactGroups');
            contactGroups = JSON.parse(contactGroups);
            if(contactGroups) {
                setContactGroups(contactGroups)
            }
            setSplashLoading(false);
        } catch(e) {
            setSplashLoading(false);
            console.log(`Is logged in error ${e}`);
        }
    };
    useEffect(() => {
        loadContactGroupsFromServer();
    }, [])

    return (
        <ContactGroupsContext.Provider
        value={{
            contactGroups,
            splashLoading,
            loadContactGroupsFromServer,
            addContactGroup,
            removeContactGroup
        }}>
            {children}
        </ContactGroupsContext.Provider>
    )
}