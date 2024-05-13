import { RoomBaseModel, saveRoom } from "@drincs/nqtr";
import { ImageTimeSlots } from "../model/TimeSlots";
import { gym, mcHome } from "./locations";

export const mcRoom = new RoomBaseModel('mc_room', mcHome, {
    name: "MC room",
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-3.webp',
    }),
})

export const aliceRoom = new RoomBaseModel('alice_room', mcHome, {
    name: "Alice room",
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-3.webp',
    }),
})

export const annRoom = new RoomBaseModel('ann_room', mcHome, {
    name: "Ann room",
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-3.webp',
    }),
})

const bathroom = new RoomBaseModel('bathroom', mcHome, {
    name: "Bathroom",
    image: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/bathroom.webp',
})

export const lounge = new RoomBaseModel('lounge', mcHome, {
    name: "Lounge",
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/lounge-3.webp',
    }),
})

export const terrace = new RoomBaseModel('terrace', mcHome, {
    name: "Terrace",
    isEntrance: true,
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/terrace-3.webp',
    }),
})

export const gymRoom = new RoomBaseModel('gym_room', gym, {
    name: "Gym",
    image: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/gym.webp',
})

saveRoom([mcRoom, aliceRoom, annRoom, bathroom, lounge, terrace, gymRoom]);
