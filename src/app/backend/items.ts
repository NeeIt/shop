import { Item } from "../model/Item";

export const ITEMS:Item[]=  [
    {
        id: 1,
        categoryId:1,
        name: "guitar",
        prise: 300,
        imgURL:'./assets/items/guitar/main.png',
        description:
          "It's my first guitar. I love it. I hope You'll love it as much as I do.",
        gallery: [
          `./assets/items/guitar/gallery/img1.jpg`,
          `./assets/items/guitar/gallery/img2.jpg`,
          `./assets/items/guitar/gallery/img3.jpg`
        ]
      },
      {
        id: 2,
        categoryId:1,
        name: "saxophone",
        prise: 450,
        imgURL:'./assets/items/saxophone/main.png',
        description:
          "I bought it when I was sixteen. It sound prety good",
        gallery: [
          `./assets/items/saxophone/gallery/img1.jpg`,
          `./assets/items/saxophone/gallery/img2.jpg`,
          `./assets/items/saxophone/gallery/img3.jpg`
        ]
      },
      {
        id: 3,
        categoryId:2,
        name: "piano bench",
        prise: 210,
        imgURL:'./assets/items/pianoBench/main.png',
        description:
          "It's softer then you think",
        gallery: [
          `./assets/items/pianoBench/gallery/img1.jpg`
        ]
      },
      {
        id: 4,
        categoryId:2,
        name: "music stand",
        prise: 50,
        imgURL:'./assets/items/musicStand/main.png',
        description:
          "I CAN'T BELIVE THAT I AM OVNER OF THIS NOTE STAND!!!!",
        gallery: [
          `./assets/items/musicStand/gallery/img1.jpg`
        ]
      }
  ];
