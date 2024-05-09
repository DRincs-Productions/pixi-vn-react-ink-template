import { RoomBaseModel, saveRoom } from "@drincs/nqtr";
import { ImageTimeSlots } from "../model/TimeSlots";
import { mcHome } from "./locations";

export const mcRoom = new RoomBaseModel('mc_room', mcHome, {
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/myroom-3.webp',
    }),
})

export const aliceRoom = new RoomBaseModel('alice_room', mcHome, {
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/aliceroom-3.webp',
    }),
})

export const annRoom = new RoomBaseModel('ann_room', mcHome, {
    image: new ImageTimeSlots({
        morning: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-0.webp',
        afternoon: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-1.webp',
        evening: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-2.webp',
        night: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/location/annroom-3.webp',
    }),
})

saveRoom([mcRoom, aliceRoom, annRoom]);
