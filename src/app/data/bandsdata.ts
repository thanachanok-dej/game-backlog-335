import { Bands } from "../types/Bands";

export const Bandsdata: Bands[] = [
  {
    id: 1,
    name: "Cocktail",
    member: [
      { name: "โอม (Ohm)", image: "/image/ohm.webp", position: "Vocal" },
      { name: "เชาว์ (Chow)", image: "/image/chow.jpg", position: "Guitar" },
      { name: "ปาร์ค (Park)", image: "/image/park.jpg", position: "Bass" },
      { name: "ฟิลิปส์ (Philip)", image: "/image/phillip.jpg", position: "Drums" }
    ],
    debutDate: "ปี 2002",
    memberCount: 4,
    latestAlbum: "Yours Ever",
    image: "/image/cocktail.jpg",
    imageAlbum: "/image/cocktail.jpg"
  },
  {
    id: 2,
    name: "BTS",
    member: [
      { name: "RM", image: "/image/rm.png", position: "Leader / Main Rapper" },
      { name: "Jin", image: "/image/jin.png", position: "Sub Vocal / Visual" },
      { name: "Suga", image: "/image/suga.webp", position: "Lead Rapper" },
      { name: "J-Hope", image: "/image/jh.png", position: "Main Dancer / Sub Rapper" },
      { name: "Jimin", image: "/image/jm.webp", position: "Main Dancer / Lead Vocal" },
      { name: "V", image: "/image/v.webp", position: "Lead Dancer / Sub Vocal" },
      { name: "Jungkook", image: "/image/jk.png", position: "Main Vocal / Lead Dancer" }
    ],
    debutDate: "13 มิถุนายน 2013",
    memberCount: 7,
    latestAlbum: "Proof",
    image: "/image/bts.jpg",
    imageAlbum: "/image/arirang.webp"
  },
  {
    id: 3,
    name: "PiXXiE",
    member: [
      { name: "Mabel", image: "/image/mabel.jpg", position: "Lead Vocal / Visual" },
      { name: "Pimma", image: "/image/pimma.jpg", position: "Main Rapper / Main Dancer" },
      { name: "Ingkho", image: "/image/ingkho.jpg", position: "Main Vocal" }
    ],
    debutDate: "11 กุมภาพันธ์ 2021",
    memberCount: 3,
    latestAlbum: "BLOOM",
    image: "/image/pixxie.webp",
    imageAlbum: "/image/pixxieRain.avif"
  }
];