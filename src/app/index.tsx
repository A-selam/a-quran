// import { router } from "expo-router";
// import { Button, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function HomeScreen() {
//   const goNext = () => {
//     router.push({
//       pathname: "/explore",
//       params: {
//         name: "Ali",
//         age: 25,
//       },
//     });
//   };

//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <Text>Hello this is kinda home</Text>;
//         <Button title="Next page" onPress={goNext} />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "flex-start",
//     backgroundColor: "red",
//     height: 100,
//   },
// });

import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useChapterAudio,
  useChapters,
  useReciters,
} from "../hooks/useQuranAudio";

export default function QuranAudioScreen() {
  // User Selection State
  const [selectedReciterId, setSelectedReciterId] = useState<number | null>(
    null,
  );
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<
    number | null
  >(null);

  // TanStack Query Hooks
  const { data: reciters, isLoading: loadingReciters } = useReciters();
  const { data: chapters, isLoading: loadingChapters } = useChapters();
  const {
    data: audioData,
    isLoading: loadingAudio,
    isError: audioError,
  } = useChapterAudio(selectedReciterId, selectedChapterNumber);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Quran Recitations</Text>

        {/* STEP 1: SELECT RECITER */}
        <Text style={styles.sectionTitle}>1. Select Reciter</Text>
        {loadingReciters ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            horizontal
            data={reciters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedReciterId;
              return (
                <TouchableOpacity
                  style={[styles.chip, isSelected && styles.selectedChip]}
                  onPress={() => setSelectedReciterId(item.id)}
                >
                  <Text style={isSelected ? styles.selectedText : styles.text}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {/* STEP 2: SELECT CHAPTER */}
        <Text style={styles.sectionTitle}>2. Select Chapter</Text>
        {loadingChapters ? (
          <ActivityIndicator size="small" />
        ) : (
          <FlatList
            horizontal
            data={chapters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedChapterNumber;
              return (
                <TouchableOpacity
                  style={[styles.chip, isSelected && styles.selectedChip]}
                  onPress={() => setSelectedChapterNumber(item.id)}
                >
                  <Text style={isSelected ? styles.selectedText : styles.text}>
                    {item.id}. {item.nameSimple}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {/* STEP 3: AUDIO PLAYER / LINK */}
        <Text style={styles.sectionTitle}>3. Audio Status</Text>
        {loadingAudio && (
          <View style={styles.statusBox}>
            <ActivityIndicator />
            <Text>Fetching audio link...</Text>
          </View>
        )}

        {audioError && (
          <Text style={{ color: "red" }}>
            Failed to fetch recitation audio.
          </Text>
        )}

        {audioData?.audioFile?.audioUrl && (
          <View style={styles.statusBox}>
            <Text style={styles.audioUrlText}>
              Audio URL Ready: {audioData.audioFile.audioUrl}
            </Text>
            {/* Here you pass audioData.audioFile.audioUrl to react-native-track-player or expo-av */}
            <Button
              title="Play Audio"
              onPress={() => {
                console.log("Playing:", audioData.audioFile.audioUrl);
              }}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 8,
    height: 36,
  },
  selectedChip: { backgroundColor: "#007AFF" },
  text: { color: "#333" },
  selectedText: { color: "#fff", fontWeight: "bold" },
  statusBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  audioUrlText: { fontSize: 12, marginBottom: 8 },
});
