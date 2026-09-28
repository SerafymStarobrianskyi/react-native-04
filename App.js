import { useState } from "react";
import AllWords from "./screens/AllWords";
import AddWord from "./screens/AddWord";
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar as NativeStatusBar,
  Image,
} from "react-native";

export default function App() {
  const [words, setWords] = useState([]);
  const [screen, setScreen] = useState("AllWords");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image
        source={require("./assets/title-reading-side.png")}
        style={styles.image}
      />

      {screen === "AllWords" ? (
        <AllWords words={words} setWords={setWords} switchScreen={setScreen} />
      ) : (
        <AddWord switchScreen={setScreen} setWords={setWords} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop:
      Platform.OS === "android" ? (NativeStatusBar.currentHeight ?? 0) : 0,
  },

  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});
