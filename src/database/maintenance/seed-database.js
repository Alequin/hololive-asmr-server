import { isEmpty } from "lodash";
import { insertVideo } from "../insert-video";
import { selectByVideoId } from "../select-by-video-id";

export const seedDatabase = async () => {
  for (const video of mapDataToColumns(seedVideos)) {
    if (isEmpty(await selectByVideoId(video.videoId))) await insertVideo(video);
  }
};

const mapDataToColumns = (videos) =>
  videos.map((video) => ({
    videoId: video.video_id,
    channelTitle: video.channel_title,
    videoTitle: video.video_title,
    thumbnailUrl: video.thumbnail_url,
    channelId: video.channel_id,
    publishedAt: video.published_at,
  }));

const seedVideos = [
  {
    id: 28,
    video_id: "j6RkC8hlaMk",
    channel_title: "Ceres Fauna Ch. hololive-EN",
    video_title:
      "【Fauna&#39;s ASMR】 Ear Cleaning, Oil Massage, &amp; Comfy ASMR Triggers 🌿 #holoCouncil",
    thumbnail_url: "https://i.ytimg.com/vi/j6RkC8hlaMk/mqdefault.jpg",
    channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
    published_at: "2021-09-18T02:13:22Z",
  },
  {
    id: 29,
    video_id: "2QDRjSb5Ofo",
    channel_title: "Ceres Fauna Ch. hololive-EN",
    video_title:
      "【Fauna&#39;s ASMR】 Healing Headpats &amp; Hair Brushing #holoCouncil",
    thumbnail_url: "https://i.ytimg.com/vi/2QDRjSb5Ofo/mqdefault.jpg",
    channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
    published_at: "2021-09-30T20:23:55Z",
  },
  {
    id: 31,
    video_id: "2hgwPt5kmZc",
    channel_title: "Ceres Fauna Ch. hololive-EN",
    video_title:
      "【Fauna&#39;s ASMR】 Cozy Autumn ASMR 🍂 Crinkley &amp; Comfy #holoCouncil",
    thumbnail_url: "https://i.ytimg.com/vi/2hgwPt5kmZc/mqdefault.jpg",
    channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
    published_at: "2021-09-24T02:23:06Z",
  },
  {
    id: 32,
    video_id: "8-rKCWmlfJw",
    channel_title: "Ceres Fauna Ch. hololive-EN",
    video_title:
      "【Fauna&#39;s ASMR】 Relaxing with Cooling Summertime ASMR 🧊 #holoCouncil",
    thumbnail_url: "https://i.ytimg.com/vi/8-rKCWmlfJw/mqdefault.jpg",
    channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
    published_at: "2021-09-06T23:14:45Z",
  },
  {
    id: 33,
    video_id: "le9AAt8B5Gc",
    channel_title: "Ceres Fauna Ch. hololive-EN",
    video_title:
      "【ASMR】 Fauna&#39;s first ASMR stream! 🌿 comfy whispers and assorted ASMR triggers  #holoCouncil",
    thumbnail_url: "https://i.ytimg.com/vi/le9AAt8B5Gc/mqdefault.jpg",
    channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
    published_at: "2021-08-27T23:23:30Z",
  },
  {
    id: 34,
    video_id: "xd5p2MH1tiQ",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【ASMR】Whispering and Chatting in my Indoor Voice! #hololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/xd5p2MH1tiQ/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-08-09T06:07:37Z",
  },
  {
    id: 35,
    video_id: "Qj5XO2TEa2U",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【ASMR DRAWING】Sketching ASMR on my Matte Tablet! Featuring... Cute Girls! #hololiveEnglish #holoMyth",
    thumbnail_url: "https://i.ytimg.com/vi/Qj5XO2TEa2U/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-05-01T16:01:20Z",
  },
  {
    id: 36,
    video_id: "df3foPky_iE",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【LATE NIGHT雑談】Sleepy Reaper ASMR (?) and Free Talk! #HoloMyth #HololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/df3foPky_iE/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2020-11-16T16:41:54Z",
  },
  {
    id: 37,
    video_id: "xTXgCF-Ezyk",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【ASMR DRAWING】Matte Tablet Sketching and Chatting with my Indoor Voice! 8} #hololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/xTXgCF-Ezyk/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-06-07T07:23:44Z",
  },
  {
    id: 38,
    video_id: "3e49Yh0rgIM",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【SCUFFED ASMR MIC】...Left? Left? Left? ...RIGHT? #HoloMyth #HololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/3e49Yh0rgIM/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-01-05T05:02:58Z",
  },
  {
    id: 39,
    video_id: "cgpZHuOFZ10",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【SLEEPY ASMR(?)雑談】Talking (SOFTLY) With the Dead Beats! #HoloMyth #HololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/cgpZHuOFZ10/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2020-12-10T08:59:00Z",
  },
  {
    id: 40,
    video_id: "bn_DydG7B0k",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【COMFY ASMR】Gentle Chats and Ear Pats! ...Comfy-ness Pending #holoMyth #hololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/bn_DydG7B0k/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-04-09T16:44:47Z",
  },
  {
    id: 41,
    video_id: "ENMA8IybMAI",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【ASMR MIC】It&#39;s Working! Lend Me Your Ears! #HoloMyth #HololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/ENMA8IybMAI/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-01-14T17:22:16Z",
  },
  {
    id: 42,
    video_id: "EgOYVKiWQjc",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【ASMR STORY TIME】Let&#39;s Read Something! #HoloMyth #HololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/EgOYVKiWQjc/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-01-21T14:15:30Z",
  },
  {
    id: 43,
    video_id: "8TwC4ynM4VM",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【SLEEPY ASMR雑談】Cozy Chit-Chat with my Dead Beats... #HoloMyth #HololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/8TwC4ynM4VM/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2020-12-23T15:38:37Z",
  },
  {
    id: 44,
    video_id: "1pkhXQkYXBE",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【ASMR】Summer is Here! Let&#39;s Cool Down and CHAT. #hololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/1pkhXQkYXBE/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-07-08T06:32:46Z",
  },
  {
    id: 45,
    video_id: "8NUiwuHMU1k",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【CURSED ASMR】Do Not Watch This, Ears WILL Bleed. #hololiveEnglish",
    thumbnail_url: "https://i.ytimg.com/vi/8NUiwuHMU1k/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-07-17T14:11:16Z",
  },
  {
    id: 46,
    video_id: "AUOuCbS0_Ww",
    channel_title: "Mori Calliope Ch. hololive-EN",
    video_title:
      "【SUNSET ASMR】Pool-side Chatting with You #HololiveEnglish #holomyth",
    thumbnail_url: "https://i.ytimg.com/vi/AUOuCbS0_Ww/mqdefault.jpg",
    channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
    published_at: "2021-09-09T07:12:15Z",
  },
  {
    id: 48,
    video_id: "4oSpgjVH_kI",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-06-25T16:53:29Z",
  },
  {
    id: 49,
    video_id: "UZWFz9xgx90",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】寝る前に耳かきしよっか🌠/ Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/UZWFz9xgx90/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-03-08T17:01:00Z",
  },
  {
    id: 50,
    video_id: "4UkajKENCqs",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】耳かきするよ！ポリポリ / Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/4UkajKENCqs/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2020-06-09T13:21:28Z",
  },
  {
    id: 51,
    video_id: "oaScgaeWthg",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】雨音と一緒に耳かき☔/Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/oaScgaeWthg/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-02-10T13:39:26Z",
  },
  {
    id: 52,
    video_id: "jOTKDDTGaqI",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【子守唄ASMR】今日は早く寝よう /softly song Japanese【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/jOTKDDTGaqI/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2020-10-13T12:22:53Z",
  },
  {
    id: 53,
    video_id: "w36-lIBtCLg",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】おやすみ前の耳かき / Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/w36-lIBtCLg/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2020-08-09T15:53:15Z",
  },
  {
    id: 54,
    video_id: "nWTgS3JFVkk",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】はじめての梵天耳かき！/Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/nWTgS3JFVkk/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-01-16T14:43:06Z",
  },
  {
    id: 55,
    video_id: "bUg9LzKEknw",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】子守唄配信！ヒソヒソ…/softly song Japanese【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/bUg9LzKEknw/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2020-01-07T18:07:29Z",
  },
  {
    id: 56,
    video_id: "djk0sAsGE7A",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】ほろ酔い耳かきしちゃうよ/Ear Cleaning【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/djk0sAsGE7A/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2020-03-22T15:38:15Z",
  },
  {
    id: 57,
    video_id: "asuKvMLljXg",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】はじめてのASMR / Japanese Trigger Words, Whispering【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/asuKvMLljXg/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2019-07-08T18:01:42Z",
  },
  {
    id: 58,
    video_id: "AjsSR6OL-lU",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】今月も君の耳をチェックします👂/ Ear Cleaning【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/AjsSR6OL-lU/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-04-22T15:42:26Z",
  },
  {
    id: 59,
    video_id: "c0Zo-uZPoUw",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【耳かき/Ear cleaning】お久しぶりのASMR【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/c0Zo-uZPoUw/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2019-12-17T15:43:06Z",
  },
  {
    id: 60,
    video_id: "iwB5g7-hT34",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title: "【ASMR】耳元でおしゃべりする【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/iwB5g7-hT34/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2019-08-20T18:09:06Z",
  },
  {
    id: 61,
    video_id: "K_i9eLrPcso",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】久しぶりに耳かきしよっか💜 / Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/K_i9eLrPcso/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-08-03T15:02:08Z",
  },
  {
    id: 62,
    video_id: "aUVQ48H2-EE",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】梵天のふわふわマッサージだよ✨【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/aUVQ48H2-EE/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-09-14T15:54:59Z",
  },
  {
    id: 63,
    video_id: "IzwtEMd6LF8",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】さあさあ耳を出したまえよ～～👂【猫又おかゆ/ホロライブ】",
    thumbnail_url: "https://i.ytimg.com/vi/IzwtEMd6LF8/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-05-28T15:47:40Z",
  },
  {
    id: 64,
    video_id: "zasog1BzniA",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【子守唄ASMR】眠たい君へ送るよ○ /softly song Japanese【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/zasog1BzniA/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2021-08-30T15:53:40Z",
  },
  {
    id: 65,
    video_id: "Km-xmacm0qc",
    channel_title: "Okayu Ch. 猫又おかゆ",
    video_title:
      "【ASMR】耳かきに初挑戦だよ！/Ear cleaning【ホロライブ/猫又おかゆ】",
    thumbnail_url: "https://i.ytimg.com/vi/Km-xmacm0qc/mqdefault.jpg",
    channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
    published_at: "2019-10-25T17:30:14Z",
  },
];
