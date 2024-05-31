import { ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { s } from "./RepertoireScreen.style";
import { TxtInria } from "../../../components/TxtInria/TxtInria";
import PlusCircle from "../../../assets/icons/PlusCircle";
import Spinner from "react-native-loading-spinner-overlay";
import { TxtJost, TxtJostBold } from "../../../components/TxtJost/TxtJost";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { ContactGroupsProvider } from "../../../context/ContactGroupsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserSearch } from "../../../components/forms/UserSearch/UserSearch";
import Avatar from "../../../assets/icons/Avatar";
import { showMessage } from "react-native-flash-message";
import { ModalContactGroup } from "../../../components/Modal/ModalContactGroup/ModalContactGroup";
import { add } from "date-fns";

const RepertoireScreen = ({ navigation }) => {
    const {userInfo, userToken, isLoading} = useContext(AuthContext);
    const [contactGroups, setContactGroups] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [users, setUsers] = useState([]);

    const onUserSearch = (userName) => {
        if (userName) {
            const queryString = `?search=${userName}`
            fetchUsers(queryString);
            console.log(queryString);
        } else {
            console.log("User pas trouvé");
            fetchUsers('');
        }
    }
    const fetchUsers = async (queryString) => {
        try {
            const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire${queryString}`, {
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
    
    const addContactGroup = async (groupName) => {
        try {
            const payload = {
                contact_group: { name: groupName }
            }
            const response = await axios.post(`${BASE_URL}users/${userInfo.id}/repertoire/contact_groups`, payload, {
                headers: { Authorization: userToken }
            });
            console.log("response", response.data);

            if (response.status === 201 && response.data) {
                setContactGroups(prevGroups => [...prevGroups, response.data]);

                showMessage({
                    message: "Groupe bien créé",
                    type: "success",
                    duration: 3000
                });
                setModalVisible(false);
            }

        console.log("Groupe bien créé", response.data);

            console.log("Groupe bien créer", response.data);
        }catch(e) {
            console.error(e);
        }
    }

    const addButton = (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <PlusCircle/>
            </TouchableOpacity>
            <ModalContactGroup
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={addContactGroup}
            />
        </>
    )
    const header = (
        <View style={s.container_header}>
            <View style={s.header}>
                {addButton}
                <View style={s.header_texts}>
                    <TxtJost style={s.txtheader}>Groups</TxtJost>
                </View>
            </View>
            <View>
                <View style={s.header_nav}>
                    <TouchableOpacity style={s.navContainer}>
                        <TxtJostBold style={s.nav_txt_active}>My Cards</TxtJostBold>
                        <View style={s.underline}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('MyEvents')}>
                        <TxtJost style={s.nav_txt}>Entreprises</TxtJost>
                    </TouchableOpacity>
                </View>
                <UserSearch onUserSearch={onUserSearch} />
            </View>
        </View>
    )


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userInfo && userToken) {
                    const response = await axios.get(`${BASE_URL}users/${userInfo.id}/repertoire`, {
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
        fetchData();
    }, [userInfo.id, userToken])

    return (
        <>
            <Spinner/>
            <ContactGroupsProvider>
                {header}
                <ScrollView>
                    <View style={s.container}>
                        {users.length > 0 ? (
                            users.map(user => (
                                <TouchableOpacity key={`user-${user.id}`}  onPress={() => navigation.navigate("UserContactGroup", {userId: user.id})}>
                                    <View style={s.contactGroup}>
                                        <TxtInria>{user.first_name} {user.last_name}</TxtInria>
                                        <Avatar uri={user.avatar_url} style={s.avatar_url} svgStyle={s.avatar_url} />
                                    </View>
                                    <View style={s.border}></View>
                                </TouchableOpacity>
                            ))
                        ) : (
                            contactGroups.map(group => (
                                <TouchableOpacity key={`group-${group.id}`} onPress={() => navigation.navigate("ContactGroup", { groupId: group.id })}>
                                    <View style={s.contactGroup}>
                                        <TxtInria>{group.name}</TxtInria>
                                        <TxtInria style={s.count}>{group.userCount}</TxtInria>
                                    </View>
                                    <View style={s.border}></View>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </ScrollView>
            </ContactGroupsProvider>
        </>
    )
};


export default RepertoireScreen;