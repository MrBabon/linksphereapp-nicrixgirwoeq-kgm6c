import { View } from "react-native";
import { TxtInria } from "../../../../components/TxtInria/TxtInria";


const ChatroomShowScreen = ({ route, navigation }) => {
    const { userId } = route.params
    return (
        <View>
            <TxtInria>Chatroom Show</TxtInria>
        </View>
    )
}

export default ChatroomShowScreen;