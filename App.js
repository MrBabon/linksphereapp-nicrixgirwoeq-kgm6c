// FONT********
import Jost from "./src/assets/fonts/Jost/Jost-VariableFont_wght.ttf";
import JostSemiBold from "./src/assets/fonts/Jost/Jost-SemiBold.ttf";
import JostBold from "./src/assets/fonts/Jost/Jost-Bold.ttf";
import InriaBold from "./src/assets/fonts/Inria/InriaSans-Bold.ttf";
import InriaSansRegular from "./src/assets/fonts/Inria/InriaSans-Regular.ttf";
import InriaLight from "./src/assets/fonts/Inria/InriaSans-Light.ttf";
import { useFonts } from "expo-font";
// ************

import {  StatusBar } from 'react-native';
import  AppNavigator  from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import FlashMessage from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay";


export default function App() {

  const [isFontLoaded] = useFonts({
    "InriaLight": InriaLight,
    "InriaSansRegular": InriaSansRegular,
    "Inria-bold": InriaBold,
    "Jost": Jost,
    "Jost-semibold": JostSemiBold,
    "Jost-bold": JostBold,
  });


  if (!isFontLoaded) {
    return <Spinner />;
  }

  return (
    <AuthProvider>
        <StatusBar backgroundColor="#368FE6" />
          <AppNavigator/>
        <FlashMessage position="top" />
    </AuthProvider>
  );
}

