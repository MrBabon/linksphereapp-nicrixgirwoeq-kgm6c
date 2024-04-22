import { s } from "./HomeScreen.style";
import backgroundImg from '../../assets/images/background.jpg';
import { TxtInria, TxtInriaBold } from "../../components/TxtInria/TxtInria";
import { TxtJostSemiBold } from "../../components/TxtJost/TxtJost";
import { View, ImageBackground, TouchableOpacity} from "react-native";



const HomeScreen = ({ navigation }) => {


  return (
    <>
      <ImageBackground source={backgroundImg} style={s.background_img} imageStyle={s.img}>
        <View style={s.container_name}>
          <TxtJostSemiBold style={s.name}>LinkSphere</TxtJostSemiBold>
        </View>
      </ImageBackground>
      <View style={s.btn_container}>
        <View style={s.container_login}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <TxtInriaBold>Login</TxtInriaBold>
          </TouchableOpacity>
        </View>
        <View style={s.container_sign}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <TxtInria style={s.txt_sign}>Sign Up</TxtInria>
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.yellow}></View>
    </>
  )
}

export default HomeScreen;