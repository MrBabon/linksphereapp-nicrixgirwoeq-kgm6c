import { ScrollView, View } from "react-native";
import Header from "../../../components/Header/Header";
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import api from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import { s } from "./ShareScreen.style";
import Avatar from "../../../assets/icons/Avatar";


const ShareScreen = ({ route, navigation }) => {
    const { user } = route.params;
    const {userInfo, userToken, isLoading} = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [contactGroups, setContactGroups] = useState([]);


    const fetchUsers = async (queryString) => {
        try {
            const response = await api.get(`/users/${userInfo.id}/repertoire${queryString}`, {
                headers: { Authorization: userToken }
            });
            let allUsers = response.data.users;

            const user = allUsers.filter(item => item.type === 'user').map(user => ({
                id: user.id,
                first_name: user.attributes.first_name,
                last_name: user.attributes.last_name,
                avatar_url: user.attributes.avatar_url
            }))
            console.log("resultat",user);
            setUsers(user);
        
        } catch (e) {
            console.error(e);
        }
    }

    const fetchData = async () => {
        try {
            if (userInfo && userToken) {

                const response = await api.get(`/users/${userInfo.id}/repertoire`, {
                    headers: {
                        'Authorization': userToken
                    }
                });
                const data = response.data.repertoire.data;
                const included = response.data.repertoire.included;

                const usersMap = new Map();
                const userContactGroupsMap = new Map();
                included.filter(item => item.type === 'user').forEach(user => {
                    usersMap.set(user.id, {
                        id: user.id,
                        ...user.attributes
                    });
                });
                
                included.filter(item => item.type === 'user_contact_group').forEach(ucg => {
                    if (!userContactGroupsMap.has(ucg.attributes.contact_group_id)) {
                        userContactGroupsMap.set(ucg.attributes.contact_group_id, []);
                    }
                    userContactGroupsMap.get(ucg.attributes.contact_group_id).push(usersMap.get(ucg.attributes.user_id));
                });

                const fetchedGroups = included.filter(item => item.type === 'contact_group').map(group => ({
                    id: group.id,
                    name: group.attributes.name,
                    userCount: group.attributes.user_count,
                    users: userContactGroupsMap.get(group.id) || []
                }));
                 
                setContactGroups(fetchedGroups);
                await AsyncStorage.setItem('contactGroups', JSON.stringify(fetchedGroups));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [userInfo.id, userToken])
    );

    return (
        <>
            <Header
                title={"Share with"}
                showBackButton={true}
                onBackPress={() => navigation.goBack()}
            />
            <ScrollView>
                <View style={s.container}>
                    <View>
                        <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url}/>
                    </View>
                    <TxtInria>{user.first_name} {user.last_name}</TxtInria>
                </View>

            </ScrollView>
        </>
    )
}

export default ShareScreen;