import {
  View,
  ScrollView,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { getWordInfo } from "../services/wordsHandler";
import { playSound } from "../services/soundHandler";

function AddWord({ switchScreen, setWords }) {
  const [text, setText] = useState("");
  const [wordInfo, setWordInfo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (text.trim()) {
        const info = await getWordInfo(text);
        setWordInfo(info);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [text]);

  const addWord = () => {
    if (!wordInfo) {
      return;
    }

    setWords((prevWords) => [...prevWords, wordInfo]);
    switchScreen("AllWords");
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Pressable
        style={styles.backButton}
        onPress={() => switchScreen("AllWords")}
      >
        <Ionicons name="arrow-back-outline" size={28} color="blue" />
      </Pressable>

      <Text style={styles.label}>Your word to search:</Text>

      <TextInput
        placeholder="type here.."
        style={styles.input}
        onChangeText={setText}
        value={text}
      />

      {wordInfo && (
        <View style={styles.wordInfo}>
          <View style={styles.wordHeader}>
            <Text style={styles.word}>{wordInfo.word}</Text>

            {wordInfo.audio && (
              <Pressable
                style={styles.soundButton}
                onPress={() => playSound(wordInfo.audio)}
              >
                <Ionicons name="volume-medium-outline" size={22} color="blue" />
              </Pressable>
            )}

            {wordInfo.phonetics && (
              <Text style={styles.phonetics}>{wordInfo.phonetics}</Text>
            )}
          </View>

          {wordInfo.partOfSpeech && (
            <Text style={styles.partOfSpeech}>{wordInfo.partOfSpeech}</Text>
          )}

          <Text style={styles.meaning}>{wordInfo.meaning}</Text>

          <Pressable style={styles.addButton} onPress={addWord}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  backButton: {
    alignSelf: "flex-start",
    padding: 5,
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    color: "gray",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 3,
  },

  wordInfo: {
    marginTop: 15,
  },

  wordHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  word: {
    fontSize: 28,
    fontWeight: "500",
    marginRight: 12,
  },

  soundButton: {
    marginRight: 14,
    padding: 4,
  },

  phonetics: {
    fontSize: 16,
  },

  partOfSpeech: {
    fontSize: 14,
    marginTop: 2,
  },

  meaning: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 18,
  },

  addButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AddWord;
