import { router } from "expo-router";
import { ScrollView } from "react-native";

import type { ChapterRecitersList } from "../types";
import ReciterCardComponent from "./ui/reciterCard";

interface ReciterListProps {
  reciters: ChapterRecitersList;
}

export default function ReciterList({ reciters }: ReciterListProps) {
  function handleReciterPress(reciterId: string) {
    router.push({
      pathname: "/chapters",
      params: {
        reciterId: reciterId,
      },
    });
  }

  return (
    <ScrollView>
      {reciters.map((reciter) => (
        <ReciterCardComponent
          key={reciter.id}
          id={reciter.id.toString()}
          title={reciter.name}
          recitationStyle={reciter.style.name}
          translation={reciter.translatedName.name}
          onPressHandler={handleReciterPress}
        />
      ))}
    </ScrollView>
  );
}
