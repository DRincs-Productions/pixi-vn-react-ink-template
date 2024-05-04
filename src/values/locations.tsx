import { LocationBaseModel } from "@drincs/nqtr";
import { mainMap } from "./maps";

export const mcHome = new LocationBaseModel('mc_home', mainMap, {
    name: 'MC Home',
    icon: "https://icon.jpg",
});
