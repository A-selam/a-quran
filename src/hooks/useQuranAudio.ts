import { useQuery } from "@tanstack/react-query";
import { quranClient } from "../services/quranClient";

// 1. Fetch List of Reciters
export function useReciters(language = "en") {
  return useQuery({
    queryKey: ["reciters", language],
    queryFn: async () => {
      // Calls /resources/chapter_reciters
      //   const data = await quranClient.content.v4.reciters.list({ language });
      const data = await quranClient.resources.findAllRecitations;
      console.log("data ", data);
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache reciter list for 24 hours
  });
}

// 2. Fetch List of Chapters (Surahs 1 to 114)
export function useChapters(language = "en") {
  return useQuery({
    queryKey: ["chapters", language],
    queryFn: async () => {
      // Calls /chapters
      return await quranClient.content.v4.chapters.list({ language });
    },
    staleTime: 1000 * 60 * 60 * 24, // Cache chapters list for 24 hours
  });
}

// 3. Fetch Chapter Audio File for a Selected Reciter
export function useChapterAudio(
  reciterId: number | null,
  chapterNumber: number | null,
) {
  return useQuery({
    queryKey: ["chapterAudio", reciterId, chapterNumber],
    queryFn: async () => {
      if (!reciterId || !chapterNumber) return null;
      // Calls /chapter_recitations/:reciter_id/:chapter_number
      //   const data = await quranClient.content.v4.chapterRecitations.get({reciterId,
      //     chapterNumber,
      //   });
      const data = await quranClient.audio.findChapterRecitationById(
        String(reciterId),
        "2",
      );
      return data;
    },
    // Query will only run once both reciterId and chapterNumber are selected
    enabled: !!reciterId && !!chapterNumber,
    staleTime: 1000 * 60 * 60 * 12, // Cache audio links for 12 hours
  });
}
