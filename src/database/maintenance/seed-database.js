import { upsertChannel } from "../upsert-channel";
import { upsertVideo } from "../upsert-video";

export const seedDatabase = async () => {
  for (const video of mapChannelDataToColumns(seedVideos.allChannels)) await upsertChannel(video);
  for (const video of mapVideoDataToColumns(seedVideos.allVideos)) await upsertVideo(video);
};

const mapChannelDataToColumns = (channels) =>
  channels.map((channel) => ({
    channelId: channel.channel_id,
    channelTitle: channel.channel_title,
    thumbnailUrl: channel.thumbnail_url,
    uploadPlaylistId: channel.upload_playlist_id,
  }));

const mapVideoDataToColumns = (videos) =>
  videos.map((video) => ({
    videoId: video.video_id,
    videoTitle: video.video_title,
    thumbnailUrl: video.thumbnail_url,
    channelId: video.channel_id,
    publishedAt: video.published_at,
  }));

const seedVideos = {
  allChannels: [
    {
      channel_id: "UCvInZx9h3jC2JzsIzoOebWg",
      channel_title: "Flare Ch. 不知火フレア",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLS3w5WmjGJ4C-VOvMR7g3eVImLfwSTlQCofJCCkqA=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUvInZx9h3jC2JzsIzoOebWg",
    },
    {
      channel_id: "UCUKD-uaobj9jiqB-VXt71mA",
      channel_title: "Botan Ch.獅白ぼたん",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQXr6MeUpHI0-yNZIAaGXHvBVowhCWMwGx-zXYs=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUUKD-uaobj9jiqB-VXt71mA",
    },
    {
      channel_id: "UCoSrY_IQQVpmIRZ9Xf-y93g",
      channel_title: "Gawr Gura Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/uMUat6yJL2_Sk6Wg2-yn0fSIqUr_D6aKVNVoWbgeZ8N-edT5QJAusk4PI8nmPgT_DxFDTyl8=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUoSrY_IQQVpmIRZ9Xf-y93g",
    },
    {
      channel_id: "UCAWSyEs_Io8MtpY3m-zqILA",
      channel_title: "Nene Ch.桃鈴ねね",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQZBw4jihwhA_0JsKR8tRPOV1vHFdqI73hGE3OZ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUAWSyEs_Io8MtpY3m-zqILA",
    },
    {
      channel_id: "UChgTyjG-pdNvxxhdsXfHQ5Q",
      channel_title: "Pavolia Reine Ch. hololive-ID",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQfMF4yIvgoapLc07bB6a7ASN9iyGMgyE2UbwEM=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUhgTyjG-pdNvxxhdsXfHQ5Q",
    },
    {
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      channel_title: "Okayu Ch. 猫又おかゆ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLT_TLZsRHyNXj_3v1QIfF5Z1LOEIKQPL_7HGH29=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUvaTdHTWBGv3MKj3KVqJVCw",
    },
    {
      channel_id: "UC0TXe_LYZ4scaW2XMyi5_kw",
      channel_title: "AZKi Channel",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQQhnWKHLOLxjnXksGHHC8bnVS2UniL8Od6JTEPWQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU0TXe_LYZ4scaW2XMyi5_kw",
    },
    {
      channel_id: "UCp3tgHXw_HI0QMk1K8qh3gQ",
      channel_title: "Choco subCh. 癒月ちょこ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLT8t9_USgt289gErw3cmDEHmTXkXEhs6VAabZSf=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUp3tgHXw_HI0QMk1K8qh3gQ",
    },
    {
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      channel_title: "Rushia Ch. 潤羽るしあ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLR1en3cN55loPrFL1C5K19o5xGhcKkmr0noD4cO=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUl_gCybOJRIgOXw6Qb4qJzQ",
    },
    {
      channel_id: "UC7fk0CB07ly8oSl0aqKkqFg",
      channel_title: "Nakiri Ayame Ch. 百鬼あやめ",
      thumbnail_url:
        "https://yt3.ggpht.com/XDGhKwPZcT16Ppg2gQmLHEIYRhw9sY4rqG0HWbeCH68LHkhlVQrrFgxd5hWUuMb2nLfDOhu6=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU7fk0CB07ly8oSl0aqKkqFg",
    },
    {
      channel_id: "UCZlDXzGoo7d44bwdNObFacg",
      channel_title: "Kanata Ch. 天音かなた",
      thumbnail_url:
        "https://yt3.ggpht.com/TlH8nz5O9UYo5JZ_5fo4JfXdT18N0Ck27wWrulni-c1g5bwes0tVmFiSKICzI1SW7itaTkk9GA=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUZlDXzGoo7d44bwdNObFacg",
    },
    {
      channel_id: "UCa9Y57gfeY0Zro_noHRVrnw",
      channel_title: "Luna Ch. 姫森ルーナ",
      thumbnail_url:
        "https://yt3.ggpht.com/yVg0ujw11JN5YSykr-63ivgudlC5PE5Kzn3Cpm7eFWVB7fxtcJvTXcG1M_9tFHETJ7144NO6=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUa9Y57gfeY0Zro_noHRVrnw",
    },
    {
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      channel_title: "Polka Ch. 尾丸ポルカ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQI_iYxOpfP8bJklQ_VnS4a9jdrwRRlre_JP1Yp=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUK9V2B22uJYu3N7eR_BT9QA",
    },
    {
      channel_id: "UC1suqwovbL1kzsoaZgFZLKg",
      channel_title: "Choco Ch. 癒月ちょこ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQn_VxZ1ApMgQahrkcTtSdSAr6Jpxi4eHQiMnIlsw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU1suqwovbL1kzsoaZgFZLKg",
    },
    {
      channel_id: "UC1opHUrw8rvnsadT-iGp7Cg",
      channel_title: "Aqua Ch. 湊あくあ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLTbU5ET3bgn0Iuz1jUBNjgSe9EW8kLxIhDUrtJlPw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU1opHUrw8rvnsadT-iGp7Cg",
    },
    {
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      channel_title: "Miyabi Ch. 花咲みやび",
      thumbnail_url:
        "https://yt3.ggpht.com/zxQf8fShPDdHyNGTIGdP1sZ2w-wFTw9BYWupkB9mL1fr3dHEbd5-vhVJ6iA7RdNP8ixpbfOR_g=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU6t3-_N8A6ME1JShZHHqOMw",
    },
    {
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      channel_title: "Watson Amelia Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLTvS-8gomaJywaEKp3hnCmY92vQ9uKpy8rMAx3a=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUyl1z3jo3XHR1riLFKG5UAg",
    },
    {
      channel_id: "UC3n5uGu18FoCy23ggWWp8tA",
      channel_title: "Nanashi Mumei Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/MI8E8Wfmc_ngNZXUwu8ad0D-OtqDhmqGVULEu25z-ccscwzJpAw-7ewFXzZYLK2jHB9d5OgQDq4=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU3n5uGu18FoCy23ggWWp8tA",
    },
    {
      channel_id: "UCP0BspO_AMEe3aQqqpo89Dg",
      channel_title: "Moona Hoshinova hololive-ID",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRaHP1Qoi3zFxbQYdbX4MNnV18TrqjFBwDxgTlNqg=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUP0BspO_AMEe3aQqqpo89Dg",
    },
    {
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      channel_title: "Noel Ch. 白銀ノエル",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLS1MTrG3Gn7-Vf_rVNAZ2Ou8KrmUGUXO6TmkLxe=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUdyqAaZDKHXg4Ahi7VENThQ",
    },
    {
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      channel_title: "フブキCh。白上フブキ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQmM8F8S-7GTcF5Lw7fBALF8FQC9yNKTb_nFHev2w=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUdn5BQ06XqgXoAxIhbqw5Rg",
    },
    {
      channel_id: "UCAoy6rzhSf4ydcYjJw3WoVg",
      channel_title: "Airani Iofifteen Channel hololive-ID",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQNhNLAE1ECJuVKg9sO7PpiRd2g-kaq6VWB6Q69=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUAoy6rzhSf4ydcYjJw3WoVg",
    },
    {
      channel_id: "UCmbs8T6MWqUHP1tIQvSgKrg",
      channel_title: "Ouro Kronii Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/6670YE31bbAtAi7m_UL-KWZBdL5wvmfHlLtcS4HxsBZBQNqmAk7Y-iiIOjawO_0HYXpS4HfC=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUmbs8T6MWqUHP1tIQvSgKrg",
    },
    {
      channel_id: "UCp6993wxpyDPHUpavwDFqgg",
      channel_title: "SoraCh. ときのそらチャンネル",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQO9Vyz7ysAwPSio5xvkw6n0xvlyDu7A9eawqIH3w=s240-c-k-c0x00ffffff-no-rj-mo",
      upload_playlist_id: "UUp6993wxpyDPHUpavwDFqgg",
    },
    {
      channel_id: "UC1uv2Oq6kNxgATlCiez59hw",
      channel_title: "Towa Ch. 常闇トワ",
      thumbnail_url:
        "https://yt3.ggpht.com/meRnxbRUm5yPSwq8Q5QpI5maFApm5QTGQV_LGblQFsoO0yAV4LI-nSZ70GYwMZ_tbfSa_O8MTCU=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU1uv2Oq6kNxgATlCiez59hw",
    },
    {
      channel_id: "UCOyYb1c43VlX9rc_lT6NKQw",
      channel_title: "Ayunda Risu Ch. hololive-ID",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLTjqfaFS9JlspGjiIah2kkxOtl4vRrxBCYKMEY5Kw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUOyYb1c43VlX9rc_lT6NKQw",
    },
    {
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      channel_title: "Mori Calliope Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQi2hR9UdCcWoDLz4sJYqAu9BkaYBGWex_th5ic=s240-c-k-c0x00ffffff-no-rj-mo",
      upload_playlist_id: "UUL_qhgtOy0dy1Agp8vkySQg",
    },
    {
      channel_id: "UC5CwaMl1eIgY8h02uZw7u8A",
      channel_title: "Suisei Channel",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLSAm13gTESsu39zgJ1TYb649BiGqYa_XCv5C6Lu=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU5CwaMl1eIgY8h02uZw7u8A",
    },
    {
      channel_id: "UCsUj0dszADCGbF3gNrQEuSQ",
      channel_title: "Tsukumo Sana Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/t1XymJVoo8trXNJ1PeHTzaROF5wqlBYigFoYzw0HEthLahxAXjpqBi6c5ttOp9kWkYCkspivEg=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUsUj0dszADCGbF3gNrQEuSQ",
    },
    {
      channel_id: "UCQ0UDLQCjY0rmuxCDE38FGg",
      channel_title: "Matsuri Channel 夏色まつり",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQCXDfJbZoEZ-gtUiF4nSaGU8-qiq--BSTd92Sw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUQ0UDLQCjY0rmuxCDE38FGg",
    },
    {
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      channel_title: "Lamy Ch. 雪花ラミィ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQDR06gp26jxNNXh88Hhv1o-pNrnlKrYruqUIOx=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUFKOVgVbGmX65RxO3EtH3iw",
    },
    {
      channel_id: "UC1CfXB_kRs3C-zaeTG3oGyg",
      channel_title: "HAACHAMA Ch 赤井はあと",
      thumbnail_url:
        "https://yt3.ggpht.com/rNj6bichsOoUjA2N9iXWxInEt9Y2Fo5fhG4S8oR17ip8ouCu_7wmX3PnQxt6OP6Rd9OlYXYcmw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU1CfXB_kRs3C-zaeTG3oGyg",
    },
    {
      channel_id: "UC8rcEBzJSleTkf_-agPM20g",
      channel_title: "IRyS Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/UwxlX1PuB_RwJyEUW_ofbBR6saY8n5_p8A9_1bY65zygFrfqIb1GM8dIK33EJboDDnRVyw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU8rcEBzJSleTkf_-agPM20g",
    },
    {
      channel_id: "UC727SQYUvx5pDDGQpTICNWg",
      channel_title: "Anya Melfissa Ch. hololive-ID",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLR0AplPQyxSjGhqMxJy7vAvXn-9hyaiXBoBE5vy=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU727SQYUvx5pDDGQpTICNWg",
    },
    {
      channel_id: "UC-hM6YJuNYVAmUWxeIr9FeA",
      channel_title: "Miko Ch. さくらみこ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQlZnbXr-RooUQezemDKu7alJrZcEMy8_5P07ILug=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU-hM6YJuNYVAmUWxeIr9FeA",
    },
    {
      channel_id: "UCqm3BQLlJfvkTsX_hvm0UmA",
      channel_title: "Watame Ch. 角巻わため",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRWpyqOZzCmuSfmKGNo8TD2L_IRUYSw1wyhHXw-=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUqm3BQLlJfvkTsX_hvm0UmA",
    },
    {
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      channel_title: "Mel Channel 夜空メルチャンネル",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLSwGrjnpZYhSj5yOV35k_CaXHeCbW1222lgtgbW=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUD8HOxPs4Xvsm8H0ZxXGiBw",
    },
    {
      channel_id: "UCgmPnx-EEeOrZSg5Tiw7ZRQ",
      channel_title: "Hakos Baelz Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/GWIwRbtVQ2TAlvH8Mf37FMpemTrwmUSbTSazp9Aul6KwdKQmvx7IbLZepDk0sp8ReW3qBhsU=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUgmPnx-EEeOrZSg5Tiw7ZRQ",
    },
    {
      channel_id: "UCZgOv3YDEs-ZnZWDYVwJdmA",
      channel_title: "Izuru Ch. 奏手イヅル",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRG60Hg-7N1Mmh47K7P6ghMf2hVaivdVk9I9fEWYA=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUZgOv3YDEs-ZnZWDYVwJdmA",
    },
    {
      channel_id: "UCANDOlYTJT7N5jlRC3zfzVA",
      channel_title: "Roberu Ch. 夕刻ロベル",
      thumbnail_url:
        "https://yt3.ggpht.com/yVTO0I6VAXBjBLBPvgLGlBlp1hganldhl6AY3PW_ZWOJ0sYwfLo1yc2Sqr5SMjXQf7Dm4U-2=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUANDOlYTJT7N5jlRC3zfzVA",
    },
    {
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      channel_title: "Shien Ch.影山シエン",
      thumbnail_url:
        "https://yt3.ggpht.com/N20GfJbuG8BBl9CexUek023y2DXQAYqgYoRRqsVGAYoS-gZsGuH7W1Il0y-8TnIul19rBPG78Jo=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUhSvpZYRPh0FvG4SJGSga3g",
    },
    {
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      channel_title: "Roboco Ch. - ロボ子",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLTVWKjrovP0tGtguup9TYZicykceA45olVmEr2kvQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUDqI2jOz0weumE8s7paEk6g",
    },
    {
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      channel_title: "アキロゼCh。Vtuber/ホロライブ所属",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLT4XEPRFwXpb4gZ1qco_xCOt7ems7SrUsGOkmXX=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUFTLzh12_nrtzqBPsTCqenA",
    },
    {
      channel_id: "UCs9_O1tRPMQTHQ-N_L6FU2g",
      channel_title: "Lui ch. 鷹嶺ルイ - holoX -",
      thumbnail_url:
        "https://yt3.ggpht.com/KO_kRAeAQ4C4M5xJDFOFHZ79ycCRfMxttefXIDFurZE2fsVPnmlHkMdM5zjEsUTH1i97xnxKNw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUs9_O1tRPMQTHQ-N_L6FU2g",
    },
    {
      channel_id: "UC6eWCld0KwmyHFbAqK3V-Rw",
      channel_title: "Koyori ch. 博衣こより - holoX -",
      thumbnail_url:
        "https://yt3.ggpht.com/SNSkqaOmq3OF37yMyn1t2qEFFUzD1-VgY2e4nhwi_cYBE4jzKWUn4BaV-bf2HHphKBYTeV8PcQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU6eWCld0KwmyHFbAqK3V-Rw",
    },
    {
      channel_id: "UCMwGHR0BTZuLsmjY_NT5Pwg",
      channel_title: "Ninomae Ina'nis Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRFAFjEvIwiZ_MrQvdY8-QbJkqvahsi3La78Jf7=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUMwGHR0BTZuLsmjY_NT5Pwg",
    },
    {
      channel_id: "UC1DCedRgGHBdm81E1llLhOQ",
      channel_title: "Pekora Ch. 兎田ぺこら",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLSmHTeNNQp8A4AwsUPKzBa2ubDBWe6RSaG39mAYTw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU1DCedRgGHBdm81E1llLhOQ",
    },
    {
      channel_id: "UCp-5t9SrOQwXMU7iIjQfARg",
      channel_title: "Mio Channel 大神ミオ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRP0h31urAKtYcu_j1foVuGyPU65_Y-VNBqLgHB5Q=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUp-5t9SrOQwXMU7iIjQfARg",
    },
    {
      channel_id: "UCHsx4Hqa-1ORjQTh9TYDhww",
      channel_title: "Takanashi Kiara Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/w7TKJYU7zmamFmf-WxfahCo_K7Bg2__Pk-CCBNnbewMG-77OZLqJO9MLvDAmH9nEkZH8OkWgSQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUHsx4Hqa-1ORjQTh9TYDhww",
    },
    {
      channel_id: "UCCzUftO8KOVkV4wQG1vkUvg",
      channel_title: "Marine Ch. 宝鐘マリン",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRFcdtwPHqI4573geBEyNL5h93BxtH5cMy_aL4zUw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUCzUftO8KOVkV4wQG1vkUvg",
    },
    {
      channel_id: "UCXTpFs_3PqI41qX2d9tL2Rw",
      channel_title: "Shion Ch. 紫咲シオン",
      thumbnail_url:
        "https://yt3.ggpht.com/AyUL9W0ltc_aJr_MysuZBx8hRfb1SIVNREgU9kiOO-lqmdhYkEsllmhagertVIwHwa3UAAKy=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUXTpFs_3PqI41qX2d9tL2Rw",
    },
    {
      channel_id: "UCENwRMx5Yh42zWpzURebzTw",
      channel_title: "Laplus ch. ラプラス・ダークネス - holoX -",
      thumbnail_url:
        "https://yt3.ggpht.com/15dyicQS1y53YJFewLOoharHZzZC2c5klCpfD7TDkw3myFf_-rACyL588-ZaJwHoTaoTo7KQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUENwRMx5Yh42zWpzURebzTw",
    },
    {
      channel_id: "UCvzGlP9oQwU--Y0r9id_jnA",
      channel_title: "Subaru Ch. 大空スバル",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRaQJl61Pxhsnrzz50wirogPn18pPUYL0YFAauj=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUvzGlP9oQwU--Y0r9id_jnA",
    },
    {
      channel_id: "UCYz_5n-uDuChHtLo7My1HnQ",
      channel_title: "Kureiji Ollie Ch. hololive-ID",
      thumbnail_url:
        "https://yt3.ggpht.com/jWxru6sHDDSuKF-gztFg_WSoMp2da_d019iH0xz0MDWc7TIhetK8id_mVKV0PxWKp-QS23AzfQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUYz_5n-uDuChHtLo7My1HnQ",
    },
    {
      channel_id: "UC9mf_ZVpouoILRY9NUIaK-w",
      channel_title: "Rikka ch.律可",
      thumbnail_url:
        "https://yt3.ggpht.com/0MLL-S2KKu4PlhedunMhvg4VPJGm6Fpx2C4QV2PWJvkcG1eA6XqUYULUZGqBF2M4iNY7FxBt=s240-c-k-c0x00ffffff-no-nd-rj",
      upload_playlist_id: "UU9mf_ZVpouoILRY9NUIaK-w",
    },
    {
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      channel_title: "Aruran Ch. アルランディス",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQH3CqU4dL9EWjrYl6aKn26_DAAHbCXEBVyMTaWZA=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUKeAhJvy8zgXWbh9duVjIaQ",
    },
    {
      channel_id: "UCGNI4MENvnsymYjKiZwv9eg",
      channel_title: "Temma Ch. 岸堂天真",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLRUGIQekUO7Yyzzx49nHpRozhPKLUmNDnEAL4Go=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUGNI4MENvnsymYjKiZwv9eg",
    },
    {
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      channel_title: "Ceres Fauna Ch. hololive-EN",
      thumbnail_url:
        "https://yt3.ggpht.com/1rUoSkwh5LJbR8ez3-l02cdoOIKt9IlhKJxkBTqoff2qZb-VV3wUTFpkE2cNDQnOjk8wR-TW=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUO_aKKYxn4tvrqPjcTzZ6EQ",
    },
    {
      channel_id: "UChAnqc_AY5_I3Px5dig3X1Q",
      channel_title: "Korone Ch. 戌神ころね",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLSegxVNNn4QGDwO-jO89ZDcYLSyPUQS3a4KU6QPCw=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUhAnqc_AY5_I3Px5dig3X1Q",
    },
    {
      channel_id: "UC_vMYWcDjmfdpH6r4TTn1MQ",
      channel_title: "Iroha ch. 風真いろは - holoX -",
      thumbnail_url:
        "https://yt3.ggpht.com/YK_UCAbw_pFBHSOw_LGWI-WCJDdvMP3y9mmODQ1IFEnNVvcf-M3-q22Db5TLWuAbfboMNFTMIg=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UU_vMYWcDjmfdpH6r4TTn1MQ",
    },
    {
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      channel_title: "Oga Ch.荒咬オウガ",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLTn3QGX09ZS4rzV54zwhFWKbnJtrM5cPGsXfZPi=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUwL7dgTxKo8Y4RFIKWaf8gA",
    },
    {
      channel_id: "UCNVEsYbiZjH5QLmGeSgTSzg",
      channel_title: "astel ch.アステル",
      thumbnail_url:
        "https://yt3.ggpht.com/ytc/AKedOLQZtNrwtu1KawCZz7ph1erMEC8ZSGESvpjc_XMZ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUNVEsYbiZjH5QLmGeSgTSzg",
    },
    {
      channel_id: "UCIBY1ollUsauvVi4hW4cumw",
      channel_title: "Chloe ch. 沙花叉クロヱ - holoX -",
      thumbnail_url:
        "https://yt3.ggpht.com/wYWT2pueYH2nEP-PDUtvJwXTNUbaUXaz9UpOnHWif8vJsjsj3teqFPo1305ojToSCO9U5JHkoaQ=s240-c-k-c0x00ffffff-no-rj",
      upload_playlist_id: "UUIBY1ollUsauvVi4hW4cumw",
    },
  ],
  allVideos: [
    {
      video_id: "IpjcloaTUJU",
      video_title:
        "【ASMR】高音質、甘々睡眠誘導/愛情たっぷり囁き/××/マッサージ/KU100【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/IpjcloaTUJU/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-12-09T16:42:22Z",
    },
    {
      video_id: "yMAeohEIm0s",
      video_title: "【対決枠】夕刻ロベル　VS　ASMR【ホロスターズ/夕刻ロベル】",
      thumbnail_url: "https://i.ytimg.com/vi/yMAeohEIm0s/mqdefault.jpg",
      channel_id: "UCANDOlYTJT7N5jlRC3zfzVA",
      published_at: "2021-12-09T05:15:37Z",
    },
    {
      video_id: "iNaikBJ69Wo",
      video_title: "【ASMR】 Warm & Cozy Ear Cleaning & Oil Massage 💗 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/iNaikBJ69Wo/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-12-08T07:17:07Z",
    },
    {
      video_id: "TYe4XcaU9bM",
      video_title: "【ASMR】🍑本気で練習させてみろ🍑 【桃鈴ねね/ホロライブ/ #ねねいろらいぶ 】",
      thumbnail_url: "https://i.ytimg.com/vi/TYe4XcaU9bM/mqdefault.jpg",
      channel_id: "UCAWSyEs_Io8MtpY3m-zqILA",
      published_at: "2021-12-08T06:45:17Z",
    },
    {
      video_id: "GQsh5HGMqx8",
      video_title:
        "【黒3Dio】睡眠導入♡オイルマッサージASMR（Oil Massage）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/GQsh5HGMqx8/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-12-07T16:44:30Z",
    },
    {
      video_id: "nLNDQ2sUidI",
      video_title: "【弾き語りASMR枠】究極の癒やし【律可/ホロスターズ】#りつすた",
      thumbnail_url: "https://i.ytimg.com/vi/nLNDQ2sUidI/mqdefault.jpg",
      channel_id: "UC9mf_ZVpouoILRY9NUIaK-w",
      published_at: "2021-12-06T09:16:40Z",
    },
    {
      video_id: "P9TV-ADC6XY",
      video_title:
        "【ASMR】はじめてのASMR🎵※初心者なので囁きから練習しますでござる【風真いろは/ホロライブ6期生】",
      thumbnail_url: "https://i.ytimg.com/vi/P9TV-ADC6XY/mqdefault.jpg",
      channel_id: "UC_vMYWcDjmfdpH6r4TTn1MQ",
      published_at: "2021-12-05T09:41:13Z",
    },
    {
      video_id: "QxB2PEP5w2Q",
      video_title:
        "【ASMR/KU100】寝ない悪い子はお仕置き👻キミのお耳をいぢめて癒します💕Ear Cleaning/Ear Massage/Sleep Whispering【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/QxB2PEP5w2Q/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-12-04T04:37:56Z",
    },
    {
      video_id: "W_oeKQKIG-o",
      video_title:
        "[ASMR/立体音響] 高音質であまあま睡眠導入💙いっぱい甘やかしてあげる💙Ear Massage/Sleep Whispering/KU100【天音かなた/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/W_oeKQKIG-o/mqdefault.jpg",
      channel_id: "UCZlDXzGoo7d44bwdNObFacg",
      published_at: "2021-12-02T22:49:15Z",
    },
    {
      video_id: "TSzwPniQy04",
      video_title: "【ASMR】はじめての…♡【博衣こより/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/TSzwPniQy04/mqdefault.jpg",
      channel_id: "UC6eWCld0KwmyHFbAqK3V-Rw",
      published_at: "2021-12-01T18:59:30Z",
    },
    {
      video_id: "9bkKurtHyjs",
      video_title: "【気持ちの良いASMR】マリンとお泊り【ホロライブ/夜空メル×宝鐘マリン】",
      thumbnail_url: "https://i.ytimg.com/vi/9bkKurtHyjs/mqdefault.jpg",
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      published_at: "2021-11-29T10:00:20Z",
    },
    {
      video_id: "rndpT6FVkqI",
      video_title: "【ASMR雑談】深夜のひっそりこそこそ話【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/rndpT6FVkqI/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2021-11-28T14:56:01Z",
    },
    {
      video_id: "sEealCmdkL0",
      video_title:
        "【黒3Dio】睡眠導入♡オイルマッサージ＆耳かきASMR（Oil Massage/Ear Blowing）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/sEealCmdkL0/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-11-27T18:44:29Z",
    },
    {
      video_id: "3vFEg6Eb49k",
      video_title: "【ASMR】今までありがとうイヤンホホマイク卒業SP【影山シエン/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/3vFEg6Eb49k/mqdefault.jpg",
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      published_at: "2021-11-26T10:28:30Z",
    },
    {
      video_id: "to-mArQJQTI",
      video_title: "【Fauna's ASMR】 Whispering & Assorted ASMR Triggers 🌿 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/to-mArQJQTI/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-11-26T06:12:53Z",
    },
    {
      video_id: "AS5BOhy1_qk",
      video_title: "【ASMR】俺の膝の上で映画同時視聴　ヴェノム(2018)【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/AS5BOhy1_qk/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2021-11-25T09:49:33Z",
    },
    {
      video_id: "rSeCCzGiiR8",
      video_title:
        "【ASMR】オフコラボ♡僕っ子二人がたっぷりお耳を癒します【ホロライブ/夜空メル＆猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/rSeCCzGiiR8/mqdefault.jpg",
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      published_at: "2021-11-19T17:40:58Z",
    },
    {
      video_id: "CFJTXtW9tPc",
      video_title: "【ASMR】耳かきしてさ、一緒に寝ようか / Ear cleaning【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/CFJTXtW9tPc/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-11-16T19:18:18Z",
    },
    {
      video_id: "13pcZd4HtTY",
      video_title: "【Fauna's ASMR】 Rambling to you~ My favorite ASMR triggers 🌿 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/13pcZd4HtTY/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-11-16T04:43:15Z",
    },
    {
      video_id: "LwzNCrrVcu0",
      video_title: "【ASMR】SPA DAY! Water Sounds, Ear Massages, Finding Peace Together!",
      thumbnail_url: "https://i.ytimg.com/vi/LwzNCrrVcu0/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-11-06T12:51:02Z",
    },
    {
      video_id: "J-c-mj8xVKg",
      video_title: "【ASMR】 Study with Me?​",
      thumbnail_url: "https://i.ytimg.com/vi/J-c-mj8xVKg/mqdefault.jpg",
      channel_id: "UC3n5uGu18FoCy23ggWWp8tA",
      published_at: "2021-11-01T21:11:48Z",
    },
    {
      video_id: "PNDaXycPDZM",
      video_title: "【ASMR Roleplay】 Yandere Fauna Wants You to Stay Forever ♡ [Horror ASMR?]",
      thumbnail_url: "https://i.ytimg.com/vi/PNDaXycPDZM/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-10-31T18:46:07Z",
    },
    {
      video_id: "ugm8DU-aYUo",
      video_title:
        "【ASMR】月末定期ASMR/HALLOWEEN🎃お菓子を食べながらイタズラするぞぃ！【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/ugm8DU-aYUo/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-10-30T02:06:06Z",
    },
    {
      video_id: "3zMbzUW3iNQ",
      video_title: "【Fauna's ASMR】 Relax with Ear Cleaning & Oil Massage 🌿 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/3zMbzUW3iNQ/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-10-29T20:14:44Z",
    },
    {
      video_id: "-bPAAYRzbBU",
      video_title: "【囁き】月曜深夜のASMR【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/-bPAAYRzbBU/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2021-10-24T17:16:55Z",
    },
    {
      video_id: "hreU1CDQX0A",
      video_title: "【壁ASMR】低気圧に負けた者の生活音🌲Life sounds🎶【尾丸ポルカ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/hreU1CDQX0A/mqdefault.jpg",
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      published_at: "2021-10-24T13:53:52Z",
    },
    {
      video_id: "t2KcnW92P5k",
      video_title: "【Fauna's ASMR】 Washing Your Hair ✿ Fauna's Hair Salon #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/t2KcnW92P5k/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-10-23T06:36:23Z",
    },
    {
      video_id: "KyZJoJm04KI",
      video_title: "【弾き語りASMR】究極の癒し歌枠で睡眠導入【律可/ホロスターズ】#りつすた",
      thumbnail_url: "https://i.ytimg.com/vi/KyZJoJm04KI/mqdefault.jpg",
      channel_id: "UC9mf_ZVpouoILRY9NUIaK-w",
      published_at: "2021-10-13T10:23:03Z",
    },
    {
      video_id: "9hGSWgJIo7M",
      video_title:
        "【ASMR】疲れたときはいつでも来てね…♡ 耳かき/囁き/Ear cleaning【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/9hGSWgJIo7M/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-10-12T00:17:54Z",
    },
    {
      video_id: "TLZPeOw1eAI",
      video_title:
        "【Fauna's ASMR】 Comfy Ear Cleaning, Oil Massage, and ASMR Triggers by Fauna 💚 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/TLZPeOw1eAI/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-10-06T08:22:07Z",
    },
    {
      video_id: "qNmDjU7ZE-A",
      video_title: "【ASMR Microphone Arrived】Fiddling with my First Binaural",
      thumbnail_url: "https://i.ytimg.com/vi/qNmDjU7ZE-A/mqdefault.jpg",
      channel_id: "UC8rcEBzJSleTkf_-agPM20g",
      published_at: "2021-10-05T19:12:43Z",
    },
    {
      video_id: "WdeXi8rcasY",
      video_title: "【ASMR】魔人が耳元で囁くASMR【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/WdeXi8rcasY/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2021-09-30T09:27:34Z",
    },
    {
      video_id: "eHJYlxmNAxk",
      video_title: "【ASMR】月末定期ASMR放送 2021.9【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/eHJYlxmNAxk/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-09-30T08:47:07Z",
    },
    {
      video_id: "2QDRjSb5Ofo",
      video_title: "【Fauna's ASMR】 Healing Headpats & Hair Brushing #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/2QDRjSb5Ofo/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-09-30T07:05:30Z",
    },
    {
      video_id: "oRN_5TPDdhI",
      video_title: "Defusing bombs with Kronii but we can only speak in ASMR #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/oRN_5TPDdhI/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-09-28T08:13:46Z",
    },
    {
      video_id: "PZm_QOmULc4",
      video_title:
        "【ASMR／KU100】300万円の新機材を導入したので貴方のお耳で実験させてね💓【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/PZm_QOmULc4/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-09-23T23:12:10Z",
    },
    {
      video_id: "2hgwPt5kmZc",
      video_title: "【Fauna's ASMR】 Cozy Autumn ASMR 🍂 Crinkley & Comfy #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/2hgwPt5kmZc/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-09-22T06:26:33Z",
    },
    {
      video_id: "j6RkC8hlaMk",
      video_title:
        "【Fauna's ASMR】 Ear Cleaning, Oil Massage, & Comfy ASMR Triggers 🌿 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/j6RkC8hlaMk/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-09-17T21:05:52Z",
    },
    {
      video_id: "aUVQ48H2-EE",
      video_title: "【ASMR】梵天のふわふわマッサージだよ✨【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/aUVQ48H2-EE/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-09-14T08:14:08Z",
    },
    {
      video_id: "TOKtLUirl5c",
      video_title: "【9/9】ウィンナー齧りASMR & 雑談【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/TOKtLUirl5c/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2021-09-08T14:55:19Z",
    },
    {
      video_id: "AUOuCbS0_Ww",
      video_title: "【SUNSET ASMR】Pool-side Chatting with You #HololiveEnglish #holomyth",
      thumbnail_url: "https://i.ytimg.com/vi/AUOuCbS0_Ww/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-09-08T02:24:46Z",
    },
    {
      video_id: "8-rKCWmlfJw",
      video_title: "【Fauna's ASMR】 Relaxing with Cooling Summertime ASMR 🧊 #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/8-rKCWmlfJw/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-09-06T05:43:12Z",
    },
    {
      video_id: "t_8Qb5plgBo",
      video_title: "【 ASMR 】いっぱい癒したい！甘々/囁き/耳かき【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/t_8Qb5plgBo/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-09-04T01:02:30Z",
    },
    {
      video_id: "GiVD85nIgwQ",
      video_title: "【ASMR】地 獄 の 癒 し を あ・げ ・る ♥【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/GiVD85nIgwQ/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-08-31T22:53:20Z",
    },
    {
      video_id: "QKRLTdeTp1Y",
      video_title: "【ASMR】月末定期ASMR放送：21.8月【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/QKRLTdeTp1Y/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-08-31T11:36:46Z",
    },
    {
      video_id: "zasog1BzniA",
      video_title: "【子守唄ASMR】眠たい君へ送るよ○ /softly song Japanese【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/zasog1BzniA/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-08-29T23:00:48Z",
    },
    {
      video_id: "DfbzUvIXvTc",
      video_title: "【ASMR】囁き声🌼音で遊ぼう🌼Whispering🌼etc...【尾丸ポルカ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/DfbzUvIXvTc/mqdefault.jpg",
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      published_at: "2021-08-29T12:51:15Z",
    },
    {
      video_id: "wH98LIjrzC8",
      video_title: "夏の風物詩 そうめんちゅるちゅる ASMR",
      thumbnail_url: "https://i.ytimg.com/vi/wH98LIjrzC8/mqdefault.jpg",
      channel_id: "UCp-5t9SrOQwXMU7iIjQfARg",
      published_at: "2021-08-29T06:32:28Z",
    },
    {
      video_id: "le9AAt8B5Gc",
      video_title:
        "【ASMR】 Fauna's first ASMR stream! 🌿 comfy whispers and assorted ASMR triggers  #holoCouncil",
      thumbnail_url: "https://i.ytimg.com/vi/le9AAt8B5Gc/mqdefault.jpg",
      channel_id: "UCO_aKKYxn4tvrqPjcTzZ6EQ",
      published_at: "2021-08-27T18:16:59Z",
    },
    {
      video_id: "5h3qRSDWwS4",
      video_title: "【感謝】先程のASMR配信のスパチャお礼雑談🌸【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/5h3qRSDWwS4/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-08-24T15:59:51Z",
    },
    {
      video_id: "Sa9skWBlaqg",
      video_title: "【ASMR】ヤンデレホラー(?)♡重すぎる愛でドキドキゾクゾク【ホロライブ/夜空メル】",
      thumbnail_url: "https://i.ytimg.com/vi/Sa9skWBlaqg/mqdefault.jpg",
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      published_at: "2021-08-24T15:07:11Z",
    },
    {
      video_id: "kmpZGbncrsE",
      video_title:
        "【黒3Dio】オイルマッサージ＆耳かきASMR（Oil Massage/Ear Blowing）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/kmpZGbncrsE/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-08-18T14:23:31Z",
    },
    {
      video_id: "mhB4915XKJo",
      video_title: "#ぶるちゃまASMR【※刺激つよい】",
      thumbnail_url: "https://i.ytimg.com/vi/mhB4915XKJo/mqdefault.jpg",
      channel_id: "UC1CfXB_kRs3C-zaeTG3oGyg",
      published_at: "2021-08-18T11:17:30Z",
    },
    {
      video_id: "N7CDCGmz-vQ",
      video_title: "【ASMR TESTRUN】Let's try make some random noises!",
      thumbnail_url: "https://i.ytimg.com/vi/N7CDCGmz-vQ/mqdefault.jpg",
      channel_id: "UC8rcEBzJSleTkf_-agPM20g",
      published_at: "2021-08-17T17:28:11Z",
    },
    {
      video_id: "xd5p2MH1tiQ",
      video_title: "【ASMR】Whispering and Chatting in my Indoor Voice! #hololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/xd5p2MH1tiQ/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-08-08T15:07:18Z",
    },
    {
      video_id: "K_i9eLrPcso",
      video_title: "【ASMR】久しぶりに耳かきしよっか💜 / Ear cleaning【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/K_i9eLrPcso/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-08-03T11:23:29Z",
    },
    {
      video_id: "p4mWvZ9Pjzg",
      video_title: "【ASMR】月末定期ASMR放送：21.7月【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/p4mWvZ9Pjzg/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-07-31T10:25:11Z",
    },
    {
      video_id: "JwuBYQBphQc",
      video_title:
        "【ASMR？】ナイフで氷削ってかき氷にしようと目論む男【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/JwuBYQBphQc/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2021-07-30T08:16:50Z",
    },
    {
      video_id: "u66Mxi5sI58",
      video_title:
        "【ASMR】ゼロ距離で囁き💓お姉ちゃんと一緒におやすみしよ💤【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/u66Mxi5sI58/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-07-21T18:39:08Z",
    },
    {
      video_id: "IYgOiMVPDKI",
      video_title: "【ASMR】KU100初体験！ノエるしオフコラボinノエスタ【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/IYgOiMVPDKI/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-07-20T08:20:14Z",
    },
    {
      video_id: "8NUiwuHMU1k",
      video_title: "【CURSED ASMR】Do Not Watch This, Ears WILL Bleed. #hololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/8NUiwuHMU1k/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-07-17T05:13:49Z",
    },
    {
      video_id: "-zz-RtHpIaI",
      video_title: "【ASMR】🍑小声のねね🍑【桃鈴ねね/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/-zz-RtHpIaI/mqdefault.jpg",
      channel_id: "UCAWSyEs_Io8MtpY3m-zqILA",
      published_at: "2021-07-16T12:29:46Z",
    },
    {
      video_id: "1pkhXQkYXBE",
      video_title: "【ASMR】Summer is Here! Let's Cool Down and CHAT. #hololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/1pkhXQkYXBE/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-07-07T18:06:10Z",
    },
    {
      video_id: "Ye4bbOBlomw",
      video_title: "【ASMR】七夕に、甘々に癒します/音/囁き/色々【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/Ye4bbOBlomw/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-07-07T06:22:46Z",
    },
    {
      video_id: "VT3NT2LyKLQ",
      video_title: "【ASMR】月末定期お疲れ様会、睡眠導入ひそひそ❤【 ホロライブ/白上フブキ 】",
      thumbnail_url: "https://i.ytimg.com/vi/VT3NT2LyKLQ/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-06-30T12:37:56Z",
    },
    {
      video_id: "GbTdxtWMrsU",
      video_title:
        "【#生スバル】罰ゲーム！！！需要？！？知らねぇ！！！ガチASMR地獄配信！！！！：DEATH ASMR stream【】",
      thumbnail_url: "https://i.ytimg.com/vi/GbTdxtWMrsU/mqdefault.jpg",
      channel_id: "UCvzGlP9oQwU--Y0r9id_jnA",
      published_at: "2021-06-29T16:26:14Z",
    },
    {
      video_id: "IUf5j_4GpJg",
      video_title: "【ASMR】そろそろ部屋片付けないとやばい（）【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/IUf5j_4GpJg/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2021-06-29T12:28:10Z",
    },
    {
      video_id: "4oSpgjVH_kI",
      video_title:
        "【ASMR】深夜のバイノーラルマイク雑談💜 / Healing whispering【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/4oSpgjVH_kI/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-06-25T14:42:45Z",
    },
    {
      video_id: "ocrqWiWbB8g",
      video_title: "【ASMR】全力でお前達を寝かせるMR【影山シエン/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/ocrqWiWbB8g/mqdefault.jpg",
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      published_at: "2021-06-23T05:47:16Z",
    },
    {
      video_id: "0PLpEHHyVf8",
      video_title:
        "【ASMR】木のオルゴール/オルガニートゆっくり演奏Deep Sleep & relax【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/0PLpEHHyVf8/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-06-12T15:13:08Z",
    },
    {
      video_id: "nAAvsS7nyCs",
      video_title:
        "【ASMR/KU100】ウシ娘が日々お疲れな貴方を全力で癒します🍼【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/nAAvsS7nyCs/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-06-09T16:54:14Z",
    },
    {
      video_id: "HxhJIyWL9GU",
      video_title:
        "【ASMR】氷、炭酸、水の音で感じる涼しさでリラックス安眠Deep Sleep &relax&Get cool【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/HxhJIyWL9GU/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-06-08T13:04:38Z",
    },
    {
      video_id: "-SIWR61tlww",
      video_title: "【hololiveID】Working Mode : Typing Noise ASMR【Ayunda Risu】",
      thumbnail_url: "https://i.ytimg.com/vi/-SIWR61tlww/mqdefault.jpg",
      channel_id: "UCOyYb1c43VlX9rc_lT6NKQw",
      published_at: "2021-06-08T08:52:07Z",
    },
    {
      video_id: "xTXgCF-Ezyk",
      video_title:
        "【ASMR DRAWING】Matte Tablet Sketching and Chatting with my Indoor Voice! 8} #hololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/xTXgCF-Ezyk/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-06-06T16:40:44Z",
    },
    {
      video_id: "2Vhd3mdMcak",
      video_title:
        "【ASMR】今週お疲れ様！ってことで癒やしてあげマウス🐭【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/2Vhd3mdMcak/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2021-06-03T15:32:45Z",
    },
    {
      video_id: "Kjs3kobQBh0",
      video_title: "【ASMR】甘やかし彼女🌟耳かき/囁き/吐息【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/Kjs3kobQBh0/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-06-01T07:51:31Z",
    },
    {
      video_id: "4fuTbnIHJww",
      video_title: "【ASMR】月末定期お疲れ様会🎵デレ甘きぃーつね！？【 ホロライブ/白上フブキ 】",
      thumbnail_url: "https://i.ytimg.com/vi/4fuTbnIHJww/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-05-31T06:47:51Z",
    },
    {
      video_id: "BXZExVa8mWw",
      video_title:
        "【70000人記念】ASMR風 みんなが僕をほめて、僕がそれを読み上げます。【岸堂天真/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/BXZExVa8mWw/mqdefault.jpg",
      channel_id: "UCGNI4MENvnsymYjKiZwv9eg",
      published_at: "2021-05-30T09:39:59Z",
    },
    {
      video_id: "QIxo7Kz2Q3I",
      video_title: "【ASMR…？】🍑眠いねねの小声雑談🍑【桃鈴ねね/ ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/QIxo7Kz2Q3I/mqdefault.jpg",
      channel_id: "UCAWSyEs_Io8MtpY3m-zqILA",
      published_at: "2021-05-29T11:59:07Z",
    },
    {
      video_id: "IzwtEMd6LF8",
      video_title: "【ASMR】さあさあ耳を出したまえよ～～👂【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/IzwtEMd6LF8/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-05-27T18:22:29Z",
    },
    {
      video_id: "TdSXrE2f-_g",
      video_title:
        "【ASMR】睡眠導入♡癒しのオイル（囁き/耳かき/オイルマッサージ）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/TdSXrE2f-_g/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-05-26T08:27:09Z",
    },
    {
      video_id: "_MOxKjYuO4c",
      video_title: "【ASMR解禁！】涼しさを感じる音と耳かきでリラックス安眠【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/_MOxKjYuO4c/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-05-23T13:06:33Z",
    },
    {
      video_id: "FkkRgtfhAGM",
      video_title:
        "【ASMR/黒3Dio】あなたを全肯定♡睡眠導入に…（囁き/オイルマッサージ/炭酸泡/心音）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/FkkRgtfhAGM/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-05-09T02:56:33Z",
    },
    {
      video_id: "lBXZJTNkyjQ",
      video_title: "【ASMR/heartbeat】妖怪心音聞かせBBA【hololive/宝鐘マリン】",
      thumbnail_url: "https://i.ytimg.com/vi/lBXZJTNkyjQ/mqdefault.jpg",
      channel_id: "UCCzUftO8KOVkV4wQG1vkUvg",
      published_at: "2021-05-08T11:51:51Z",
    },
    {
      video_id: "9oZGgUWw0e0",
      video_title:
        "【 ASMR | お家3D 】笑ってはいけないさくらみこのＡＳＭＲ【ホロライブ/さくらみこ】",
      thumbnail_url: "https://i.ytimg.com/vi/9oZGgUWw0e0/mqdefault.jpg",
      channel_id: "UC-hM6YJuNYVAmUWxeIr9FeA",
      published_at: "2021-05-04T17:02:02Z",
    },
    {
      video_id: "HRchPCP_wtM",
      video_title: "【ASMR】Kalimbaで即興歌【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/HRchPCP_wtM/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2021-05-03T06:23:54Z",
    },
    {
      video_id: "JEuHRZX-Gbo",
      video_title: "【ASMR】ねぇ、ボクで安眠してよ​u v u？囁き子守歌ASMR【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/JEuHRZX-Gbo/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2021-05-02T03:18:42Z",
    },
    {
      video_id: "n4IEzNdzH2s",
      video_title: "【ASMR】おやすみ前の癒しの耳かき/囁き【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/n4IEzNdzH2s/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-05-01T09:48:35Z",
    },
    {
      video_id: "sHVtY_C6Vh0",
      video_title: "【ASMR】月末定期お疲れ様会！バイノーラルで囁き【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/sHVtY_C6Vh0/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-04-30T11:20:47Z",
    },
    {
      video_id: "Qj5XO2TEa2U",
      video_title:
        "【ASMR DRAWING】Sketching ASMR on my Matte Tablet! Featuring... Cute Girls! #hololiveEnglish #holoMyth",
      thumbnail_url: "https://i.ytimg.com/vi/Qj5XO2TEa2U/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-04-29T15:34:36Z",
    },
    {
      video_id: "tLKGN2wuHas",
      video_title:
        "【ASMR】永遠全体公開💙ささやき💙いちゃいちゃ💙みみかき(Whispering&Relaxing)【尾丸ポルカ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/tLKGN2wuHas/mqdefault.jpg",
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      published_at: "2021-04-29T11:23:39Z",
    },
    {
      video_id: "5NkvKLnqLIY",
      video_title: "【ASMR】添い寝しながら雑談してみる【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/5NkvKLnqLIY/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2021-04-27T12:22:09Z",
    },
    {
      video_id: "58wRREr9fz4",
      video_title: "【ASMR】癒し音色カリンバで睡眠導入 Healing Kalimba【Hololive/Akirose】",
      thumbnail_url: "https://i.ytimg.com/vi/58wRREr9fz4/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-04-26T15:40:13Z",
    },
    {
      video_id: "AjsSR6OL-lU",
      video_title: "【ASMR】今月も君の耳をチェックします👂/ Ear Cleaning【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/AjsSR6OL-lU/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-04-21T14:37:14Z",
    },
    {
      video_id: "1kznWD5aiFk",
      video_title:
        "【銃メンテASMR】いい重さだ、手になじむ-M1911A1 ガスガン-【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/1kznWD5aiFk/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2021-04-17T07:08:06Z",
    },
    {
      video_id: "yEeFOaBiiSo",
      video_title:
        "#02【#ノエスタdeASMR講座​】講座という名の癒し空間❄二人のママが貴方のお耳で実験します🎶(KU100使用／オフコラボ)【白銀ノエル/雪花ラミィ】",
      thumbnail_url: "https://i.ytimg.com/vi/yEeFOaBiiSo/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-04-17T03:22:39Z",
    },
    {
      video_id: "S14PPvor_Rk",
      video_title:
        "【ASMR】寝る前に耳かき＆マッサージはいかがですか？（Oil Massage/Ear Blowing）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/S14PPvor_Rk/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-04-16T13:23:05Z",
    },
    {
      video_id: "IeI0NToU3Ig",
      video_title: "【ASMR 】FUBUKI Voice＆Slime Sounds【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/IeI0NToU3Ig/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-04-10T10:03:32Z",
    },
    {
      video_id: "bn_DydG7B0k",
      video_title:
        "【COMFY ASMR】Gentle Chats and Ear Pats! ...Comfy-ness Pending #holoMyth #hololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/bn_DydG7B0k/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-04-09T04:07:26Z",
    },
    {
      video_id: "jDVDB22OVyI",
      video_title:
        "#01【#ノエスタdeASMR講座】春の新企画🌸脳筋女騎士が天使にASMRを伝授しまっする💪✨(KU100使用／オフコラボ)【白銀ノエル/天音かなた】",
      thumbnail_url: "https://i.ytimg.com/vi/jDVDB22OVyI/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-04-07T00:53:21Z",
    },
    {
      video_id: "cPu62XQMFus",
      video_title:
        "【ASMR／KU100】NEW!! 新機材導入🌸春の癒しお耳掃除(Ear cleaning, Sleep, Relax...)【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/cPu62XQMFus/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-04-06T03:56:07Z",
    },
    {
      video_id: "1v-xxcuIUCc",
      video_title:
        "【ASMR】全肯定囁き♡マッサージ＆耳かき（Oil Massage/Ear Blowing）【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/1v-xxcuIUCc/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-04-03T04:02:15Z",
    },
    {
      video_id: "EnDjdI4SKWM",
      video_title: "●⚫︎お礼枠⚫︎●モンハン〜ASMRのスパチャ感謝💝【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/EnDjdI4SKWM/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-04-02T15:55:38Z",
    },
    {
      video_id: "4cJ3qAjwq94",
      video_title: "【ASMR】優しく囁きながら耳かき（NEW機材）【潤羽るしあ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/4cJ3qAjwq94/mqdefault.jpg",
      channel_id: "UCl_gCybOJRIgOXw6Qb4qJzQ",
      published_at: "2021-04-02T09:09:54Z",
    },
    {
      video_id: "wj-BLUcP9lU",
      video_title:
        "【ASMR】別に君をDokiDokiさせちゃってもいいのだろう？【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/wj-BLUcP9lU/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2021-03-25T12:47:19Z",
    },
    {
      video_id: "pvvUD3hpqOQ",
      video_title: "Sample ASMR/We'll do it again soon!",
      thumbnail_url: "https://i.ytimg.com/vi/pvvUD3hpqOQ/mqdefault.jpg",
      channel_id: "UCZlDXzGoo7d44bwdNObFacg",
      published_at: "2021-03-16T16:18:27Z",
    },
    {
      video_id: "zmEKY3vv0oY",
      video_title: "【KU100】寝る前生活音♡ASMR【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/zmEKY3vv0oY/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-03-15T08:44:48Z",
    },
    {
      video_id: "ZJyCg6kko64",
      video_title: "【ASMR】ホワイトデー♥ゼロ距離どきどき耳かきetc【ホロライブ/夜空メル】",
      thumbnail_url: "https://i.ytimg.com/vi/ZJyCg6kko64/mqdefault.jpg",
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      published_at: "2021-03-14T13:09:10Z",
    },
    {
      video_id: "84ro5HqX_ag",
      video_title:
        "【ASMR/黒3Dio】耳かき中心ASMR♡Sleep & Relax/Ear Blowing【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/84ro5HqX_ag/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-03-12T15:24:09Z",
    },
    {
      video_id: "4W2Ulbis_SE",
      video_title: "【HOTEL ASMR】Psst...c'mere(super scuffed)",
      thumbnail_url: "https://i.ytimg.com/vi/4W2Ulbis_SE/mqdefault.jpg",
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      published_at: "2021-03-12T08:17:14Z",
    },
    {
      video_id: "rqZCvizEPFU",
      video_title: "【KU100】朝の生活音ASMR雑談【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/rqZCvizEPFU/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-03-08T16:55:04Z",
    },
    {
      video_id: "3bOMZCmCB0U",
      video_title: "【ASMR】イタリア式ピザ作りASMR【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/3bOMZCmCB0U/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2021-03-08T15:31:39Z",
    },
    {
      video_id: "UZWFz9xgx90",
      video_title: "【ASMR】寝る前に耳かきしよっか🌠/ Ear Cleaning【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/UZWFz9xgx90/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-03-08T00:40:47Z",
    },
    {
      video_id: "-DfLdsEHL_U",
      video_title: "【ASMR】天才騎士考案の究極ASMR びゅんびゅんゴマASMR【岸堂天真/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/-DfLdsEHL_U/mqdefault.jpg",
      channel_id: "UCGNI4MENvnsymYjKiZwv9eg",
      published_at: "2021-03-05T10:28:58Z",
    },
    {
      video_id: "z6j6eFKJBvs",
      video_title:
        "【ASMR/KU100】耳の日👂全力で貴方のお耳をあまあま癒します💓Mama Relax Whisper.Ear Cleaning.Ear Massage.【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/z6j6eFKJBvs/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2021-03-03T11:49:14Z",
    },
    {
      video_id: "xJCAF1riBnY",
      video_title: "【ASMR】月末定期添い寝放送：2021.２月【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/xJCAF1riBnY/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-02-27T15:51:56Z",
    },
    {
      video_id: "0JnWq9nvT-M",
      video_title: "【ASMR】カップ麺ASMRで癒しのひと時を。【岸堂天真/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/0JnWq9nvT-M/mqdefault.jpg",
      channel_id: "UCGNI4MENvnsymYjKiZwv9eg",
      published_at: "2021-02-24T10:06:16Z",
    },
    {
      video_id: "w8znycDFPtU",
      video_title: "【KU100】寝起きASMR雑談｜生活音多め【雪花ラミィ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/w8znycDFPtU/mqdefault.jpg",
      channel_id: "UCFKOVgVbGmX65RxO3EtH3iw",
      published_at: "2021-02-21T15:16:19Z",
    },
    {
      video_id: "DBPHSfqKOb4",
      video_title: "【ASMR】人生で初めてのASMR ~自室の騒音を添えて~【岸堂天真/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/DBPHSfqKOb4/mqdefault.jpg",
      channel_id: "UCGNI4MENvnsymYjKiZwv9eg",
      published_at: "2021-02-18T16:17:10Z",
    },
    {
      video_id: "QQKLdyO7KbA",
      video_title: "【ASMRあり！？】Happy Valentine💓【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/QQKLdyO7KbA/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-02-14T15:26:53Z",
    },
    {
      video_id: "3gOhLstrTvs",
      video_title: "【#生スバル】ライブ直前！？DEATHルーレットASMR💛【ホロライブ/大空スバル】",
      thumbnail_url: "https://i.ytimg.com/vi/3gOhLstrTvs/mqdefault.jpg",
      channel_id: "UCvzGlP9oQwU--Y0r9id_jnA",
      published_at: "2021-02-14T14:56:51Z",
    },
    {
      video_id: "oaScgaeWthg",
      video_title: "【ASMR】雨音と一緒に耳かき☔/Ear Cleaning【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/oaScgaeWthg/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-02-10T10:32:11Z",
    },
    {
      video_id: "HRx3ZL__UiI",
      video_title: "【ASMR/工業・日常系】FIT BOX開封&組み立て！【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/HRx3ZL__UiI/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-02-03T13:28:13Z",
    },
    {
      video_id: "sDn6ltLAkaw",
      video_title: "【#フブキch】月末定期台詞放送～耳かきASMR～　21/1月【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/sDn6ltLAkaw/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2021-02-01T10:38:02Z",
    },
    {
      video_id: "WP5NtMMLXBk",
      video_title: "【ASMR】スライムが届いたので作ってみる!!【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/WP5NtMMLXBk/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2021-01-31T07:35:34Z",
    },
    {
      video_id: "JFVtF9qVEdI",
      video_title: "【ASMR】癒しの音色カリンバで子守歌 Healing  Kalimba【Hololive/Akirose】",
      thumbnail_url: "https://i.ytimg.com/vi/JFVtF9qVEdI/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2021-01-22T13:25:48Z",
    },
    {
      video_id: "EgOYVKiWQjc",
      video_title: "【ASMR STORY TIME】Let's Read Something! #HoloMyth #HololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/EgOYVKiWQjc/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-01-21T09:12:57Z",
    },
    {
      video_id: "t0mp1tsblEM",
      video_title: "ioMama ASMR , Humming and Head Pat",
      thumbnail_url: "https://i.ytimg.com/vi/t0mp1tsblEM/mqdefault.jpg",
      channel_id: "UCAoy6rzhSf4ydcYjJw3WoVg",
      published_at: "2021-01-18T10:20:51Z",
    },
    {
      video_id: "nWTgS3JFVkk",
      video_title: "【ASMR】はじめての梵天耳かき！/Ear Cleaning【猫又おかゆ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/nWTgS3JFVkk/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2021-01-16T10:25:31Z",
    },
    {
      video_id: "ENMA8IybMAI",
      video_title: "【ASMR MIC】It's Working! Lend Me Your Ears! #HoloMyth #HololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/ENMA8IybMAI/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-01-14T04:01:39Z",
    },
    {
      video_id: "FmO_Ht7edGw",
      video_title: "【Minecraft】KU100でgood sleep💤深夜のマイクラASMR【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/FmO_Ht7edGw/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2021-01-05T10:45:34Z",
    },
    {
      video_id: "3e49Yh0rgIM",
      video_title: "【SCUFFED ASMR MIC】...Left? Left? Left? ...RIGHT? #HoloMyth #HololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/3e49Yh0rgIM/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2021-01-02T15:24:52Z",
    },
    {
      video_id: "o6lnSnqn3Uc",
      video_title: "[LET'S COOK] ...MEATLOAF... asmr",
      thumbnail_url: "https://i.ytimg.com/vi/o6lnSnqn3Uc/mqdefault.jpg",
      channel_id: "UCoSrY_IQQVpmIRZ9Xf-y93g",
      published_at: "2021-01-02T01:32:38Z",
    },
    {
      video_id: "oBh6nxIeF4Q",
      video_title: "【再現MMD/ASMR】歯磨き dentifrice 치약　お試し【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/oBh6nxIeF4Q/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-12-30T18:37:13Z",
    },
    {
      video_id: "wAH7Tu9gMgM",
      video_title: "【ASMR】眠れない人向け/耳元でお話♡【ホロライブ/夜空メル】",
      thumbnail_url: "https://i.ytimg.com/vi/wAH7Tu9gMgM/mqdefault.jpg",
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      published_at: "2020-12-28T13:10:19Z",
    },
    {
      video_id: "9-eLr4F5EYc",
      video_title: "【ASMR】初めてのカリンバ！癒されて眠ろう【Hololive/Akirose】",
      thumbnail_url: "https://i.ytimg.com/vi/9-eLr4F5EYc/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2020-12-25T13:17:40Z",
    },
    {
      video_id: "m9DiiGVyL3U",
      video_title: "【ASMR】Merry Christmas~",
      thumbnail_url: "https://i.ytimg.com/vi/m9DiiGVyL3U/mqdefault.jpg",
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      published_at: "2020-12-25T03:00:45Z",
    },
    {
      video_id: "2cV3VVqAsIo",
      video_title: "【hololiveID】BELL ASMR FOR YOUR SOUL !!! (NOT SCAM!)【Ayunda Risu】",
      thumbnail_url: "https://i.ytimg.com/vi/2cV3VVqAsIo/mqdefault.jpg",
      channel_id: "UCOyYb1c43VlX9rc_lT6NKQw",
      published_at: "2020-12-24T15:53:04Z",
    },
    {
      video_id: "QZa0fGzor10",
      video_title: "ノエルの日🎄Noel DAY Mary(Merry) Xmas ASMR (？)",
      thumbnail_url: "https://i.ytimg.com/vi/QZa0fGzor10/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2020-12-24T12:42:43Z",
    },
    {
      video_id: "so83sD34gzU",
      video_title: "【ASMR】クリスマスイブに一人でセリフを読む。【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/so83sD34gzU/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-12-24T09:31:59Z",
    },
    {
      video_id: "8TwC4ynM4VM",
      video_title:
        "【SLEEPY ASMR雑談】Cozy Chit-Chat with my Dead Beats... #HoloMyth #HololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/8TwC4ynM4VM/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2020-12-23T04:32:22Z",
    },
    {
      video_id: "WR3zase3TWM",
      video_title: "【ガンプラASMR】RGシャア専用ザクを組み立てます【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/WR3zase3TWM/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-12-16T09:42:30Z",
    },
    {
      video_id: "D_STZVLfEFY",
      video_title: "【#謎肉牛丼ASMR】アフタートークと謎肉牛丼ASMR配信します！",
      thumbnail_url: "https://i.ytimg.com/vi/D_STZVLfEFY/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2020-12-11T04:08:24Z",
    },
    {
      video_id: "cgpZHuOFZ10",
      video_title:
        "【SLEEPY ASMR(?)雑談】Talking (SOFTLY) With the Dead Beats! #HoloMyth #HololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/cgpZHuOFZ10/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2020-12-10T01:41:04Z",
    },
    {
      video_id: "cOgynhXPKKw",
      video_title: "【ASMR】Goodnight ASMR ~",
      thumbnail_url: "https://i.ytimg.com/vi/cOgynhXPKKw/mqdefault.jpg",
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      published_at: "2020-12-04T23:11:31Z",
    },
    {
      video_id: "e4Tl8BFPmmI",
      video_title: "【Titanfall 2】Titanfall 2 ASMR",
      thumbnail_url: "https://i.ytimg.com/vi/e4Tl8BFPmmI/mqdefault.jpg",
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      published_at: "2020-11-29T19:39:13Z",
    },
    {
      video_id: "E-DIUvNNJDA",
      video_title:
        "【お知らせあり】～四万人記念　電撃台詞読みASMR　Electric shock dialogue reading ASMR～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/E-DIUvNNJDA/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-11-29T05:24:22Z",
    },
    {
      video_id: "4qpG26i0eHE",
      video_title: "【ASMR】ガブリゲーターをよみがえらせる【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/4qpG26i0eHE/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-11-25T19:43:09Z",
    },
    {
      video_id: "C81s4SkirUU",
      video_title: "【ASMR】隣は昼にささやく人ぞ(Whisper)【ホロライブ/尾丸ポルカ】",
      thumbnail_url: "https://i.ytimg.com/vi/C81s4SkirUU/mqdefault.jpg",
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      published_at: "2020-11-25T02:14:00Z",
    },
    {
      video_id: "icXAi_uCow8",
      video_title:
        "【ASMR】50万人ありがとう♥立体音響スパチャ読み/Whispering&Massage🎶【天音かなた/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/icXAi_uCow8/mqdefault.jpg",
      channel_id: "UCZlDXzGoo7d44bwdNObFacg",
      published_at: "2020-11-24T11:58:10Z",
    },
    {
      video_id: "j5Pgt7_dgG4",
      video_title:
        "【 #銃メンテASMR 】珍しい銃が手に入ったぞ！-フリントロックピストル編- 【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/j5Pgt7_dgG4/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-11-20T18:06:37Z",
    },
    {
      video_id: "5LG8pxP0pkQ",
      video_title:
        "【ASMR/KU100】ARA ARA♡ネタ要素多めのお姉さんがお耳を癒します(？)♡Whispering/EarCleaning＆Massage【白銀ノエル/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/5LG8pxP0pkQ/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2020-11-20T04:21:51Z",
    },
    {
      video_id: "df3foPky_iE",
      video_title:
        "【LATE NIGHT雑談】Sleepy Reaper ASMR (?) and Free Talk! #HoloMyth #HololiveEnglish",
      thumbnail_url: "https://i.ytimg.com/vi/df3foPky_iE/mqdefault.jpg",
      channel_id: "UCL_qhgtOy0dy1Agp8vkySQg",
      published_at: "2020-11-16T07:02:30Z",
    },
    {
      video_id: "_7vOimsaTWI",
      video_title: "【360度動画】悪魔の保健医と保健室で…。【ホロライブ/癒月ちょこ】",
      thumbnail_url: "https://i.ytimg.com/vi/_7vOimsaTWI/mqdefault.jpg",
      channel_id: "UCp3tgHXw_HI0QMk1K8qh3gQ",
      published_at: "2020-11-10T12:01:01Z",
    },
    {
      video_id: "XdGuDXPMWJw",
      video_title: "【ASMR/バイノーラル】月末定期台詞放送：10月.2020【ホロライブ/白上フブキ】",
      thumbnail_url: "https://i.ytimg.com/vi/XdGuDXPMWJw/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-10-31T09:47:17Z",
    },
    {
      video_id: "4oots7jSUSM",
      video_title:
        "【ASMR】永遠に全体公開できる健全なささやき(Whispering)【ホロライブ/尾丸ポルカ】",
      thumbnail_url: "https://i.ytimg.com/vi/4oots7jSUSM/mqdefault.jpg",
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      published_at: "2020-10-26T11:37:01Z",
    },
    {
      video_id: "H1uP9mwt9OA",
      video_title: "【ASMR】ご飯食べたり、歯磨きしたり、寝たり・【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/H1uP9mwt9OA/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-10-25T10:13:05Z",
    },
    {
      video_id: "LxvhVzFBU_s",
      video_title:
        "【再現MMD/ASMR】りんご飴咀嚼 Candy apple chewing 사과 사탕 씹는　お試し【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/LxvhVzFBU_s/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-10-24T00:15:43Z",
    },
    {
      video_id: "Q9iJKmQvR18",
      video_title:
        "枠バグ😫【#ノエちょこ】お泊りASMR♡あまあまな時間🌸KU100使用。【白銀ノエル/癒月ちょこ】",
      thumbnail_url: "https://i.ytimg.com/vi/Q9iJKmQvR18/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2020-10-23T15:45:38Z",
    },
    {
      video_id: "PH-gVxC9uwg",
      video_title: "Anime Girl Sleeping ASMR",
      thumbnail_url: "https://i.ytimg.com/vi/PH-gVxC9uwg/mqdefault.jpg",
      channel_id: "UCAoy6rzhSf4ydcYjJw3WoVg",
      published_at: "2020-10-16T16:29:14Z",
    },
    {
      video_id: "ityXhXCA0FY",
      video_title:
        "【ASMR】～ボトルマン組み立てASMR　Bottleman　Assemble Autonomous Sensory Meridian Resp～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/ityXhXCA0FY/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-10-15T08:00:21Z",
    },
    {
      video_id: "jOTKDDTGaqI",
      video_title: "【子守唄ASMR】今日は早く寝よう /softly song Japanese【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/jOTKDDTGaqI/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2020-10-13T09:31:27Z",
    },
    {
      video_id: "ktbyT8IADAc",
      video_title:
        "【ASMR】～筋トレセリフ読みASMR　Muscle training Dialogue reading Autonomous Sensory Meridian Resp～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/ktbyT8IADAc/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-10-13T03:47:36Z",
    },
    {
      video_id: "96sBSzSp19o",
      video_title: "【ASMR耳元雑談】新作歌ってみた同時視聴！【Hololive/Akirose】",
      thumbnail_url: "https://i.ytimg.com/vi/96sBSzSp19o/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2020-10-11T02:07:41Z",
    },
    {
      video_id: "Pak5J1sk6fc",
      video_title: "【ASMR】Japanese Snacks!",
      thumbnail_url: "https://i.ytimg.com/vi/Pak5J1sk6fc/mqdefault.jpg",
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      published_at: "2020-10-10T00:11:34Z",
    },
    {
      video_id: "L6EcpicXa7g",
      video_title: "【ASMR】全体公開💖ささやき💖メン限サンプル動画【ホロライブ/尾丸ポルカ】",
      thumbnail_url: "https://i.ytimg.com/vi/L6EcpicXa7g/mqdefault.jpg",
      channel_id: "UCK9V2B22uJYu3N7eR_BT9QA",
      published_at: "2020-10-07T12:29:54Z",
    },
    {
      video_id: "NQaDhP4mFIc",
      video_title: "【ASMR】そろそろ慣れてきたと思われるセリフ読み。【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/NQaDhP4mFIc/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-10-04T18:29:46Z",
    },
    {
      video_id: "doFzL0hJx4w",
      video_title:
        "【#ノエマリASMR】お昼の咀嚼音雑談/Eating Sound【ホロライブ/宝鐘マリン・白銀ノエル】",
      thumbnail_url: "https://i.ytimg.com/vi/doFzL0hJx4w/mqdefault.jpg",
      channel_id: "UCCzUftO8KOVkV4wQG1vkUvg",
      published_at: "2020-10-01T00:35:03Z",
    },
    {
      video_id: "_gb44X05LsU",
      video_title:
        "【#ノエマリASMR】お泊りオフコラボ🌸団長が船長にASMRを伝授しまっする💪✨(KU100＆ダミヘ使用)【白銀ノエル/宝鐘マリン】",
      thumbnail_url: "https://i.ytimg.com/vi/_gb44X05LsU/mqdefault.jpg",
      channel_id: "UCdyqAaZDKHXg4Ahi7VENThQ",
      published_at: "2020-09-30T02:35:02Z",
    },
    {
      video_id: "rwAqNY3mV_o",
      video_title:
        "【ASMR】快眠したい方向け～お耳みせてくれる？？囁き・耳かきetc【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/rwAqNY3mV_o/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-09-26T03:56:14Z",
    },
    {
      video_id: "vckOfHMj0ao",
      video_title: "【ASMR】Goodnight &  Thank You",
      thumbnail_url: "https://i.ytimg.com/vi/vckOfHMj0ao/mqdefault.jpg",
      channel_id: "UCyl1z3jo3XHR1riLFKG5UAg",
      published_at: "2020-09-18T02:36:39Z",
    },
    {
      video_id: "QYntyg0bPS4",
      video_title: "【ASMR】恥ずかしがらずにセリフを言う練習したい【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/QYntyg0bPS4/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-09-14T07:30:02Z",
    },
    {
      video_id: "BsgUTJDCkmU",
      video_title:
        "【ASMR】ドキドキする？お耳の近くで言ってもらいたい台詞…教えて？【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/BsgUTJDCkmU/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-09-13T14:12:59Z",
    },
    {
      video_id: "dCqobVhFdAo",
      video_title: "【ASMR】PC不調の舞、謎ASMR現る【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/dCqobVhFdAo/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-09-13T05:47:41Z",
    },
    {
      video_id: "vEtuaZ-ZZbU",
      video_title: "【ASMR】～低周波マッサージASMR～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/vEtuaZ-ZZbU/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-09-08T11:16:16Z",
    },
    {
      video_id: "qU93v_VrY34",
      video_title: "【 #銃メンテASMR 】珍銃？COP357をいじり回す【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/qU93v_VrY34/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-09-04T00:22:05Z",
    },
    {
      video_id: "mv2fdB8Ej20",
      video_title:
        "【検証/ASMR】早口言葉は電撃を耐えられながらどこまで続けられるのか【アルランディス/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/mv2fdB8Ej20/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-09-01T14:12:17Z",
    },
    {
      video_id: "n6cC2AEeGuc",
      video_title: "【ASMR】月曜お疲れ様、ASMR用意しといたぞ【影山シエン/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/n6cC2AEeGuc/mqdefault.jpg",
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      published_at: "2020-08-31T12:10:24Z",
    },
    {
      video_id: "SutLLTyxAFI",
      video_title:
        "【ASMR】声を聴いて睡眠したい方向け💕ねぇ…ボクに何してほしいの？？囁き・耳かきetc【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/SutLLTyxAFI/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-08-29T09:05:21Z",
    },
    {
      video_id: "x6BADIKzxB0",
      video_title: "【ASMR】マシュマロに来たセリフを真剣に読む!!【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/x6BADIKzxB0/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-08-26T10:29:16Z",
    },
    {
      video_id: "TTBz820stS0",
      video_title:
        "【ASMR】安眠したい方用💓耳かき・囁きでりらっくす…すぴー(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/TTBz820stS0/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-08-21T14:25:39Z",
    },
    {
      video_id: "w36-lIBtCLg",
      video_title: "【ASMR】おやすみ前の耳かき / Ear cleaning【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/w36-lIBtCLg/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2020-08-09T14:23:06Z",
    },
    {
      video_id: "mXOF0_qy8vI",
      video_title: "【#お泊まり同居ーず】★ASMR女子会★【ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/mXOF0_qy8vI/mqdefault.jpg",
      channel_id: "UCZlDXzGoo7d44bwdNObFacg",
      published_at: "2020-07-31T12:40:09Z",
    },
    {
      video_id: "XrT9gumSqrM",
      video_title: "月末定期台詞放送2020.7月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/XrT9gumSqrM/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-07-31T07:02:40Z",
    },
    {
      video_id: "GuA6SfzFXfY",
      video_title: "【ASMR】Y.O.U and I【hololive-ID】",
      thumbnail_url: "https://i.ytimg.com/vi/GuA6SfzFXfY/mqdefault.jpg",
      channel_id: "UCAoy6rzhSf4ydcYjJw3WoVg",
      published_at: "2020-07-28T12:41:02Z",
    },
    {
      video_id: "WaHE-1MZRkw",
      video_title: "【ASMR】～深夜の珈琲ASMR～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/WaHE-1MZRkw/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-07-19T13:06:47Z",
    },
    {
      video_id: "-vztcN_y5Nw",
      video_title: "【ASMR】ガチのマジでスタンダードなASMR【ホロスターズ/影山シエン】",
      thumbnail_url: "https://i.ytimg.com/vi/-vztcN_y5Nw/mqdefault.jpg",
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      published_at: "2020-07-13T09:36:04Z",
    },
    {
      video_id: "6JWt-YVwz1o",
      video_title: "【七夕企画】おそうめんASMRで涼をとっちゃうのら✨【姫森ルーナ/ホロライブ】",
      thumbnail_url: "https://i.ytimg.com/vi/6JWt-YVwz1o/mqdefault.jpg",
      channel_id: "UCa9Y57gfeY0Zro_noHRVrnw",
      published_at: "2020-07-07T05:43:08Z",
    },
    {
      video_id: "VbtBt7okihM",
      video_title: "復活！！そうめんちゅるちゅるASMR【バイノーラルマイク/大神ミオ】",
      thumbnail_url: "https://i.ytimg.com/vi/VbtBt7okihM/mqdefault.jpg",
      channel_id: "UCp-5t9SrOQwXMU7iIjQfARg",
      published_at: "2020-07-01T10:58:29Z",
    },
    {
      video_id: "UaOpjVpj0QE",
      video_title: "月末定期台詞放送2020.6月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/UaOpjVpj0QE/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-06-30T10:30:10Z",
    },
    {
      video_id: "E5-YwGPoWmc",
      video_title:
        "【 #アランストリーム 】オレのリロードは革命(レボリューション)だ！！！-ASMR-【ホロスターズ/アルランディス】",
      thumbnail_url: "https://i.ytimg.com/vi/E5-YwGPoWmc/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-06-21T14:57:13Z",
    },
    {
      video_id: "0UuPPbCKHAo",
      video_title: "【ASMR】マフィアのボスVS低周波マッサージ機【ホロスターズ/影山シエン】",
      thumbnail_url: "https://i.ytimg.com/vi/0UuPPbCKHAo/mqdefault.jpg",
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      published_at: "2020-06-17T18:04:08Z",
    },
    {
      video_id: "wrHd59oYEg8",
      video_title: "【ASMR MMD】ASMRでワニワニパニックチャレンジ！！！【忙しい人向け】",
      thumbnail_url: "https://i.ytimg.com/vi/wrHd59oYEg8/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-06-17T15:29:13Z",
    },
    {
      video_id: "YpAbXiTdnuQ",
      video_title: "【ASMR/バイノーラル】腹筋してるだけなんです。【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/YpAbXiTdnuQ/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-06-12T22:34:14Z",
    },
    {
      video_id: "4UkajKENCqs",
      video_title: "【ASMR】耳かきするよ！ポリポリ / Ear cleaning【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/4UkajKENCqs/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2020-06-09T08:12:08Z",
    },
    {
      video_id: "YqSCNmGeg7o",
      video_title: "【ASMR】～魔界の子守唄ASMR～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/YqSCNmGeg7o/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-06-04T11:49:43Z",
    },
    {
      video_id: "vJfDkOyNBn0",
      video_title: "月末定期台詞放送2020.5月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/vJfDkOyNBn0/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-05-30T20:10:20Z",
    },
    {
      video_id: "kUAXDPGalq0",
      video_title:
        "【 #アランストリーム 】俺の愛銃のメンテナンスをあなたの耳元で-ASMR-【ホロスターズ/アルランディス】",
      thumbnail_url: "https://i.ytimg.com/vi/kUAXDPGalq0/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-05-30T16:46:37Z",
    },
    {
      video_id: "ExXqjCCEb9s",
      video_title:
        "【 #アランストリーム 】変な形のマイク拾った-ASMRテスト-【ホロスターズ/アルランディス】",
      thumbnail_url: "https://i.ytimg.com/vi/ExXqjCCEb9s/mqdefault.jpg",
      channel_id: "UCKeAhJvy8zgXWbh9duVjIaQ",
      published_at: "2020-05-30T11:33:48Z",
    },
    {
      video_id: "yfshLLKzWew",
      video_title: "【笛】～深夜に魔笛の音色を聴かせるだけの笛ASMR～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/yfshLLKzWew/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-05-28T14:21:05Z",
    },
    {
      video_id: "qLpYkpAXMbQ",
      video_title: "【ASMR】タロットカードでスピリチュアルの音～【大神ミオ】",
      thumbnail_url: "https://i.ytimg.com/vi/qLpYkpAXMbQ/mqdefault.jpg",
      channel_id: "UCp-5t9SrOQwXMU7iIjQfARg",
      published_at: "2020-05-28T04:18:12Z",
    },
    {
      video_id: "Yn8yv_tIrL4",
      video_title:
        "【ASMR】高音質でワニワニぼっちパニック🐊勝てばご褒美もぐもぐ💓【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/Yn8yv_tIrL4/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-05-27T23:52:07Z",
    },
    {
      video_id: "hDgAJcMH89A",
      video_title: "【練習】～アイツらがASMRやるから俺も練習する枠～【荒咬オウガ/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/hDgAJcMH89A/mqdefault.jpg",
      channel_id: "UCwL7dgTxKo8Y4RFIKWaf8gA",
      published_at: "2020-05-27T16:14:16Z",
    },
    {
      video_id: "S0uPYha2U-Q",
      video_title: "【ASMR】耳元で宝具ぶっぱ、されたくない？【ホロスターズ/影山シエン】",
      thumbnail_url: "https://i.ytimg.com/vi/S0uPYha2U-Q/mqdefault.jpg",
      channel_id: "UChSvpZYRPh0FvG4SJGSga3g",
      published_at: "2020-05-27T09:32:23Z",
    },
    {
      video_id: "29LXHtztQiU",
      video_title: "【スライムASMR】YoutubeのAIはとても優秀です。【ホロスターズ/アステル】",
      thumbnail_url: "https://i.ytimg.com/vi/29LXHtztQiU/mqdefault.jpg",
      channel_id: "UCNVEsYbiZjH5QLmGeSgTSzg",
      published_at: "2020-05-27T09:05:54Z",
    },
    {
      video_id: "KyJC2dlio4o",
      video_title: "月末定期台詞放送2020.4月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/KyJC2dlio4o/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-04-29T23:10:23Z",
    },
    {
      video_id: "5yadaxUj2qk",
      video_title:
        "【ASMR】１９万人記念！NEW IFでのASMR…囁いてもいいですか？【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/5yadaxUj2qk/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-04-24T18:09:13Z",
    },
    {
      video_id: "3DlVw1AQaOI",
      video_title: "【ASMR】初めてのASMRなので優しくしてください【花咲みやび/ホロスターズ】",
      thumbnail_url: "https://i.ytimg.com/vi/3DlVw1AQaOI/mqdefault.jpg",
      channel_id: "UC6t3-_N8A6ME1JShZHHqOMw",
      published_at: "2020-04-02T03:24:36Z",
    },
    {
      video_id: "z0mEbKMsSuE",
      video_title: "月末定期台詞放送2020.3月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/z0mEbKMsSuE/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-03-30T13:55:16Z",
    },
    {
      video_id: "djk0sAsGE7A",
      video_title: "【ASMR】ほろ酔い耳かきしちゃうよ/Ear Cleaning【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/djk0sAsGE7A/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2020-03-22T12:10:04Z",
    },
    {
      video_id: "u8geC33_at4",
      video_title: "月末定期台詞放送2020.2月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/u8geC33_at4/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-02-28T14:30:35Z",
    },
    {
      video_id: "8c7ZHCnQKDQ",
      video_title:
        "kawaii ASMR music『Chocolate Pandemic』キミの元に出荷します🍫【kAmP/アキロゼ（ホロライブ）】",
      thumbnail_url: "https://i.ytimg.com/vi/8c7ZHCnQKDQ/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2020-02-14T01:42:37Z",
    },
    {
      video_id: "uHc1q9xHEFA",
      video_title: "月末定期台詞放送2020.1月【ASMR/バイノーラル】",
      thumbnail_url: "https://i.ytimg.com/vi/uHc1q9xHEFA/mqdefault.jpg",
      channel_id: "UCdn5BQ06XqgXoAxIhbqw5Rg",
      published_at: "2020-01-30T18:46:08Z",
    },
    {
      video_id: "96JGBka4gq8",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ・音フェチ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】YO",
      thumbnail_url: "https://i.ytimg.com/vi/96JGBka4gq8/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2020-01-25T04:39:24Z",
    },
    {
      video_id: "bUg9LzKEknw",
      video_title: "【ASMR】子守唄配信！ヒソヒソ…/softly song Japanese【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/bUg9LzKEknw/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2020-01-07T15:48:41Z",
    },
    {
      video_id: "8fqjcg2uRYs",
      video_title: "kawaii ASMR music 360°VR MV『Nekoze Punch!!』 朝ですよ～！【kAmP/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/8fqjcg2uRYs/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2019-12-24T17:16:49Z",
    },
    {
      video_id: "pSg1XsA9W8I",
      video_title:
        "【ASMR/ASMR Situation voice】電話越しの君と一緒に/生音収録【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/pSg1XsA9W8I/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2019-12-24T12:52:39Z",
    },
    {
      video_id: "c0Zo-uZPoUw",
      video_title: "【耳かき/Ear cleaning】お久しぶりのASMR【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/c0Zo-uZPoUw/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2019-12-17T07:57:16Z",
    },
    {
      video_id: "5lByGp5UgHQ",
      video_title:
        "【ASMR】小声で睡眠誘導……吐息・囁き(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/5lByGp5UgHQ/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-12-01T16:59:06Z",
    },
    {
      video_id: "AKxxB6qprlM",
      video_title:
        "【ASMR】小声で睡眠誘導……吐息・囁き(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/AKxxB6qprlM/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-11-24T17:32:36Z",
    },
    {
      video_id: "lvi1B7vcGt4",
      video_title:
        "【ASMR】ポッキーゲームする？近くでもぐもぐ……吐息・囁き(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/lvi1B7vcGt4/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-11-10T22:51:37Z",
    },
    {
      video_id: "Km-xmacm0qc",
      video_title: "【ASMR】耳かきに初挑戦だよ！/Ear cleaning【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/Km-xmacm0qc/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2019-10-25T13:21:47Z",
    },
    {
      video_id: "PZZAj2iRNfw",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/PZZAj2iRNfw/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-10-20T09:10:37Z",
    },
    {
      video_id: "TWmuP4uJomc",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/TWmuP4uJomc/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-10-08T14:03:40Z",
    },
    {
      video_id: "hPpfffXHkSU",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/hPpfffXHkSU/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-09-30T16:10:05Z",
    },
    {
      video_id: "cKZlCl5IL2M",
      video_title: "メルとぺこらの雑談♡ASMR講座【ホロライブ/夜空メル×兎田ぺこら】",
      thumbnail_url: "https://i.ytimg.com/vi/cKZlCl5IL2M/mqdefault.jpg",
      channel_id: "UCD8HOxPs4Xvsm8H0ZxXGiBw",
      published_at: "2019-09-20T16:29:23Z",
    },
    {
      video_id: "E7Mf0OBm62Y",
      video_title: "【晩酌？】一番近い距離で一緒に乾杯しよっ！【ASMR】",
      thumbnail_url: "https://i.ytimg.com/vi/E7Mf0OBm62Y/mqdefault.jpg",
      channel_id: "UCQ0UDLQCjY0rmuxCDE38FGg",
      published_at: "2019-08-27T13:29:53Z",
    },
    {
      video_id: "ov-bNBExYw0",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/ov-bNBExYw0/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-08-22T07:36:16Z",
    },
    {
      video_id: "iwB5g7-hT34",
      video_title: "【ASMR】耳元でおしゃべりする【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/iwB5g7-hT34/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2019-08-19T17:33:46Z",
    },
    {
      video_id: "FkJKDHWyevU",
      video_title:
        "【ASMR】新マイク/安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/FkJKDHWyevU/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-08-13T10:10:05Z",
    },
    {
      video_id: "tBxUftYBxKY",
      video_title: "【ASMR】えーちゃんとスライム作りに挑戦💓【オフコラボ】",
      thumbnail_url: "https://i.ytimg.com/vi/tBxUftYBxKY/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-08-11T15:47:27Z",
    },
    {
      video_id: "udMCPAaS0xw",
      video_title:
        "【ASMR】癒しながら…安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/udMCPAaS0xw/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-08-04T09:38:27Z",
    },
    {
      video_id: "GyiKJ0KWCUs",
      video_title:
        "★ASMR| 深夜にまったりお喋りしよ？Triggers For Sleep &Whispering＆Relaxing| -- ホロライブ/ロボ子さん",
      thumbnail_url: "https://i.ytimg.com/vi/GyiKJ0KWCUs/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-08-03T08:20:07Z",
    },
    {
      video_id: "5cexg9MYB1s",
      video_title: "【＃3D全身ロボ子さん】ボイス販売直前のリクエスト【ASMR＋撮影会】",
      thumbnail_url: "https://i.ytimg.com/vi/5cexg9MYB1s/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-07-30T09:29:59Z",
    },
    {
      video_id: "8v2yxlwiCac",
      video_title: "【お昼ごはん】そうめんちゅるちゅる【ASMR】",
      thumbnail_url: "https://i.ytimg.com/vi/8v2yxlwiCac/mqdefault.jpg",
      channel_id: "UCp-5t9SrOQwXMU7iIjQfARg",
      published_at: "2019-07-27T04:56:22Z",
    },
    {
      video_id: "r2MqJjUytLQ",
      video_title: "【ASMR】安眠誘導。オイルマッサージおんりー；；【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/r2MqJjUytLQ/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-07-12T06:37:40Z",
    },
    {
      video_id: "BjT0GcNMVbk",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ・音フェチ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/BjT0GcNMVbk/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-07-11T14:19:33Z",
    },
    {
      video_id: "asuKvMLljXg",
      video_title:
        "【ASMR】はじめてのASMR / Japanese Trigger Words, Whispering【ホロライブ/猫又おかゆ】",
      thumbnail_url: "https://i.ytimg.com/vi/asuKvMLljXg/mqdefault.jpg",
      channel_id: "UCvaTdHTWBGv3MKj3KVqJVCw",
      published_at: "2019-07-05T15:08:13Z",
    },
    {
      video_id: "hiWBFKpBjak",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/hiWBFKpBjak/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-06-18T13:12:47Z",
    },
    {
      video_id: "QyoXg7uV8Do",
      video_title:
        "【ASMR】鼻声だけど一緒に寝てくれる？【囁き・マッサージ・耳かき】Ear Cleaning/Ear Blowing/Whispering",
      thumbnail_url: "https://i.ytimg.com/vi/QyoXg7uV8Do/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-06-11T12:07:47Z",
    },
    {
      video_id: "KtijQXDwHik",
      video_title:
        "【ASMR】寝付けないならこっちにおいで♡【心音・マッサージ・耳かき】Ear Cleaning/Ear Blowing/Whispering",
      thumbnail_url: "https://i.ytimg.com/vi/KtijQXDwHik/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-06-08T14:15:39Z",
    },
    {
      video_id: "xxpHYi8pNN8",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/xxpHYi8pNN8/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-30T13:18:27Z",
    },
    {
      video_id: "8QXsOdaEsOA",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/8QXsOdaEsOA/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-29T09:07:04Z",
    },
    {
      video_id: "y685oRgoLR4",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/y685oRgoLR4/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-25T09:58:17Z",
    },
    {
      video_id: "skW9abUCXiA",
      video_title:
        "【ASMR】安眠誘導。…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/skW9abUCXiA/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-10T12:16:03Z",
    },
    {
      video_id: "muHtBeD6Tf4",
      video_title:
        "【ASMR】安眠誘導。…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/muHtBeD6Tf4/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-06T16:01:21Z",
    },
    {
      video_id: "zgs_eKKRhPQ",
      video_title:
        "【ASMR】安眠誘導。添い寝する？…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/zgs_eKKRhPQ/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-05T13:17:38Z",
    },
    {
      video_id: "BN_HKoVr-qg",
      video_title: "【ASMR事故】敗北のテレパシー【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/BN_HKoVr-qg/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-03T14:04:12Z",
    },
    {
      video_id: "8vFUnQGQfrY",
      video_title:
        "【ASMR】安眠誘導。…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/8vFUnQGQfrY/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-05-01T16:02:52Z",
    },
    {
      video_id: "S8qUhCjo0AU",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/S8qUhCjo0AU/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-04-24T16:00:04Z",
    },
    {
      video_id: "PsJkKUEnnPg",
      video_title:
        "【ASMR】安眠誘導。眠るまでそばに…君の耳元で吐息・囁き・マッサージ(Triggers For Sleep &Whispering＆Relaxing)【ホロライブ/ロボ子さん】",
      thumbnail_url: "https://i.ytimg.com/vi/PsJkKUEnnPg/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-04-23T16:02:36Z",
    },
    {
      video_id: "aHrIQ6pXtZo",
      video_title:
        "【ASMR】色んな音をききながら安眠へ…一緒にすやすや……💤【吐息、囁き、耳かき】(water/Relaxing /Slime/Whispering)音フェチ💛",
      thumbnail_url: "https://i.ytimg.com/vi/aHrIQ6pXtZo/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-04-21T11:09:06Z",
    },
    {
      video_id: "lwO6iZd4SoM",
      video_title: "【ASMR】囁きで睡眠誘導。マッサージ・囁き・吐息【Ear Blowing/Whispering】",
      thumbnail_url: "https://i.ytimg.com/vi/lwO6iZd4SoM/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-04-16T15:06:35Z",
    },
    {
      video_id: "1SADwRMqjwI",
      video_title:
        "【ASMR】まだまだ寒いから…一緒にねてもいい？【心音・マッサージ・シチュエーション】Ear Blowing/Whispering",
      thumbnail_url: "https://i.ytimg.com/vi/1SADwRMqjwI/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-04-11T04:16:30Z",
    },
    {
      video_id: "-nUMzf89-iI",
      video_title: "【ASMR】ときのそらの秘密おしえちゃいます【イヤホン推薦】",
      thumbnail_url: "https://i.ytimg.com/vi/-nUMzf89-iI/mqdefault.jpg",
      channel_id: "UCp6993wxpyDPHUpavwDFqgg",
      published_at: "2019-04-07T09:51:53Z",
    },
    {
      video_id: "xoV7CeA7tGk",
      video_title: "【ASMR】寝れないから一緒に‥お布団でごろごろ…ね？【幼馴染シチュエーション】",
      thumbnail_url: "https://i.ytimg.com/vi/xoV7CeA7tGk/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-03-26T09:40:17Z",
    },
    {
      video_id: "UZ-XaU8l-yQ",
      video_title: "【ASMR】作業の音とともにＺｚｚ【囁き・タイピング音】",
      thumbnail_url: "https://i.ytimg.com/vi/UZ-XaU8l-yQ/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-03-21T12:52:29Z",
    },
    {
      video_id: "pUdx8nmX9ns",
      video_title:
        "【ASMR】囁きで眠れない子を睡眠誘導♡【心音・マッサージ・耳かき】Ear Cleaning/Ear Blowing/Whispering",
      thumbnail_url: "https://i.ytimg.com/vi/pUdx8nmX9ns/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-03-20T14:10:10Z",
    },
    {
      video_id: "oIWF5-ChFsE",
      video_title:
        "【ASMR】寝ることは叶いますか？深夜の音テロ・声真似　with白上フブキ【Ear Blowing/Whispering】",
      thumbnail_url: "https://i.ytimg.com/vi/oIWF5-ChFsE/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-03-15T12:00:22Z",
    },
    {
      video_id: "uCqZrX22c5E",
      video_title:
        "【ASMR】囁きで眠れない子を睡眠誘導♡【心音・マッサージ・耳かき】Ear Cleaning/Ear Blowing/Whispering",
      thumbnail_url: "https://i.ytimg.com/vi/uCqZrX22c5E/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-02-22T14:00:09Z",
    },
    {
      video_id: "PlVNhNjJy9k",
      video_title:
        "【ASMR】いつもありがとうだよ【耳かき、吐息、囁き、シチュエーション】(Ear Cleaning/Ear Blowing/Whispering)",
      thumbnail_url: "https://i.ytimg.com/vi/PlVNhNjJy9k/mqdefault.jpg",
      channel_id: "UCXTpFs_3PqI41qX2d9tL2Rw",
      published_at: "2019-02-08T13:14:03Z",
    },
    {
      video_id: "Cinfty4GS0Y",
      video_title:
        "【ASMR】眠れないなら…一緒に寝てあげる…【囁き、吐息、マッサージ】Ear Cleaning/Ear Blowing/Whispering",
      thumbnail_url: "https://i.ytimg.com/vi/Cinfty4GS0Y/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-02-07T14:59:54Z",
    },
    {
      video_id: "lBjExWau0TA",
      video_title: "【ASMR】寝る前に…お耳…かしてくださいっ♡【Binaural/Whispering睡眠導入】",
      thumbnail_url: "https://i.ytimg.com/vi/lBjExWau0TA/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-02-03T16:31:35Z",
    },
    {
      video_id: "Axa40bIGlVI",
      video_title:
        "【ASMR】寝れないので、ボクのお喋り相手になってください【Binaural/Whispering睡眠導入】",
      thumbnail_url: "https://i.ytimg.com/vi/Axa40bIGlVI/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-02-03T07:19:24Z",
    },
    {
      video_id: "R2iU6AzSbfg",
      video_title: "【ASMR】ボクに言わせたいこと…教えてくださいふふっ【台詞リク〇】",
      thumbnail_url: "https://i.ytimg.com/vi/R2iU6AzSbfg/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-01-31T07:41:37Z",
    },
    {
      video_id: "WQLydwjAcN0",
      video_title: "【ASMR】深夜のお喋り🌸ボクと聴覚共有しましょ？ふふっ【whispering】",
      thumbnail_url: "https://i.ytimg.com/vi/WQLydwjAcN0/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-01-20T05:02:56Z",
    },
    {
      video_id: "wJDCg3NQAL8",
      video_title: "【ASMR】はじめてのスライムづくり[ ☌ω☌]【whispering】",
      thumbnail_url: "https://i.ytimg.com/vi/wJDCg3NQAL8/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-01-18T14:32:09Z",
    },
    {
      video_id: "exwUfMECQV4",
      video_title:
        "【Japanese ASMR】寝れないので、ボクのお喋り相手になってください【Binaural/Whispering睡眠導入】",
      thumbnail_url: "https://i.ytimg.com/vi/exwUfMECQV4/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-01-07T04:51:40Z",
    },
    {
      video_id: "g4klcXf5PcI",
      video_title: "Minecraft #6 | 昼チャレ🐓ASMRで癒されて？【 #ロボ子生放送】",
      thumbnail_url: "https://i.ytimg.com/vi/g4klcXf5PcI/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-01-05T16:38:38Z",
    },
    {
      video_id: "VFphkxB7GWo",
      video_title: "【ASMR】新年初のASMR🌸あなたのお耳で…してもいいですか？【whispering】",
      thumbnail_url: "https://i.ytimg.com/vi/VFphkxB7GWo/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2019-01-05T06:53:23Z",
    },
    {
      video_id: "0dj_zliWka4",
      video_title: "【新感覚】小豆洗いのプロにASMR教えてもらう！",
      thumbnail_url: "https://i.ytimg.com/vi/0dj_zliWka4/mqdefault.jpg",
      channel_id: "UCXTpFs_3PqI41qX2d9tL2Rw",
      published_at: "2019-01-04T13:14:16Z",
    },
    {
      video_id: "faEYcvJ1WRI",
      video_title:
        "【ASMR/シチュエーションボイス】聖夜に繋がるのは…ASMR Situation voice【ホロライブ/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/faEYcvJ1WRI/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2018-12-08T11:25:39Z",
    },
    {
      video_id: "vZ0Pe__ETfc",
      video_title: "【半年記念】お耳を癒すにゃんにゃん配信♡【ASMR】",
      thumbnail_url: "https://i.ytimg.com/vi/vZ0Pe__ETfc/mqdefault.jpg",
      channel_id: "UCQ0UDLQCjY0rmuxCDE38FGg",
      published_at: "2018-12-01T13:43:22Z",
    },
    {
      video_id: "viJi2fZcitY",
      video_title:
        "【ASMR】森で出会ったエルフがとろける甘い囁きで癒してくる【アキロゼch】Japanese Whisper binaural LIVE",
      thumbnail_url: "https://i.ytimg.com/vi/viJi2fZcitY/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2018-11-14T04:00:11Z",
    },
    {
      video_id: "XyFChLUXSjs",
      video_title: "ASMR：睡眠誘導編#4　～ボクと寝んねしよ💤～",
      thumbnail_url: "https://i.ytimg.com/vi/XyFChLUXSjs/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2018-10-17T10:20:42Z",
    },
    {
      video_id: "S-JFHZ9CWMs",
      video_title: "【ASMR】耳元でささやいてもいいですか？【whispering】",
      thumbnail_url: "https://i.ytimg.com/vi/S-JFHZ9CWMs/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2018-10-14T11:08:39Z",
    },
    {
      video_id: "ZNAisjGOLv4",
      video_title: "【ASMR/バイノーラル】一緒に腹筋する？耳もとでお話【Vtuber/アキロゼ】",
      thumbnail_url: "https://i.ytimg.com/vi/ZNAisjGOLv4/mqdefault.jpg",
      channel_id: "UCFTLzh12_nrtzqBPsTCqenA",
      published_at: "2018-08-27T16:06:53Z",
    },
    {
      video_id: "peAGiR4pCVE",
      video_title: "【ASMR】ねむねむ・・・【夏まつch】",
      thumbnail_url: "https://i.ytimg.com/vi/peAGiR4pCVE/mqdefault.jpg",
      channel_id: "UCQ0UDLQCjY0rmuxCDE38FGg",
      published_at: "2018-08-21T14:52:10Z",
    },
    {
      video_id: "Um83o_qmRAw",
      video_title: "【夏まつch】おやすみのお昼はなにしてますか？【ASMR】",
      thumbnail_url: "https://i.ytimg.com/vi/Um83o_qmRAw/mqdefault.jpg",
      channel_id: "UCQ0UDLQCjY0rmuxCDE38FGg",
      published_at: "2018-08-13T18:38:08Z",
    },
    {
      video_id: "nRSC2KYm7JM",
      video_title: "ASMR：睡眠誘導編#1　～ボクと寝んねしよ💤～",
      thumbnail_url: "https://i.ytimg.com/vi/nRSC2KYm7JM/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2018-07-31T13:03:27Z",
    },
    {
      video_id: "Qv4Il7yV9a0",
      video_title: "ASMR：睡眠誘導編#2　～ボクと寝んねしよ💤～",
      thumbnail_url: "https://i.ytimg.com/vi/Qv4Il7yV9a0/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2018-07-14T14:31:42Z",
    },
    {
      video_id: "UN_LFdvZtmI",
      video_title: "ASMR：睡眠誘導編#3　～ボクと寝んねしよ💤～",
      thumbnail_url: "https://i.ytimg.com/vi/UN_LFdvZtmI/mqdefault.jpg",
      channel_id: "UCDqI2jOz0weumE8s7paEk6g",
      published_at: "2018-06-22T12:08:02Z",
    },
  ],
};
