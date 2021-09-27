import { insertVideo } from "./insert-video";

export const seedDatabase = async () => {
  for (const video of seedVideos) {
    await insertVideo(video);
  }
};

const seedVideos = [
  {
    videoId: "4oSpgjVH_kI",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】深夜のバイノーラルマイク雑談� / Healing whispering【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
  },
  {
    videoId: "oaScgaeWthg",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】雨音と一緒に耳かき☔/Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/oaScgaeWthg/mqdefault.jpg",
  },
  {
    videoId: "4UkajKENCqs",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】耳かきするよ！ポリポリ / Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/4UkajKENCqs/mqdefault.jpg",
  },
  {
    videoId: "UZWFz9xgx90",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】寝る前に耳かきしよっか�/ Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/UZWFz9xgx90/mqdefault.jpg",
  },
  {
    videoId: "jOTKDDTGaqI",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【子守唄ASMR】今日は早く寝よう /softly song Japanese【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/jOTKDDTGaqI/mqdefault.jpg",
  },
  {
    videoId: "w36-lIBtCLg",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】おやすみ前の耳かき / Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/w36-lIBtCLg/mqdefault.jpg",
  },
  {
    videoId: "nWTgS3JFVkk",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】はじめての梵天耳かき！/Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/nWTgS3JFVkk/mqdefault.jpg",
  },
  {
    videoId: "bUg9LzKEknw",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】子守唄配信！ヒソヒソ…/softly song Japanese【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/bUg9LzKEknw/mqdefault.jpg",
  },
  {
    videoId: "IzwtEMd6LF8",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】さあさあ耳を出したまえよ～～�【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/IzwtEMd6LF8/mqdefault.jpg",
  },
  {
    videoId: "AjsSR6OL-lU",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】今月も君の耳をチェックします�/ Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/AjsSR6OL-lU/mqdefault.jpg",
  },
  {
    videoId: "asuKvMLljXg",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】はじめてのASMR / Japanese Trigger Words, Whispering【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/asuKvMLljXg/mqdefault.jpg",
  },
  {
    videoId: "djk0sAsGE7A",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】ほろ酔い耳かきしちゃうよ/Ear Cleaning【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/djk0sAsGE7A/mqdefault.jpg",
  },
  {
    videoId: "iwB5g7-hT34",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle: "【ASMR】耳元でおしゃべりする【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/iwB5g7-hT34/mqdefault.jpg",
  },
  {
    videoId: "c0Zo-uZPoUw",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【耳かき/Ear cleaning】お久しぶりのASMR【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/c0Zo-uZPoUw/mqdefault.jpg",
  },
  {
    videoId: "aUVQ48H2-EE",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】梵天のふわふわマッサージだよ✨【猫又おかゆ/ホロライブ】",
    thumbnailUrl: "https://i.ytimg.com/vi/aUVQ48H2-EE/mqdefault.jpg",
  },
  {
    videoId: "K_i9eLrPcso",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】久しぶりに耳かきしよっか� / Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/K_i9eLrPcso/mqdefault.jpg",
  },
  {
    videoId: "Km-xmacm0qc",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【ASMR】耳かきに初挑戦だよ！/Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/Km-xmacm0qc/mqdefault.jpg",
  },
  {
    videoId: "zasog1BzniA",
    channelTitle: "Okayu Ch. 猫又おかゆ",
    videoTitle:
      "【子守唄ASMR】眠たい君へ送るよ○ /softly song Japanese【ホロライブ/猫又おかゆ】",
    thumbnailUrl: "https://i.ytimg.com/vi/zasog1BzniA/mqdefault.jpg",
  },
  {
    videoId: "AUOuCbS0_Ww",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【SUNSET ASMR】Pool-side Chatting with You #HololiveEnglish #holomyth",
    thumbnailUrl: "https://i.ytimg.com/vi/AUOuCbS0_Ww/mqdefault.jpg",
  },
  {
    videoId: "xd5p2MH1tiQ",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【ASMR】Whispering and Chatting in my Indoor Voice! #hololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/xd5p2MH1tiQ/mqdefault.jpg",
  },
  {
    videoId: "8NUiwuHMU1k",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【CURSED ASMR】Do Not Watch This, Ears WILL Bleed. #hololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/8NUiwuHMU1k/mqdefault.jpg",
  },
  {
    videoId: "1pkhXQkYXBE",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【ASMR】Summer is Here! Let&#39;s Cool Down and CHAT. #hololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/1pkhXQkYXBE/mqdefault.jpg",
  },
  {
    videoId: "xTXgCF-Ezyk",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【ASMR DRAWING】Matte Tablet Sketching and Chatting with my Indoor Voice! 8} #hololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/xTXgCF-Ezyk/mqdefault.jpg",
  },
  {
    videoId: "Qj5XO2TEa2U",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【ASMR DRAWING】Sketching ASMR on my Matte Tablet! Featuring... Cute Girls! #hololiveEnglish #holoMyth",
    thumbnailUrl: "https://i.ytimg.com/vi/Qj5XO2TEa2U/mqdefault.jpg",
  },
  {
    videoId: "bn_DydG7B0k",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【COMFY ASMR】Gentle Chats and Ear Pats! ...Comfy-ness Pending #holoMyth #hololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/bn_DydG7B0k/mqdefault.jpg",
  },
  {
    videoId: "EgOYVKiWQjc",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【ASMR STORY TIME】Let&#39;s Read Something! #HoloMyth #HololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/EgOYVKiWQjc/mqdefault.jpg",
  },
  {
    videoId: "ENMA8IybMAI",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【ASMR MIC】It&#39;s Working! Lend Me Your Ears! #HoloMyth #HololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/ENMA8IybMAI/mqdefault.jpg",
  },
  {
    videoId: "3e49Yh0rgIM",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【SCUFFED ASMR MIC】...Left? Left? Left? ...RIGHT? #HoloMyth #HololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/3e49Yh0rgIM/mqdefault.jpg",
  },
  {
    videoId: "8TwC4ynM4VM",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【SLEEPY ASMR雑談】Cozy Chit-Chat with my Dead Beats... #HoloMyth #HololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/8TwC4ynM4VM/mqdefault.jpg",
  },
  {
    videoId: "cgpZHuOFZ10",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【SLEEPY ASMR(?)雑談】Talking (SOFTLY) With the Dead Beats! #HoloMyth #HololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/cgpZHuOFZ10/mqdefault.jpg",
  },
  {
    videoId: "df3foPky_iE",
    channelTitle: "Mori Calliope Ch. hololive-EN",
    videoTitle:
      "【LATE NIGHT雑談】Sleepy Reaper ASMR (?) and Free Talk! #HoloMyth #HololiveEnglish",
    thumbnailUrl: "https://i.ytimg.com/vi/df3foPky_iE/mqdefault.jpg",
  },
];
