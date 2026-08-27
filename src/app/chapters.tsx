import { useAction } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { api } from "../../convex/_generated/api";
import ChapterList from "../components/chapterList";
import SearchBar from "../components/searchBar";
import TopBar from "../components/topBar";
import type { QuranChaptersList } from "../types";

export default function ChapterScreen() {
  const { reciterId } = useLocalSearchParams<{ reciterId: string }>();
  const getChapters = useAction(api.quran.getChapters);
  const [chapters, setChapters] = useState<QuranChaptersList>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!reciterId) return;

    let active = true;
    setLoading(true);
    setError(false);

    void getChapters({ reciterId })
      .then((data) => {
        if (active) setChapters(data as QuranChaptersList);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [getChapters, reciterId]);

  return (
    <View>
      <TopBar title="Chapters" backButton />
      <ScrollView>
        <SearchBar placeholder="Search chapters..." />
        {loading && <ActivityIndicator />}
        {error && <Text>Failed to load chapters.</Text>}
        {!loading && !error && (
          <ChapterList chapters={chapters} reciterId={reciterId} />
        )}
      </ScrollView>
    </View>
  );
}
