import { setCurrentRoom, TimeManager } from "@drincs/nqtr";
import { Label, labelDecorator, StepLabelType } from "@drincs/pixi-vn";
import { timeSlots } from "../values/constants";
import { mcRoom } from "../values/rooms";

@labelDecorator()
export class StartLabel extends Label {
    override get steps(): StepLabelType[] {
        return [
            () => {
                TimeManager.settings = {
                    defaultTimeSpent: 1,
                    maxDayHours: 24,
                    minDayHours: 0,
                    timeSlots: [
                        { name: timeSlots.morning.description, startHour: timeSlots.morning.value },
                        { name: timeSlots.afternoon.description, startHour: timeSlots.afternoon.value },
                        { name: timeSlots.evening.description, startHour: timeSlots.evening.value },
                        { name: timeSlots.night.description, startHour: timeSlots.night.value },
                    ],
                    weekDaysNames: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                    weekendStartDay: 6,
                    weekLength: 7,
                }
                setCurrentRoom(mcRoom)
                return {
                    newRoute: "/navigation",
                }
            },
        ]
    }
}
