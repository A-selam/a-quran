import { useAction } from "convex/react";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { api } from "../../convex/_generated/api";

import ReciterList from "../components/reciterList";
import SearchBar from "../components/searchBar";
import TopBar from "../components/topBar";

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
    <View>
      <TopBar title="Quran Audio" />
      <SearchBar placeholder="Search reciters..." />
      <ReciterList reciters={reciters} />
    </View>
  );
}
