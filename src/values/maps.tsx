import { MapBaseModel } from "@drincs/nqtr";

export const mainMap = new MapBaseModel('main_map', {
    neighboringMaps: {
        // "north": nightcityMap,
    },
});

export const nightcityMap = new MapBaseModel('nightcity_map', {
    neighboringMaps: {
        "south": mainMap,
    },
});
