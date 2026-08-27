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

import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "../../convex/_generated/api";

export default function QuranAudioScreen() {
  const [selectedReciterId, setSelectedReciterId] = useState<number | null>(
    null,
  );
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<
    number | null
  >(null);
  const [reciters, setReciters] = useState<
    Awaited<ReturnType<typeof getReciters>>
  >([]);
  const [chapters, setChapters] = useState<
    Awaited<ReturnType<typeof getChapters>>
  >([]);
  const [audioData, setAudioData] = useState<Awaited<
    ReturnType<typeof getAudio>
  > | null>(null);
  const [loadingReciters, setLoadingReciters] = useState(true);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const getReciters = useAction(api.quran.getReciters);
  const getChapters = useAction(api.quran.getChapters);
  const getAudio = useAction(api.quran.getAudio);

  useEffect(() => {
    let active = true;

    void getReciters()
      .then((data) => {
        if (active) setReciters(data);
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoadingReciters(false);
      });

    return () => {
      active = false;
    };
  }, [getReciters]);

  useEffect(() => {
    if (selectedReciterId === null) {
      setChapters([]);
      return;
    }

    let active = true;
    setLoadingChapters(true);
    setSelectedChapterNumber(null);
    setAudioData(null);

    void getChapters({ reciterId: String(selectedReciterId) })
      .then((data) => {
        if (active) setChapters(data);
      })
      .catch(() => {
        if (active) setChapters([]);
      })
      .finally(() => {
        if (active) setLoadingChapters(false);
      });

    return () => {
      active = false;
    };
  }, [getChapters, selectedReciterId]);

  useEffect(() => {
    if (selectedReciterId === null || selectedChapterNumber === null) {
      setAudioData(null);
      return;
    }

    let active = true;
    setLoadingAudio(true);
    setAudioError(false);

    void getAudio({
      reciterID: String(selectedReciterId),
      chapterID: selectedChapterNumber,
    })
      .then((data) => {
        if (active) setAudioData(data);
      })
      .catch(() => {
        if (active) setAudioError(true);
      })
      .finally(() => {
        if (active) setLoadingAudio(false);
      });

    return () => {
      active = false;
    };
  }, [getAudio, selectedChapterNumber, selectedReciterId]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Quran Recitations</Text>

        <Text style={styles.sectionTitle}>1. Select Reciter</Text>
        {loadingReciters ? (
          <ActivityIndicator size="small" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {reciters.map((item) => {
              const isSelected = item.id === selectedReciterId;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.chip, isSelected && styles.selectedChip]}
                  onPress={() => setSelectedReciterId(item.id)}
                >
                  <Text style={isSelected ? styles.selectedText : styles.text}>
                    {item.translatedName.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <Text style={styles.sectionTitle}>2. Select Chapter</Text>
        {loadingChapters ? (
          <ActivityIndicator size="small" />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {chapters.map((item) => {
              const isSelected = item.id === selectedChapterNumber;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.chip, isSelected && styles.selectedChip]}
                  onPress={() => setSelectedChapterNumber(item.id)}
                >
                  <Text style={isSelected ? styles.selectedText : styles.text}>
                    {item.id}. {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

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

        {audioData?.audioUrl && (
          <View style={styles.statusBox}>
            <Text style={styles.audioUrlText}>
              Audio URL Ready: {audioData.audioUrl}
            </Text>
            <Button
              title="Play Audio"
              onPress={() => {
                console.log("Playing:", audioData.audioUrl);
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
