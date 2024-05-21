import { setCurrentRoom, TimeManager } from "@drincs/nqtr";
import { newLabel } from "@drincs/pixi-vn";
import { timeSlots } from "../values/constants";
import { mcRoom } from "../values/rooms";

const START_LABEL_ID = "StartLabel"

export const startLabel = newLabel(START_LABEL_ID,
    [
        (props) => {
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
            if (props) {
                props.navigate("/navigation")
            }
            else {
                console.error("Props not passed to startLabel")
            }
        }
    ]
)
