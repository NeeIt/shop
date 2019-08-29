import { Item } from "../model/Item";

export const ITEMS:Item[]=  [
    {
        id: 0,
        height:3,
        categoryId:1,
        name: "guitar",
        title: "Guitar",
        prise: 300,
        imgURL:'./assets/items/guitar/main.png',
        material:['wood','metal','plastic'],
        mainColor:'#eedeab',
        colors:['#BD752B','#0C0E0D',"#DFC683"],
        size:[50,20,34],
        description:
          "It's my first guitar. I love it. I hope You'll love it as much as I do.",
        gallery: [
          `./assets/items/guitar/gallery/img1.jpg`,
          `./assets/items/guitar/gallery/img2.jpg`,
          `./assets/items/guitar/gallery/img3.jpg`
        ]
      },
      {
        id: 1,
        categoryId:1,
        height:2,
        name: "saxophone",
        title: "Saxophone",
        prise: 450,
        imgURL:'./assets/items/saxophone/main.png',
        material:['metal'],
        mainColor:'#F2D2AC',
        colors:["#E3B863"],
        size:[50,20,34],
        description:
          "I bought it when I was sixteen. It sound prety good. ",
        gallery: [
          `./assets/items/saxophone/gallery/img1.jpg`,
          `./assets/items/saxophone/gallery/img2.jpg`,
          `./assets/items/saxophone/gallery/img3.jpg`
        ]
      },
      {
        id: 2,
        categoryId:2,
        height:1,
        name: "pianoBench",
        title: "Piano bench",
        prise: 210,
        imgURL:'./assets/items/pianoBench/main.png',
        material:['wood','leather'],
        mainColor:'#eedeab',
        colors:["#191E18"],
        size:[50,20,34],
        description:
          "It's softer then you think",
        gallery: [
          `./assets/items/pianoBench/gallery/img1.jpg`
        ]
      },
      {
        id: 3,
        categoryId:2,
        height:3,
        name: "musicStand",
        title: "Music stand",
        prise: 50,
        imgURL:'./assets/items/musicStand/main.png',
        material:['metal'],
        mainColor:'#F7CBCC',
        colors:["#191E18"],
        size:[50,20,34],
        description:
          "I CAN'T BELIVE THAT I AM OVNER OF THIS NOTE STAND!!!!",
        gallery: [
          `./assets/items/musicStand/gallery/img1.jpg`
        ]
      },
      {
        id: 4,
        categoryId:1,
        height:1,
        name: "drums",
        title: "Drums",
        prise: 320,
        imgURL:'./assets/items/drums/main.png',
        material:['wood','metal'],
        mainColor:'#B0CBDC',
        colors:["#638EB8","#212121","#A3AAB2"],
        size:[50,20,34],
        description:
          "Sweety drums",
        gallery: [
          `./assets/items/drums/gallery/img1.jpg`,
          `./assets/items/drums/gallery/img2.jpg`,
          `./assets/items/drums/gallery/img3.jpg`
        ]
      },
      {
        id: 5,
        categoryId:3,
        height:1,
        name: "microphone",
        title: "Microphone",
        prise: 50,
        imgURL:'./assets/items/microphone/main.png',
        material:['wood','metal'],
        mainColor:'#eedeab',
        colors:["#232524","#828483"],
        size:[50,20,34],
        description:
          "Sweety drums",
        gallery: [
          `./assets/items/drums/microphone/img1.jpg`,
          `./assets/items/drums/microphone/img2.jpg`
        ]
      }
      
  ];
