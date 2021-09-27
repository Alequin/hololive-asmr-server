import { insertVideo } from "../database/insert-video.js";
import { readJsonFile } from "../read-json-file.js";
import { searchVideos } from "./search-videos.js";

export const storeVideoDetails = async () => {
  const allVideos = mockData;
  // const allVideos = await fetchVideosForAllChannels(
  //   readJsonFile("./src/store-video-details/channel-ids.json")
  // );

  const asmrVideos = allVideos.filter((video) =>
    /asmr/i.test(video.snippet.title)
  );

  const formattedVideos = asmrVideos.map((video) => ({
    videoId: video.id.videoId,
    channelTitle: video.snippet.channelTitle,
    videoTitle: video.snippet.title,
    thumbnailUrl: video.snippet.thumbnails.medium.url,
  }));

  for (const video of formattedVideos) await insertVideo(video);
};

const fetchVideosForAllChannels = async (channelsToSearch) => {
  const videos = [];
  for (const { channelId } of channelsToSearch)
    videos.push(
      ...(await searchVideosRecursively({
        channelId,
        queryTerms: ["asmr"],
        order: "date ",
      }))
    );
  return videos;
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
