import { View, Pressable, Text, StyleSheet, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";

function AllWords({ words, setWords, switchScreen }) {
  const deleteWord = (index) => {
    setWords((prevWords) =>
      prevWords.filter((_, wordIndex) => wordIndex !== index),
    );
  };

  const renderWord = ({ item, index }) => (
    <View style={styles.wordCard}>
      <Pressable
        style={styles.iconButton}
        onPress={() => {
          if (item.audio) {
            playSound(item.audio);
          }
        }}
      >
        <Ionicons name="play-outline" size={24} color="blue" />
      </Pressable>

      <View style={styles.wordContent}>
        <Text style={styles.word}>{item.word}</Text>

        <Text style={styles.meaning} numberOfLines={2}>
          {item.meaning}
        </Text>
      </View>

      <Pressable style={styles.iconButton} onPress={() => deleteWord(index)}>
        <Ionicons name="trash-outline" size={22} color="red" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.addButton}
        onPress={() => switchScreen("AddWord")}
      >
        <Ionicons name="add-outline" size={35} color="white" />
      </Pressable>

      <FlatList
        data={words}
        renderItem={renderWord}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No words yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  addButton: {
    alignSelf: "flex-end",
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 20,
    color: "gray",
  },

  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginBottom: 7,
    borderRadius: 5,

    elevation: 3,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },

  iconButton: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  wordContent: {
    flex: 1,
    marginHorizontal: 5,
  },

  word: {
    fontSize: 17,
    fontWeight: "bold",
  },

  meaning: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
  },
});

export default AllWords;
