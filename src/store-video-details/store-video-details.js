import { isEmpty, maxBy } from "lodash";
import { insertVideo } from "../database/insert-video.js";
import { selectVideosByChannelId } from "../database/select-by-video-channel-id.js";
import { selectByVideoId } from "../database/select-by-video-id.js";
import { logger } from "../logger.js";
import { readJsonFile } from "../read-json-file.js";
import { searchVideos } from "./search-videos.js";

const EARLIEST_PUBLISH_DATE = new Date(0).toISOString();

export const storeVideoDetails = async () => {
  const channels = readJsonFile("./src/store-video-details/channel-ids.json");

  for (const channel of channels) {
    const videosForCurrentChannel = await selectVideosByChannelId(
      channel.channelId
    );

    const mostRecentPublishDate = maxBy(
      videosForCurrentChannel,
      ({ published_at }) => published_at
    )?.published_at;

    const allVideos = await searchVideosRecursively({
      channelId: channel.channelId,
      queryTerms: ["asmr"],
      publishedAfter: mostRecentPublishDate || EARLIEST_PUBLISH_DATE,
    });

    const asmrVideos = allVideos.filter((video) =>
      /asmr/i.test(video.snippet.title)
    );

    const formattedVideos = asmrVideos.map((video) => ({
      videoId: video.id.videoId,
      channelTitle: video.snippet.channelTitle,
      videoTitle: video.snippet.title,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
    }));

    for (const video of formattedVideos) {
      const isNewVideo = isEmpty(await selectByVideoId(video.videoId));
      if (isNewVideo) await insertVideo(video);
      if (!isNewVideo)
        logger.info(
          `Skipping video as its id already exists / ${JSON.stringify(video)}`
        );
    }
  }
};

const searchVideosRecursively = async (searchArgs, previousVideos = []) => {
  const response = await searchVideos(searchArgs);

  const allVideos = [...previousVideos, ...response.items];
  if (!response.nextPageToken) return allVideos;

  // Search again with next page token if one is available
  return searchVideosRecursively(
    { ...searchArgs, pageToken: response.nextPageToken },
    allVideos
  );
};

