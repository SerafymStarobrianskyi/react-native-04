import { Audio } from "expo-av";

export async function playSound(audioPath) {
  const sound = new Audio.Sound();

  try {
    const audioUrl = audioPath.startsWith("//")
      ? `https:${audioPath}`
      : audioPath;

    console.log("Playing:", audioUrl);

    await sound.loadAsync(
      { uri: audioUrl },
      { shouldPlay: true }
    );

    setTimeout(() => sound.unloadAsync(), 2000);
  } catch (error) {
    console.log(error);
  }
}