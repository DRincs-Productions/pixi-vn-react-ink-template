import { TimeSlotsEnum } from "../enum/TimeSlotsEnum";

export const timeSlots = {
    morning: { description: TimeSlotsEnum.MORNING, value: 5 },
    afternoon: { description: TimeSlotsEnum.AFTERNOON, value: 12 },
    evening: { description: TimeSlotsEnum.EVENING, value: 18 },
    night: { description: TimeSlotsEnum.NIGHT, value: 22 }
}

export const BACKGROUND_ID = 'background';
