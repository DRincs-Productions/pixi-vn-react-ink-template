import { TimeManager } from "@drincs/nqtr"

enum TimeSlotsEnumNumber {
    MORNING = 0,
    AFTERNOON = 1,
    EVENING = 2,
    NIGHT = 3
}

export interface IImageTimeSlots {
    morning: string
    afternoon: string
    evening: string
    night: string
}

export class ImageTimeSlots {
    constructor(data: IImageTimeSlots) {
        this.morning = data.morning
        this.afternoon = data.afternoon
        this.evening = data.evening
        this.night = data.night
    }
    morning: string
    afternoon: string
    evening: string
    night: string
    get currentImage() {
        if (TimeManager.currentTimeSlot === TimeSlotsEnumNumber.MORNING) {
            return this.morning
        }
        else if (TimeManager.currentTimeSlot === TimeSlotsEnumNumber.EVENING) {
            return this.evening
        }
        else if (TimeManager.currentTimeSlot === TimeSlotsEnumNumber.NIGHT) {
            return this.night
        }
        return this.afternoon
    }
    get toObject(): IImageTimeSlots {
        return {
            morning: this.morning,
            afternoon: this.afternoon,
            evening: this.evening,
            night: this.night
        }
    }
}
