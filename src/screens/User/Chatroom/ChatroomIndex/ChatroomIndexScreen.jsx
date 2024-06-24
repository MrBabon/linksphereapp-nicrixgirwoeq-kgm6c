import { View } from "react-native";
import { TxtInria } from "../../../../components/TxtInria/TxtInria";
import Header from "../../../../components/Header/Header";

const ChatroomIndexScreen = ({ navigation }) => {
    return (
        <>
            <Header
                title={"Messages"}
                />
            <View>
                <TxtInria>Chatroom Index</TxtInria>
            </View>
        </>
    )
}

export default ChatroomIndexScreen;