const mockData = [
  {
    kind: "youtube#searchResult",
    etag: "eGtMOP_SrJj__obuZcBkJVU6zzs",
    id: {
      kind: "youtube#video",
      videoId: "4oSpgjVH_kI",
    },
    snippet: {
      publishedAt: "2021-06-25T16:53:29Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
      description:
        "＿ 新しく届いたマイクを使用して耳かきをすると なにやらノイズキャンセルが入ってしまう(?) みたいなので今日はバイノーラルマイクで静かに お話をしようと思います！",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/4oSpgjVH_kI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/4oSpgjVH_kI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-06-25T16:53:29Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "eYYopdKHcx2P1AS8rGAHKyXEXpw",
    id: {
      kind: "youtube#video",
      videoId: "oaScgaeWthg",
    },
    snippet: {
      publishedAt: "2021-02-10T13:39:26Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】雨音と一緒に耳かき☔/Ear Cleaning【猫又おかゆ/ホロライブ】",
      description:
        "＿ これがほんとの“寝耳に水” ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 猫又おかゆ 60万人記念ボイス販売中   ‣販売 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/oaScgaeWthg/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/oaScgaeWthg/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/oaScgaeWthg/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-02-10T13:39:26Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "DsuJinpZ5S5BHYQURGSoxq-npwc",
    id: {
      kind: "youtube#video",
      videoId: "4UkajKENCqs",
    },
    snippet: {
      publishedAt: "2020-06-09T13:21:28Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】耳かきするよ！ポリポリ / Ear cleaning【ホロライブ/猫又おかゆ】",
      description:
        "※僕とみんなのお約束※ ・コメントの感じ方は人それぞれです。 自分が不快に思ったら静かにブロックしましょう ・他の人の配信で伝書鳩しないこと。 (おかゆんが○○って ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/4UkajKENCqs/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/4UkajKENCqs/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/4UkajKENCqs/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-06-09T13:21:28Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "5rjsS9ie1zSH4b-WBCk2AwvgN8M",
    id: {
      kind: "youtube#video",
      videoId: "UZWFz9xgx90",
    },
    snippet: {
      publishedAt: "2021-03-08T17:01:00Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】寝る前に耳かきしよっか🌠/ Ear Cleaning【猫又おかゆ/ホロライブ】",
      description:
        "＿ お誕生日プレゼントでたくさん耳かきグッズ 頂いたので今日は使っていくよ～～！！！！！ 猫又おかゆ 誕生日記念2021グッズ販売中   ▸販売ページはこちらから ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/UZWFz9xgx90/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/UZWFz9xgx90/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/UZWFz9xgx90/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-03-08T17:01:00Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "0ZhIuWiobZEyj1ZHP1fHGEOSk6U",
    id: {
      kind: "youtube#video",
      videoId: "jOTKDDTGaqI",
    },
    snippet: {
      publishedAt: "2020-10-13T12:22:53Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【子守唄ASMR】今日は早く寝よう /softly song Japanese【ホロライブ/猫又おかゆ】",
      description:
        "ASMR用のマイクで静かに歌います。   早く寝る人も寝ない人もまったりしていってね～～。 ※僕とみんなのお約束※ ・コメントの感じ方は人それぞれです。 自分が不快に ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/jOTKDDTGaqI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/jOTKDDTGaqI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/jOTKDDTGaqI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-10-13T12:22:53Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "voQB_nqASB7TC6BCP-IyeTfaGmY",
    id: {
      kind: "youtube#video",
      videoId: "w36-lIBtCLg",
    },
    snippet: {
      publishedAt: "2020-08-09T15:53:15Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】おやすみ前の耳かき / Ear cleaning【ホロライブ/猫又おかゆ】",
      description:
        "回線不安定になってバタバタしたので枠取り直しました；； 配信は0:30までやるよ！ ※僕とみんなのお約束※ ・コメントの感じ方は人それぞれです。 自分が不快に思ったら ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/w36-lIBtCLg/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/w36-lIBtCLg/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/w36-lIBtCLg/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-08-09T15:53:15Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "bGjqokxlG5asxU768ARYFJ8PLRg",
    id: {
      kind: "youtube#video",
      videoId: "nWTgS3JFVkk",
    },
    snippet: {
      publishedAt: "2021-01-16T14:43:06Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】はじめての梵天耳かき！/Ear Cleaning【猫又おかゆ/ホロライブ】",
      description:
        "＿ 耳かきしてると僕も眠くなっちゃうんだよね～～   ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 猫又おかゆ 60万人記念 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/nWTgS3JFVkk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/nWTgS3JFVkk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/nWTgS3JFVkk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-01-16T14:43:06Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "hbiSvJqSWlCF-37FhtP9f4S5H2o",
    id: {
      kind: "youtube#video",
      videoId: "bUg9LzKEknw",
    },
    snippet: {
      publishedAt: "2020-01-07T18:07:29Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】子守唄配信！ヒソヒソ…/softly song Japanese【ホロライブ/猫又おかゆ】",
      description:
        "米津玄師さんや椎名林檎さんの歌をアカペラで 子守唄風に歌います   僕とみんなのお約束 ・コメント欄で不快なコメントは触れずにブロック ・迷惑になるので伝書鳩 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/bUg9LzKEknw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/bUg9LzKEknw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/bUg9LzKEknw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-01-07T18:07:29Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Zw_1l8cWrc8-ldaCMHF_yar2Zxg",
    id: {
      kind: "youtube#video",
      videoId: "6hbzcLbbfSk",
    },
    snippet: {
      publishedAt: "2021-09-26T16:38:21Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【聖剣伝説3 トライアルズ オブ マナ】最終回だあああああ😽✨＃7【ホロライブ/猫又おかゆ】",
      description:
        '＿ "本動画は株式会社スクウェア・エニックスの許諾を受けて配信しています。 このコンテンツは株式会社スクウェア・エニックスが権利を有する著作物を利用しています。',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/6hbzcLbbfSk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/6hbzcLbbfSk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/6hbzcLbbfSk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-09-26T16:38:21Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "wcebF_GpTuCVUVaaO49Xf4t79z8",
    id: {
      kind: "youtube#video",
      videoId: "IzwtEMd6LF8",
    },
    snippet: {
      publishedAt: "2021-05-28T15:47:40Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【ASMR】さあさあ耳を出したまえよ～～👂【猫又おかゆ/ホロライブ】",
      description:
        "＿ 余談 ホロライブに入ってから生まれて初めて購入した この相棒とも言えるバイノーラルマイク、 使用するのは今日で最後となります！ 耳の穴のクッションの役割をし ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/IzwtEMd6LF8/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/IzwtEMd6LF8/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/IzwtEMd6LF8/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-28T15:47:40Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "t7BBVvhc8KdF_zN8M-NN1dxLRv0",
    id: {
      kind: "youtube#video",
      videoId: "AjsSR6OL-lU",
    },
    snippet: {
      publishedAt: "2021-04-22T15:42:26Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】今月も君の耳をチェックします👂/ Ear Cleaning【猫又おかゆ/ホロライブ】",
      description:
        "＿ かきかきしちゃう！ ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 活動二周年記念グッズ販売中   可愛いアクスタや ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/AjsSR6OL-lU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/AjsSR6OL-lU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/AjsSR6OL-lU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-04-22T15:42:26Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "wSl74bkFiQjQZ7cIJnFI8nc12qA",
    id: {
      kind: "youtube#video",
      videoId: "asuKvMLljXg",
    },
    snippet: {
      publishedAt: "2019-07-08T18:01:42Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】はじめてのASMR / Japanese Trigger Words, Whispering【ホロライブ/猫又おかゆ】",
      description:
        "ホロライブゲーマーズ所属、猫又おかゆです  (okayu nekomata) おにぎり屋さんを経営してるばあちゃんの一人娘(猫)！ ゲームの配信が主な活動ですが,雑談やお歌の配信 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/asuKvMLljXg/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/asuKvMLljXg/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/asuKvMLljXg/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2019-07-08T18:01:42Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "46wnmx0aaSfzyLH9ASjF6AYBxd0",
    id: {
      kind: "youtube#video",
      videoId: "djk0sAsGE7A",
    },
    snippet: {
      publishedAt: "2020-03-22T15:38:15Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】ほろ酔い耳かきしちゃうよ/Ear Cleaning【ホロライブ/猫又おかゆ】",
      description:
        "もしかしたら手毬ASMRになっちゃうかも。；； 僕とみんなのお約束 ・コメント欄で不快なコメントは触れずにブロック ・迷惑になるので伝書鳩しない (他のライバーが僕の ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/djk0sAsGE7A/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/djk0sAsGE7A/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/djk0sAsGE7A/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-03-22T15:38:15Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Vm3t1mKOEHUuPgnzu-_SInzfVKk",
    id: {
      kind: "youtube#video",
      videoId: "iwB5g7-hT34",
    },
    snippet: {
      publishedAt: "2019-08-20T18:09:06Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【ASMR】耳元でおしゃべりする【ホロライブ/猫又おかゆ】",
      description:
        "ホロライブゲーマーズ所属、猫又おかゆです  (okayu nekomata) おにぎり屋さんを経営してるばあちゃんの一人娘(猫)！ ゲームの配信が主な活動ですが,雑談やお歌の配信 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/iwB5g7-hT34/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/iwB5g7-hT34/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/iwB5g7-hT34/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2019-08-20T18:09:06Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "wPKrlVdgAqymIzHCCnE4URl191A",
    id: {
      kind: "youtube#video",
      videoId: "c0Zo-uZPoUw",
    },
    snippet: {
      publishedAt: "2019-12-17T15:43:06Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【耳かき/Ear cleaning】お久しぶりのASMR【ホロライブ/猫又おかゆ】",
      description:
        "ホロライブゲーマーズ所属！猫又おかゆです  ✨ Twitter▷https://twitter.com/nekomataokayu 【放送･関連ツイート】#生おかゆ 【絵文字】   【ファンアート】#絵かゆ 【ファン ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/c0Zo-uZPoUw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/c0Zo-uZPoUw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/c0Zo-uZPoUw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2019-12-17T15:43:06Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "5vMN_I694LgpNdq4JYqmZTcLTGg",
    id: {
      kind: "youtube#video",
      videoId: "aUVQ48H2-EE",
    },
    snippet: {
      publishedAt: "2021-09-14T15:54:59Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【ASMR】梵天のふわふわマッサージだよ✨【猫又おかゆ/ホロライブ】",
      description:
        "＿ ふわふわ～～～～～～！ ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！“もぐもぐYUMMY”は ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/aUVQ48H2-EE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/aUVQ48H2-EE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/aUVQ48H2-EE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-09-14T15:54:59Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "bPtsbSEfgWcgyYISpxXdpwzzDRU",
    id: {
      kind: "youtube#video",
      videoId: "K_i9eLrPcso",
    },
    snippet: {
      publishedAt: "2021-08-03T15:02:08Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】久しぶりに耳かきしよっか💜 / Ear cleaning【ホロライブ/猫又おかゆ】",
      description:
        "＿ 僕もついに防音室を入れたので、ファンの音が 全然聞こえなくなったよ！わ～～～い！",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/K_i9eLrPcso/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/K_i9eLrPcso/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/K_i9eLrPcso/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-03T15:02:08Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "AogmZfOacvvTeAhXcj34025CwIo",
    id: {
      kind: "youtube#video",
      videoId: "Km-xmacm0qc",
    },
    snippet: {
      publishedAt: "2019-10-25T17:30:14Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【ASMR】耳かきに初挑戦だよ！/Ear cleaning【ホロライブ/猫又おかゆ】",
      description:
        "ホロライブゲーマーズ所属！猫又おかゆです  ✨ Twitter▷https://twitter.com/nekomataokayu 【放送･関連ツイート】#生おかゆ 【絵文字】   【ファンアート】#絵かゆ 【ファン ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/Km-xmacm0qc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/Km-xmacm0qc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/Km-xmacm0qc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2019-10-25T17:30:14Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "8WmIAcMf9Fw8SrTtHqZonSLajeU",
    id: {
      kind: "youtube#video",
      videoId: "zasog1BzniA",
    },
    snippet: {
      publishedAt: "2021-08-30T15:53:40Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【子守唄ASMR】眠たい君へ送るよ○ /softly song Japanese【ホロライブ/猫又おかゆ】",
      description:
        "＿ 静かに歌うよ…   ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！“もぐもぐYUMMY”は こちらでも ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/zasog1BzniA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/zasog1BzniA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/zasog1BzniA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-30T15:53:40Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "-ti2hUR0c0HTKoLFgyVHfSXkj_0",
    id: {
      kind: "youtube#video",
      videoId: "8tW5xS16vyQ",
    },
    snippet: {
      publishedAt: "2021-08-09T09:52:53Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【雑談】喋りたいこといっぱ～～い！🌞【猫又おかゆ/ホロライブ】",
      description:
        "＿ るんるんるん ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！“もぐもぐYUMMY”は こちらでも販売し ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/8tW5xS16vyQ/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/8tW5xS16vyQ/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/8tW5xS16vyQ/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-09T09:52:53Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "FT7wgL17FF_5nond4cRoUbXrMIQ",
    id: {
      kind: "youtube#video",
      videoId: "_hIwZ4-a2mE",
    },
    snippet: {
      publishedAt: "2021-08-07T11:08:15Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】ちょっと久しぶりかも！歌う～～【猫又おかゆ/ホロライブ】",
      description:
        "＿ ※本日の歌枠は使用させて頂く一部の音源の関係でスーパーチャットを OFFにして配信してます！ 歌っちゃ ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/_hIwZ4-a2mE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/_hIwZ4-a2mE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/_hIwZ4-a2mE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-07T11:08:15Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "xMx1CfsgOXYcIBUT4xE1cPTMGLE",
    id: {
      kind: "youtube#video",
      videoId: "SZZrheGDS7Q",
    },
    snippet: {
      publishedAt: "2021-05-21T14:16:29Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【雑談】コーヒーが最近飲めるようになった☕【猫又おかゆ/ホロライブ】",
      description:
        "＿ まったりお話しじゃ～～～！！ ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 活動二周年記念グッズ販売中   可愛い ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/SZZrheGDS7Q/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/SZZrheGDS7Q/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/SZZrheGDS7Q/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-21T14:16:29Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "-FYWNtcugH-IrLF1iUTdl5RiPZ0",
    id: {
      kind: "youtube#video",
      videoId: "mBkXOzFU_m0",
    },
    snippet: {
      publishedAt: "2021-05-31T16:24:46Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【雑談】もう6月になるらしい。☔【猫又おかゆ/ホロライブ】",
      description:
        "＿ おはなし！おはなし！ ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 活動二周年記念グッズ販売中   可愛いアクスタや ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/mBkXOzFU_m0/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/mBkXOzFU_m0/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/mBkXOzFU_m0/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-31T16:24:46Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "mXQYw2b-MDkWI6_5eZHeIAiFLic",
    id: {
      kind: "youtube#video",
      videoId: "6EMw6VoP7HU",
    },
    snippet: {
      publishedAt: "2021-08-15T16:41:47Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【雑談】ゲリラの深夜雑談だよ～～ん【猫又おかゆ/ホロライブ】",
      description:
        "＿ よるのていおう ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！“もぐもぐYUMMY”は こちらでも販売 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/6EMw6VoP7HU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/6EMw6VoP7HU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/6EMw6VoP7HU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-15T16:41:47Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "HWDUPqWB2eE5qs_ia9DvvjFl3vc",
    id: {
      kind: "youtube#video",
      videoId: "jrKG9OhyRrE",
    },
    snippet: {
      publishedAt: "2021-03-19T12:39:34Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【空気読み3】空気を読みます。すーはー【猫又おかゆ/ホロライブ】",
      description:
        '＿ "本ゲームは © G-MODE Corporation の確認を得た上で配信・収益化を行なっております みんなで空気読み。3 ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/jrKG9OhyRrE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/jrKG9OhyRrE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/jrKG9OhyRrE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-03-19T12:39:34Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "TzFKqW8_ijCStZjyckbzO-70zt8",
    id: {
      kind: "youtube#video",
      videoId: "IFQuXyRxyV8",
    },
    snippet: {
      publishedAt: "2021-09-23T13:47:42Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【たまご守る】egg is broken. heart is too. やる！！【猫又おかゆ/ホロライブ】",
      description:
        "＿ 本ゲームは Curious Visions の確認を得た上で配信・収益化を行なっております ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/IFQuXyRxyV8/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/IFQuXyRxyV8/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/IFQuXyRxyV8/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-09-23T13:47:42Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "IAJQ30N6W3gip6ro-ZYn5PUdaM0",
    id: {
      kind: "youtube#video",
      videoId: "wBgIDAbafyw",
    },
    snippet: {
      publishedAt: "2021-02-06T13:42:47Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】おうたのじかんです【猫又おかゆ/ホロライブ】",
      description:
        "＿ にゃははの歌～～ お借りした音源 生音風カラオケ屋様：https://www.youtube.com/channel/UCZ3ryrdsdqezi2q-AfRw6Rw カラオケ歌っちゃ ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/wBgIDAbafyw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/wBgIDAbafyw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/wBgIDAbafyw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-02-06T13:42:47Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "An1KqCWEjq46s4gk8kIYbNnEo_4",
    id: {
      kind: "youtube#video",
      videoId: "4dlsbJiEa-U",
    },
    snippet: {
      publishedAt: "2020-11-09T16:44:25Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【Minecraft】今夜は温かい海を見つけたいね🌊【ホロライブ/猫又おかゆ】",
      description:
        "海は広いな大きいな迷うな～～ 本ゲームは Mojang に確認を得た上、Terms and Conditions (https://account.mojang.com/terms) に基づいて配信・収益化を行なっており ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/4dlsbJiEa-U/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/4dlsbJiEa-U/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/4dlsbJiEa-U/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-11-09T16:44:25Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "V6zgDwSQ3wW1SU3UugjMSLGRMlc",
    id: {
      kind: "youtube#video",
      videoId: "EsRa5GPiVYA",
    },
    snippet: {
      publishedAt: "2021-08-10T12:25:42Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【Gartic Phone】リスナー参加型！一緒に伝言ゲームだ🐈【猫又おかゆ/ホロライブ】",
      description:
        "＿ ※ゲームへの参加はメンバーシップ限定で募集させて 頂くよ！配信はじまったらコミュニティからチェックしてね！ 本ゲームはOnrizon Social Gamesに確認の上配信・ ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/EsRa5GPiVYA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/EsRa5GPiVYA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/EsRa5GPiVYA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-10T12:25:42Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "2gZkOywOrKDFI-KFU-KVPXEMZes",
    id: {
      kind: "youtube#video",
      videoId: "fXHkhl_jjJc",
    },
    snippet: {
      publishedAt: "2020-06-26T16:20:47Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【APEX】ささ APEXのお時間ですよっと【ホロライブ/猫又おかゆ】",
      description:
        "ゴールドⅡをめざせ～～～！！！！！！ 本ゲームは © 2020 Electronic Arts Inc. の承諾を得た上で配信・収益化を行なっております. ※僕とみんなのお約束※ ・コメントの ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/fXHkhl_jjJc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/fXHkhl_jjJc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/fXHkhl_jjJc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-06-26T16:20:47Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "3nant_6olTagWxknP-F2ar6p5EI",
    id: {
      kind: "youtube#video",
      videoId: "D3zOwdsaQ5M",
    },
    snippet: {
      publishedAt: "2021-04-29T15:36:28Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【 #神岡家 】神岡家の気まぐれにゃじお 第16回【椎名唯華と猫又おかゆ】",
      description:
        "＿ 今月もありました神岡家ラジオ     今回もおたよりを募集してます！ https://forms.gle/YFD1LNKL9Y17pyyz6 椎名さん(姉) ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/D3zOwdsaQ5M/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/D3zOwdsaQ5M/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/D3zOwdsaQ5M/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-04-29T15:36:28Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "u_l2VlLl46IJ8X4JapoelFKgYNw",
    id: {
      kind: "youtube#video",
      videoId: "eXtit_NCDok",
    },
    snippet: {
      publishedAt: "2021-04-25T13:10:20Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【企画】おにぎりゃーを調査してみた！🍙【猫又おかゆ/ホロライブ】",
      description:
        "＿ おにぎりゃーを調査！！！！！ メンバーシップの方限定でアンケートへの記入を募集 しています！コミュニテイから飛べるので是非回答してね！ ※配信自体はメンバー ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/eXtit_NCDok/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/eXtit_NCDok/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/eXtit_NCDok/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-04-25T13:10:20Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "-Z8NleXq6P1dXKYAA2eJlkiIiac",
    id: {
      kind: "youtube#video",
      videoId: "xr0tl3_FBbM",
    },
    snippet: {
      publishedAt: "2021-05-09T12:04:40Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【企画】お悩み相談！みんなのお話しを聞かせて～！🍙【猫又おかゆ/ホロライブ】",
      description:
        "＿ のんびりみんなのお悩みを聞いていきたいと思います！ コチラからお悩みの内容を投稿してね！✨ https://forms.gle/TnXFW4eQkLALNCN59 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/xr0tl3_FBbM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/xr0tl3_FBbM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/xr0tl3_FBbM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-09T12:04:40Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "We78eL3U7QUC5Kb2ixLnrmG-fgI",
    id: {
      kind: "youtube#video",
      videoId: "oXtUXnwwLwk",
    },
    snippet: {
      publishedAt: "2021-05-02T16:18:11Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【晩酌】お酒を呑んで語ろう～～！🥃【猫又おかゆ/ホロライブ】",
      description:
        "＿ うへへ～～～い。 ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 活動二周年記念グッズ販売中   可愛いアクスタや ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/oXtUXnwwLwk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/oXtUXnwwLwk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/oXtUXnwwLwk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-02T16:18:11Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "PPHkfyB1uh8hSwH5uQjdmQS-TFk",
    id: {
      kind: "youtube#video",
      videoId: "4muYzftomAE",
    },
    snippet: {
      publishedAt: "2020-08-28T11:00:12Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "flos / 猫又おかゆ (Cover)",
      description:
        "誓った筈も無かった事にした ” 『flos』 本家様▷https://youtu.be/bUbOc97FpUA illustrator：お鮨（@sui5o ）様 Mix：ごず（@_gozu777）様 Movie：近所のにー ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/4muYzftomAE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/4muYzftomAE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/4muYzftomAE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-08-28T11:00:12Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "L7quGVF0lRhMsFRyZ8aVg2FZJ-Q",
    id: {
      kind: "youtube#video",
      videoId: "aLVEKmbV4Ao",
    },
    snippet: {
      publishedAt: "2021-05-24T14:48:59Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】ボカロとアニソン中心かもかも【猫又おかゆ/ホロライブ】",
      description:
        "＿ 初めて歌う曲何個か練習する！ お借りした音源 生音風カラオケ屋様：https://www.youtube.com/channel/UCZ3ryrdsdqezi2q-AfRw6Rw カラオケ歌っちゃ ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/aLVEKmbV4Ao/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/aLVEKmbV4Ao/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/aLVEKmbV4Ao/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-24T14:48:59Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "1Gc1t-J_iNsL1SjYE661xg5LXX8",
    id: {
      kind: "youtube#video",
      videoId: "LLcmdS6ol1k",
    },
    snippet: {
      publishedAt: "2021-05-14T15:30:30Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】リベンジのお歌！！！！！！【猫又おかゆ/ホロライブ】",
      description:
        "＿ 前回へろへろ猫だったので！今回は！負けない！ お借りした音源 カラオケ歌っちゃ王様：https://www.youtube.com/channel/UC1tk9F5-MGXEq4LWnjmrtpA ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/LLcmdS6ol1k/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/LLcmdS6ol1k/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/LLcmdS6ol1k/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-14T15:30:30Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "V9l7TKdA19WskSqZsJvaBWC4iM4",
    id: {
      kind: "youtube#video",
      videoId: "HvHtWAEyXyA",
    },
    snippet: {
      publishedAt: "2021-05-04T13:13:32Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】今夜は歌うんだぜベイべ～～～🎤【猫又おかゆ/ホロライブ】",
      description:
        "＿ お借りした音源 生音風カラオケ屋様：https://www.youtube.com/channel/UCZ3ryrdsdqezi2q-AfRw6Rw/featured カラオケ歌っちゃ王 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/HvHtWAEyXyA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/HvHtWAEyXyA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/HvHtWAEyXyA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-05-04T13:13:32Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "EqTe0d6f4JcaYGuwFTueBT376DU",
    id: {
      kind: "youtube#video",
      videoId: "fCES6G3nv5k",
    },
    snippet: {
      publishedAt: "2020-09-15T12:35:58Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】アニソン縛りでいえ～～い！【ホロライブ/猫又おかゆ】",
      description:
        "今日はアニソンを歌う日！！！！！！！ ◇お借りしたカラオケ音源 カラオケ歌っちゃ王様：https://www.youtube.com/channel/UC1tk9F5-MGXEq4LWnjmrtpA/featured",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/fCES6G3nv5k/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/fCES6G3nv5k/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/fCES6G3nv5k/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2020-09-15T12:35:58Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "8lN1vcTTlLz6bJBsj0EhG9Tybw8",
    id: {
      kind: "youtube#video",
      videoId: "MmZOKDGy76E",
    },
    snippet: {
      publishedAt: "2021-08-04T14:11:33Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【雑談】おかころ🍙🥐ぶっちゃけトーキング【 ＃おかころ /ホロライブ】",
      description:
        "＿ ころさんのチャンネル   @Korone Ch. 戌神ころね ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/MmZOKDGy76E/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/MmZOKDGy76E/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/MmZOKDGy76E/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-04T14:11:33Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "VpvYo4Vyc5hZFssgpNE8EOFKg2Q",
    id: {
      kind: "youtube#video",
      videoId: "EtWXejq8Vhw",
    },
    snippet: {
      publishedAt: "2021-04-23T12:52:41Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【雑談】たくさんお話ししようよ～～～！【猫又おかゆ/ホロライブ】",
      description:
        "＿ なはは～～ ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ 活動二周年記念グッズ販売中   可愛いアクスタやぬいぐるみ、 ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/EtWXejq8Vhw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/EtWXejq8Vhw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/EtWXejq8Vhw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-04-23T12:52:41Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "I4c8CRKYBCRIuZvfp6P68DtdzN4",
    id: {
      kind: "youtube#video",
      videoId: "06hoy4n5rO4",
    },
    snippet: {
      publishedAt: "2021-06-18T14:15:42Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【雑談】みんな～～～！おはなししよ～～！🌧【猫又おかゆ/ホロライブ】",
      description:
        "＿ 明日は梅雨ライブ！どきどき。   ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！“もぐもぐYUMMY” ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/06hoy4n5rO4/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/06hoy4n5rO4/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/06hoy4n5rO4/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-06-18T14:15:42Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "veMKS52AHb9NU4TkQi4_ZgQ2Amw",
    id: {
      kind: "youtube#video",
      videoId: "DZ5tPybIuWA",
    },
    snippet: {
      publishedAt: "2021-07-29T17:15:59Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【雑談】さっき帰ってきたよんよん🐈【猫又おかゆ/ホロライブ】",
      description:
        "＿ へろへろにゃんこ   ‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐-‐ はじめてのオリジナル曲！“もぐもぐYUMMY”は こちらでも ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/DZ5tPybIuWA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/DZ5tPybIuWA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/DZ5tPybIuWA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-07-29T17:15:59Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "_s0JEtR4-N0b-WHUT07nQNlYX3k",
    id: {
      kind: "youtube#video",
      videoId: "xOEV-sB9q3M",
    },
    snippet: {
      publishedAt: "2021-03-14T15:43:34Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【歌枠】ホワイトデーだし恋愛系の歌を歌う🎶【猫又おかゆ/ホロライブ】",
      description:
        "＿ バレンタインのときの歌枠はどうしたもんか 失恋系の曲が多かったのでリベンジも兼ねて…！ お借りした音源 カラオケ歌っちゃ ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/xOEV-sB9q3M/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/xOEV-sB9q3M/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/xOEV-sB9q3M/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-03-14T15:43:34Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "IKM7KQkMfjKG1l3Vfz9OEWS_1f8",
    id: {
      kind: "youtube#video",
      videoId: "D4a7jNJrfeA",
    },
    snippet: {
      publishedAt: "2021-08-05T19:27:06Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【帰ってきた魔界村】いけいけ進め～～！🐈＃2【猫又おかゆ/ホロライブ】",
      description:
        '＿ ぶーんぶーん！ "この動画およびライブは 株式会社カプコンの利用許諾を受けて配信しています 帰ってきた 魔界村 ©CAPCOM CO., LTD. ALL RIGHTS RESERVED.',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/D4a7jNJrfeA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/D4a7jNJrfeA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/D4a7jNJrfeA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-08-05T19:27:06Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "nHftpaWI-_7KAshm9KpddHVQPTA",
    id: {
      kind: "youtube#video",
      videoId: "i405kRcg98A",
    },
    snippet: {
      publishedAt: "2021-07-03T21:03:35Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【深夜廻】クリア後の世界を堪能する🍙🔦【猫又おかゆ/ホロライブ】",
      description:
        '＿ 冒険はまだまだ続く！！！！ "本ゲームは ©Nippon Ichi Software, Inc. の確認を得た上で配信・収益化を行なっております ーーーーーー 夜廻と深夜廻 for Nintendo ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/i405kRcg98A/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/i405kRcg98A/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/i405kRcg98A/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-07-03T21:03:35Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "m-I331o9LTgmEAankXT5wd7swZo",
    id: {
      kind: "youtube#video",
      videoId: "fR2texlVKJo",
    },
    snippet: {
      publishedAt: "2021-06-12T13:00:13Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "キュートなカノジョ / 猫又おかゆ( cover )",
      description:
        "＿ 猫冥利。 『キュートなカノジョ』 本家様▷https://youtu.be/oFmup8lxUHw illustrator：のーさー（@nosir_onadat）様 Mix：ごず（@_gozu777）様 Movie：神稲 たー ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/fR2texlVKJo/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/fR2texlVKJo/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/fR2texlVKJo/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-06-12T13:00:13Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "oCNYgeunAYp9d_BLSqQHQQY6zcU",
    id: {
      kind: "youtube#video",
      videoId: "Ijof1Kj_brs",
    },
    snippet: {
      publishedAt: "2021-06-12T15:23:10Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title: "【歌枠】告知が２つあるんだな～～。🐈🐈【猫又おかゆ/ホロライブ】",
      description:
        "＿ みんなに喜んでもらえるようなことを 準備してきました～～！   お借りした音源 歌っちゃ王様：https://www.youtube.com/channel/UC1tk9F5-MGXEq4LWnjmrtpA ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/Ijof1Kj_brs/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/Ijof1Kj_brs/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/Ijof1Kj_brs/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-06-12T15:23:10Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "ZnUAFy01ocn7dSCyTOdxX7XIJUE",
    id: {
      kind: "youtube#video",
      videoId: "PVS2rF_WO9U",
    },
    snippet: {
      publishedAt: "2021-04-13T11:08:00Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【試み】ころさんに向けて1時間で曲を作ってみよう！【猫又おかゆ/ホロライブ】",
      description:
        "＿ ころさんが今日で2周年！   はじめて曲を作ってみよう   ころさん22時からお祝い配信があるYO！ https://youtu.be/9lGkyDsFW9g ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/PVS2rF_WO9U/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/PVS2rF_WO9U/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/PVS2rF_WO9U/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-04-13T11:08:00Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Z4FloL7XTbgKsDX1KxYQZ5i9O9U",
    id: {
      kind: "youtube#video",
      videoId: "8mTjXY8nzL0",
    },
    snippet: {
      publishedAt: "2021-09-20T16:06:07Z",
      channelId: "UCvaTdHTWBGv3MKj3KVqJVCw",
      title:
        "【たまご守る】egg is broken. heart is too. 遊ぶ！！【猫又おかゆ/ホロライブ】",
      description:
        "＿ 本ゲームは Curious Visions の確認を得た上で配信・収益化を行なっております ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/8mTjXY8nzL0/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/8mTjXY8nzL0/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/8mTjXY8nzL0/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Okayu Ch. 猫又おかゆ",
      liveBroadcastContent: "none",
      publishTime: "2021-09-20T16:06:07Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "KHwES-2UyP2IzmSs2udi_axqhyw",
    id: {
      kind: "youtube#video",
      videoId: "AUOuCbS0_Ww",
    },
    snippet: {
      publishedAt: "2021-09-09T07:12:15Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【SUNSET ASMR】Pool-side Chatting with You #HololiveEnglish #holomyth",
      description:
        "I have returned from my trip! Let's celebrate with some chatting by the pool at sunset~ ^^ art by https://twitter.com/excaliblader mug: ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/AUOuCbS0_Ww/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/AUOuCbS0_Ww/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/AUOuCbS0_Ww/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-09-09T07:12:15Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "jT70UUiZInWepPYkg8YBmnEmcgI",
    id: {
      kind: "youtube#video",
      videoId: "ZshHgTtCJag",
    },
    snippet: {
      publishedAt: "2021-08-10T15:09:08Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【MANGA READING COLLAB】&quot;Bloom Into You&quot; with Takanashi Kiara! #hololiveEnglish",
      description:
        'Get "Bloom Into You Vol. 1" on BOOK☆WALKER: https://bit.ly/3iZvK6Z Use code [calli] or [kiara] to get 600JPY if you are a new customer! Bloom Into You Vol.',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ZshHgTtCJag/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ZshHgTtCJag/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ZshHgTtCJag/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-08-10T15:09:08Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "G4ZZltVGqK0jtOzhIakKJGB7igU",
    id: {
      kind: "youtube#video",
      videoId: "xd5p2MH1tiQ",
    },
    snippet: {
      publishedAt: "2021-08-09T06:07:37Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【ASMR】Whispering and Chatting in my Indoor Voice! #hololiveEnglish",
      description:
        "Today's ASMR includes... Chill talking, whispering, ear touching and massaging. Ear cream comes out at the end! I will give a warning. :} incredible art by ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/xd5p2MH1tiQ/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/xd5p2MH1tiQ/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/xd5p2MH1tiQ/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-08-09T06:07:37Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "KpmmE4xDXwUTP1X5ZefVgGpOIgk",
    id: {
      kind: "youtube#video",
      videoId: "8NUiwuHMU1k",
    },
    snippet: {
      publishedAt: "2021-07-17T14:11:16Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【CURSED ASMR】Do Not Watch This, Ears WILL Bleed. #hololiveEnglish",
      description:
        "Today's ASMR includes... ...some very Hateful things.... thumb: https://twitter.com/Uu3cm/status/1321374535686385666?s=20 ーーーーーーーーーーーーー ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/8NUiwuHMU1k/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/8NUiwuHMU1k/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/8NUiwuHMU1k/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-07-17T14:11:16Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "iwi4M1-LemQKH5aLARCGT5HDXdQ",
    id: {
      kind: "youtube#video",
      videoId: "1pkhXQkYXBE",
    },
    snippet: {
      publishedAt: "2021-07-08T06:32:46Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【ASMR】Summer is Here! Let&#39;s Cool Down and CHAT. #hololiveEnglish",
      description:
        "Today's ASMR includes... Chill talking, plastic sounds, desk materials, and ear tapping/rubbing (maybe lotion at the end so those not about that life can leave ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/1pkhXQkYXBE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/1pkhXQkYXBE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/1pkhXQkYXBE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-07-08T06:32:46Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "3E51kSqiDhr97GIaPueAcOL9DKA",
    id: {
      kind: "youtube#video",
      videoId: "g9KTW9kWGFo",
    },
    snippet: {
      publishedAt: "2021-07-07T16:33:37Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【Phantasy Star Online 2 New Genesis】S P A C E.... A D V E N T U R E ?!?! #hololiveEnglish #ad",
      description:
        'Sponsored by Sega! Play Phantasy Star Online 2 New Genesis for FREE! https://ngs.pso2.com/ I AM EXCITED TO "BLAST OFF" ON A BIG OLD SPACE ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/g9KTW9kWGFo/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/g9KTW9kWGFo/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/g9KTW9kWGFo/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-07-07T16:33:37Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "8uR_ALJ9h51S3w237dCPMT63pNg",
    id: {
      kind: "youtube#video",
      videoId: "HbXEeeS-LUo",
    },
    snippet: {
      publishedAt: "2021-06-11T16:28:09Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【SCARLET NEXUS】 Grim Reaper&#39;s Aptitude Test, Commencing Now... #hololiveEnglish #ad",
      description:
        "Let the demonstration begin! 8} Play the SCARLET NEXUS Demo first on Xbox Series X, right now! http://spr.ly/6005yGNGR Thank you so much, SCARLET ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/HbXEeeS-LUo/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/HbXEeeS-LUo/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/HbXEeeS-LUo/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-06-11T16:28:09Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "eE8eG3LNZwb2tnOP5InJY4afsm8",
    id: {
      kind: "youtube#video",
      videoId: "xTXgCF-Ezyk",
    },
    snippet: {
      publishedAt: "2021-06-07T07:23:44Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【ASMR DRAWING】Matte Tablet Sketching and Chatting with my Indoor Voice! 8} #hololiveEnglish",
      description:
        "Today's ASMR includes... Pen sounds, drawing, whispering and maybe chips. Mic has been fixed! Come relax with us! art: ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/xTXgCF-Ezyk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/xTXgCF-Ezyk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/xTXgCF-Ezyk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-06-07T07:23:44Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "6wHc8VCxa8N3MrYEzXEnleAWBZw",
    id: {
      kind: "youtube#video",
      videoId: "Tt41uNOmbz4",
    },
    snippet: {
      publishedAt: "2021-06-04T05:21:49Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【FRIDAY NIGHT FUNKIN】 Tonight We Funk Again, Lads. #hololiveEnglish #holoMyth",
      description:
        'now with 500% more DOWNSCROLL. ------------------------------------- General "back-seating" rule: You may tell me how you would like me to play the game in chat ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/Tt41uNOmbz4/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/Tt41uNOmbz4/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/Tt41uNOmbz4/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-06-04T05:21:49Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Xr1Nev5JXSVaRbrICZR60Vgt_zc",
    id: {
      kind: "youtube#video",
      videoId: "fR2_Z6A0qnQ",
    },
    snippet: {
      publishedAt: "2021-05-18T04:46:03Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【FRIDAY NIGHT FUNKIN】 We Do Not Funk Around, Dead BEATS. #hololiveEnglish #holoMyth",
      description:
        "Get the funk in here, Dead Beats. Ha ha ha, ha ha. thumb: https://twitter.com/Max0KE/status/1390658332185153540?s=20 ------------------------------------- General ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/fR2_Z6A0qnQ/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/fR2_Z6A0qnQ/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/fR2_Z6A0qnQ/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-05-18T04:46:03Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "CN-S1SLWIbEYNITPhZtEz2kz0Rc",
    id: {
      kind: "youtube#video",
      videoId: "i9H07Z-ZOOM",
    },
    snippet: {
      publishedAt: "2021-05-03T16:51:25Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【NEW OUTFIT REVEAL!】Grim Reaper&#39;s Brand New Style! 新衣装お披露目会!! #HololiveEnglish #CalliDrip",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? A brand new outfit reveal... Followed by a ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/i9H07Z-ZOOM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/i9H07Z-ZOOM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/i9H07Z-ZOOM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-05-03T16:51:25Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "EMYOlsGMyZNbVcyM_feeDebhCI8",
    id: {
      kind: "youtube#video",
      videoId: "Qj5XO2TEa2U",
    },
    snippet: {
      publishedAt: "2021-05-01T16:01:20Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【ASMR DRAWING】Sketching ASMR on my Matte Tablet! Featuring... Cute Girls! #hololiveEnglish #holoMyth",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Today's ASMR includes... Pen sounds ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/Qj5XO2TEa2U/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/Qj5XO2TEa2U/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/Qj5XO2TEa2U/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-05-01T16:01:20Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "h6y0nyzjQt4788zTUPCQM8i_lPo",
    id: {
      kind: "youtube#video",
      videoId: "uenuR-YCUCU",
    },
    snippet: {
      publishedAt: "2021-04-18T07:52:49Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【SUPER CHATS SEND-OFF】How Many Can We Send to the Underworld!?! 8} #holoMyth #hololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Today's Super Chats! -Live Show ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/uenuR-YCUCU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/uenuR-YCUCU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/uenuR-YCUCU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-04-18T07:52:49Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "RuYleykvZW56X-U6XY-DjmFiESk",
    id: {
      kind: "youtube#video",
      videoId: "QPv5royuumw",
    },
    snippet: {
      publishedAt: "2021-04-13T07:14:16Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【APEX LEGENDS】Reaper Dies and Zombie Girl Carries #hololiveEnglish #holoMyth",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? featuring Hololive Indonesia's zombie idol, ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/QPv5royuumw/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/QPv5royuumw/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/QPv5royuumw/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-04-13T07:14:16Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "kKMkKoDQdCbOf4YrSAM05KsW43M",
    id: {
      kind: "youtube#video",
      videoId: "bn_DydG7B0k",
    },
    snippet: {
      publishedAt: "2021-04-09T16:44:47Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【COMFY ASMR】Gentle Chats and Ear Pats! ...Comfy-ness Pending #holoMyth #hololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? We shall break out the ASMR mic, once more ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/bn_DydG7B0k/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/bn_DydG7B0k/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/bn_DydG7B0k/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-04-09T16:44:47Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "aOBsGyRBGtvSNqnfVOh7y3JJ_OE",
    id: {
      kind: "youtube#video",
      videoId: "-OcnD2Nc9qo",
    },
    snippet: {
      publishedAt: "2021-03-28T02:05:11Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【DUOLINGO】 Let&#39;s Lernen GERMAN! Gib mir deine Seele, bitte!!! 8}",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? ------------------------------------- Ich möchte ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/-OcnD2Nc9qo/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/-OcnD2Nc9qo/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/-OcnD2Nc9qo/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-03-28T02:05:11Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "0IazzCRkEWaTZCh117FfSY3AGek",
    id: {
      kind: "youtube#video",
      videoId: "KzLoNtvNIE4",
    },
    snippet: {
      publishedAt: "2021-02-26T06:30:17Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "CALLIOPE MORI - Channel Trailer - Hololive English #hololiveenglish #holomyth",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Let's. Go. DEAD BEATS!!!!!!! Incredible Trailer ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/KzLoNtvNIE4/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/KzLoNtvNIE4/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/KzLoNtvNIE4/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-02-26T06:30:17Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "kYE_ZNjasJ_XfVwoomAM3h4r2vA",
    id: {
      kind: "youtube#video",
      videoId: "EgOYVKiWQjc",
    },
    snippet: {
      publishedAt: "2021-01-21T14:15:30Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【ASMR STORY TIME】Let&#39;s Read Something! #HoloMyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? We are reading various texts with my ASMR ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/EgOYVKiWQjc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/EgOYVKiWQjc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/EgOYVKiWQjc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-01-21T14:15:30Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "Nf7lBa14wA3hl-0ddFjaifjrF1c",
    id: {
      kind: "youtube#video",
      videoId: "ef3mhzZ5FaY",
    },
    snippet: {
      publishedAt: "2021-01-17T15:40:04Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【WINE PARTY 雑談】Red Wine Drinking and Crunchy Snack Chatting!! :} #Holomyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Crunching on snacks, might use ASMR mic!",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ef3mhzZ5FaY/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ef3mhzZ5FaY/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ef3mhzZ5FaY/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-01-17T15:40:04Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "oJV2wZ4C_fA3iPXyKeuYqJ1dUQc",
    id: {
      kind: "youtube#video",
      videoId: "ENMA8IybMAI",
    },
    snippet: {
      publishedAt: "2021-01-14T17:22:16Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【ASMR MIC】It&#39;s Working! Lend Me Your Ears! #HoloMyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? I wrestled this mic to the ground and made it ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/ENMA8IybMAI/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/ENMA8IybMAI/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/ENMA8IybMAI/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-01-14T17:22:16Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "0a_FbiyL-osdvZNCN8SEGN9gtyI",
    id: {
      kind: "youtube#video",
      videoId: "3e49Yh0rgIM",
    },
    snippet: {
      publishedAt: "2021-01-05T05:02:58Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【SCUFFED ASMR MIC】...Left? Left? Left? ...RIGHT? #HoloMyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? DISCLAIMER: No real ASMR happens, we ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/3e49Yh0rgIM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/3e49Yh0rgIM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/3e49Yh0rgIM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2021-01-05T05:02:58Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "L5Nkr6qXCZf5pTRErdomtDmUZrg",
    id: {
      kind: "youtube#video",
      videoId: "kyOoU2eAZUU",
    },
    snippet: {
      publishedAt: "2020-12-27T23:56:56Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【MEMBER&#39;S ONLY WINE PARTY】Sleepy Reaper Talking Sleepy and Sipping Red #hololiveEnglish #holoMyth",
      description:
        'What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper\'s apprentice has a body! Can you believe it? Drinking and Sleepy Reaper Fake "ASMR" ...',
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/kyOoU2eAZUU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/kyOoU2eAZUU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/kyOoU2eAZUU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-12-27T23:56:56Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "CQ2ChOvotQPsNSkZlRluQYY-sf0",
    id: {
      kind: "youtube#video",
      videoId: "8TwC4ynM4VM",
    },
    snippet: {
      publishedAt: "2020-12-23T15:38:37Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【SLEEPY ASMR雑談】Cozy Chit-Chat with my Dead Beats... #HoloMyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? whisper bout tha week y'all know the drill ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/8TwC4ynM4VM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/8TwC4ynM4VM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/8TwC4ynM4VM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-12-23T15:38:37Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "7T7XEPr8zKd4vaePGyoDbrU108s",
    id: {
      kind: "youtube#video",
      videoId: "BRFbVM6lVeM",
    },
    snippet: {
      publishedAt: "2020-12-18T16:01:52Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【FAKE SLEEPOVER雑談】Kusotori Came to My House, So... feat. Takanashi Kiara #takamori",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Kusotori, get off my floor. Also, if you aren't ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/BRFbVM6lVeM/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/BRFbVM6lVeM/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/BRFbVM6lVeM/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-12-18T16:01:52Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "-B629dbafn71lxfPH74GEr9buUI",
    id: {
      kind: "youtube#video",
      videoId: "t7buf2ldafA",
    },
    snippet: {
      publishedAt: "2020-12-11T09:56:22Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【Blasphemous】Tee Hee! This Can Only End Well. #hololiveEnglish #holoMyth",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Tee hee! Let us face facts, you came here to ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/t7buf2ldafA/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/t7buf2ldafA/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/t7buf2ldafA/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-12-11T09:56:22Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "JqZWgQ5Cz79cfnQusp-sWU5X0Cw",
    id: {
      kind: "youtube#video",
      videoId: "cgpZHuOFZ10",
    },
    snippet: {
      publishedAt: "2020-12-10T08:59:00Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【SLEEPY ASMR(?)雑談】Talking (SOFTLY) With the Dead Beats! #HoloMyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Worry not. No recorders, no kazoos. just me ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/cgpZHuOFZ10/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/cgpZHuOFZ10/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/cgpZHuOFZ10/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-12-10T08:59:00Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "_AqyULs4lSE7Wgvb9IkixcWItFw",
    id: {
      kind: "youtube#video",
      videoId: "r3Ottnh8T0Q",
    },
    snippet: {
      publishedAt: "2020-12-07T09:47:45Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【MANGA READING】Hello, Dead Beats. I&#39;m Dad. Was That Okay? #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? We're reading \"My Dad's the Queen of all ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/r3Ottnh8T0Q/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/r3Ottnh8T0Q/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/r3Ottnh8T0Q/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-12-07T09:47:45Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "MNotR9woSRwt2mkBrVVVYZCTa-0",
    id: {
      kind: "youtube#video",
      videoId: "df3foPky_iE",
    },
    snippet: {
      publishedAt: "2020-11-16T16:41:54Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【LATE NIGHT雑談】Sleepy Reaper ASMR (?) and Free Talk! #HoloMyth #HololiveEnglish",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? Chilling at the crib. Just gonna.... Talk a lil bit ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/df3foPky_iE/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/df3foPky_iE/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/df3foPky_iE/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-11-16T16:41:54Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "tnxwc-F44O6S585eOvyvtS7HJy4",
    id: {
      kind: "youtube#video",
      videoId: "BQ9rYbkmQcc",
    },
    snippet: {
      publishedAt: "2020-10-21T15:52:49Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "【英会話カフェ】LET&#39;S PRACTICE ENGLISH, SLOWLY! :} #hololiveEnglish #holoMyth",
      description:
        "What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's apprentice has a body! Can you believe it? (NOTE: This stream is specifically designed ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/BQ9rYbkmQcc/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/BQ9rYbkmQcc/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/BQ9rYbkmQcc/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-10-21T15:52:49Z",
    },
  },
  {
    kind: "youtube#searchResult",
    etag: "T5FSiCmk7zKa9XHSs-NSdoRjeUk",
    id: {
      kind: "youtube#video",
      videoId: "6ydgEipkUEU",
    },
    snippet: {
      publishedAt: "2020-09-15T10:51:12Z",
      channelId: "UCL_qhgtOy0dy1Agp8vkySQg",
      title:
        "[Original Rap] DEAD BEATS - Calliope Mori #holoMyth #hololiveEnglish",
      description:
        "You can now listen to the EP here! :https://moricalliope.streamlink.to/DEADBEATS What is up, humans?! ♡ Calliope Mori（森 カリオペ）here. Grim Reaper's ...",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/6ydgEipkUEU/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/6ydgEipkUEU/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/6ydgEipkUEU/hqdefault.jpg",
          width: 480,
          height: 360,
        },
      },
      channelTitle: "Mori Calliope Ch. hololive-EN",
      liveBroadcastContent: "none",
      publishTime: "2020-09-15T10:51:12Z",
    },
  },
];
