const SAVED_PROGRESS =
    JSON.parse(localStorage.getItem("coreLifeProgress")) || {};

export const pages = [
    {
        id: 1,
        title: "Page 1",
        image: "assets/comic/page1.webp",
        unlocked: true,
        level: 1
    },
    {
        id: 2,
        title: "Page 2",
        image: "assets/comic/page2.webp",
        unlocked: false,
        level: 2
    },
    {
        id: 3,
        title: "Page 3",
        image: "assets/comic/page3.webp",
        unlocked: false,
        level: 3
    },
    {
        id: 4,
        title: "Page 4",
        image: "assets/comic/page4.webp",
        unlocked: false,
        level: 4
    },
    {
        id: 5,
        title: "Page 5",
        image: "assets/comic/page5.webp",
        unlocked: false,
        level: 5
    },
    {
        id: 6,
        title: "Page 6",
        image: "assets/comic/page6.webp",
        unlocked: false,
        level: 6
    },
    {
        id: 7,
        title: "Page 7",
        image: "assets/comic/page7.webp",
        unlocked: false,
        level: 7
    },
    {
        id: 8,
        title: "Page 8",
        image: "assets/comic/page8.webp",
        unlocked: false,
        level: 8
    },
    {
        id: 9,
        title: "Page 9",
        image: "assets/comic/page9.webp",
        unlocked: false,
        level: 9
    },
    {
        id: 10,
        title: "Page 10",
        image: "assets/comic/page10.webp",
        unlocked: false,
        level: 10
    },
    {
        id: 11,
        title: "Page 11",
        image: "assets/comic/page11.webp",
        unlocked: false,
        level: 11
    },
    {
        id: 12,
        title: "Page 12",
        image: "assets/comic/page12.webp",
        unlocked: false,
        level: 12
    },
    {
        id: 13,
        title: "Page 13",
        image: "assets/comic/page13.webp",
        unlocked: false,
        level: 13
    },
    {
        id: 14,
        title: "Page 14",
        image: "assets/comic/page14.webp",
        unlocked: false,
        level: 14
    },
    {
        id: 15,
        title: "Page 15",
        image: "assets/comic/page15.webp",
        unlocked: false,
        level: 15
    },
    {
        id: 16,
        title: "Page 16",
        image: "assets/comic/page16.webp",
        unlocked: false,
        level: 16
    },
    {
        id: 17,
        title: "Page 17",
        image: "assets/comic/page17.webp",
        unlocked: false,
        level: 17
    },
    {
        id: 18,
        title: "Page 18",
        image: "assets/comic/page18.webp",
        unlocked: false,
        level: 18
    },
    {
        id: 19,
        title: "Page 19",
        image: "assets/comic/page19.webp",
        unlocked: false,
        level: 19
    },
    {
        id: 20,
        title: "Page 20",
        image: "assets/comic/page20.webp",
        unlocked: false,
        level: 20
    },
];

for (const page of pages){
    if (page.level === 1){
        page.unlocked = true;
        continue;
    }

    if (SAVED_PROGRESS[page.level] === true){
        page.unlocked = true;
    }
}