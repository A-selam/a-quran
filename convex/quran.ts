import type { ChapterId } from "@quranjs/api";
import { createServerClient } from "@quranjs/api/server";
import { v } from "convex/values";
import { action } from "./_generated/server";

import { chapters } from "./constants";
import type { ChapterReciter } from "./types";

export const getChapters = action({
  args: { reciterId: v.string() },
  handler: async (ctx, args) => {
    const client = createServerClient({
      clientId: process.env.QF_CLIENT_ID!,
      clientSecret: process.env.QF_CLIENT_SECRET!,
      // Add this services block to use pre-live endpoints
      services: {
        gatewayUrl: "https://apis-prelive.quran.foundation",
        oauth2BaseUrl: "https://prelive-oauth2.quran.foundation",
      },
    });

    // const chapters = await client.content.v4.chapters.list();
    // const chapters = await client.content.v4.resources.chapterInfos.list();
    // const chapters = await client.content.v4.audio.recitations.getChapterRecitation(reciterId);

    const rawData = await client.content.v4.audio.chapterRecitation.list(
      args.reciterId,
    );

    const listOfChapters = chapters.filter((chapter) =>
      rawData.some((data) => chapter.id === data.chapterId),
    );

    return listOfChapters;
  },
});

export const getReciters = action({
  args: {},
  handler: async (ctx) => {
    const client = createServerClient({
      clientId: process.env.QF_CLIENT_ID!,
      clientSecret: process.env.QF_CLIENT_SECRET!,
      // Add this services block to use pre-live endpoints
      services: {
        gatewayUrl: "https://apis-prelive.quran.foundation",
        oauth2BaseUrl: "https://prelive-oauth2.quran.foundation",
      },
    });

    const rawData = await client.content.v4.resources.chapterReciters.list();

    const chapterReciter = rawData as unknown as ChapterReciter[];
    const filteredChapterReciter = chapterReciter.filter(
      (reciter) =>
        reciter.translatedName.languageName.toLowerCase() === "arabic",
    );

    return filteredChapterReciter;
  },
});

export const getAudio = action({
  args: { chapterID: v.number(), reciterID: v.string() },
  //   args: { reciterID: v.string() },
  handler: async (ctx, args) => {
    const client = createServerClient({
      clientId: process.env.QF_CLIENT_ID!,
      clientSecret: process.env.QF_CLIENT_SECRET!,
      // Add this services block to use pre-live endpoints
      services: {
        gatewayUrl: "https://apis-prelive.quran.foundation",
        oauth2BaseUrl: "https://prelive-oauth2.quran.foundation",
      },
    });

    const audio = await client.content.v4.audio.chapterRecitation.get(
      args.reciterID,
      args.chapterID as ChapterId,
    );
    // const audio = await client.content.v4.audio.chapterRecitation.list(
    //   args.reciterID,
    // );
    return audio;
  },
});
