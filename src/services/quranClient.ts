// import { createPublicClient } from "@quranjs/api/public";

// export const quranClient = createPublicClient({
//   clientId: "7d8537b2-92e0-4c75-b48b-d6c7277995e7",
//   clientType: "public",
// });

import { createServerClient } from "@quranjs/api/server";

export const quranClient = createServerClient({
  clientId: process.env.QF_CLIENT_ID!,
  clientSecret: process.env.QF_CLIENT_SECRET!,
  services: {
    gatewayUrl: "https://apis-prelive.quran.foundation",
    oauth2BaseUrl: "https://prelive-oauth2.quran.foundation",
  },
});

// const chapters = await client.content.v4.chapters.list();
