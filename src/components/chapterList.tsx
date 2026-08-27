import { router } from "expo-router";
import { ScrollView } from "react-native";

import type { QuranChaptersList } from "../types";
import ChapterCardComponent from "./ui/chapterCard";

interface ChapterListProps {
  chapters: QuranChaptersList;
  reciterId: string;
}

export default function ChapterList({ chapters, reciterId }: ChapterListProps) {
  function handleChapterPress(chapterId: string) {
    router.push({
      pathname: "/player",
      params: { reciterId, chapterId },
    });
  }

  return (
    <ScrollView>
      {chapters.map((chapter) => (
        <ChapterCardComponent
          key={chapter.id}
          id={chapter.id.toString()}
          title={chapter.transliteration}
          translation={chapter.translation}
          totalVerses={chapter.total_verses}
          type={chapter.type}
          onPressHandler={handleChapterPress}
        />
      ))}
    </ScrollView>
  );
}
