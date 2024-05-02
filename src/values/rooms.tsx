import { RoomBaseModel, saveRoom } from "@drincs/nqtr";
import { mcHome } from "./locations";

export const mcRoom = new RoomBaseModel('mc_room', mcHome, {
})

saveRoom([mcRoom]);