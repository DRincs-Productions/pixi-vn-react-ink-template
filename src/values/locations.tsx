import { LocationBaseModel } from "@drincs/nqtr";
import { CanvasSprite } from "@drincs/pixi-vn";
import { mainMap } from "./maps";

export const mcHome = new LocationBaseModel('mc_home', mainMap, {
    name: 'MC Home',
    icon: new CanvasSprite()
});
