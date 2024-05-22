import { ActivityModel } from "@drincs/nqtr"
import { GameStepManager } from "@drincs/pixi-vn"
import { napLabel } from "../labels/NapLabel"


export const nap = new ActivityModel("nap",
    (_, event) => {
        if (event) {
            event.navigate("/game")
            GameStepManager.callLabel(napLabel, event)
        }
        else {
            console.error("ActivityOnRunProps not found")
        }
    },
    {
        name: "Nap",
        fromHour: 5,
        toHour: 23,
    }
)

// "sleep"     :   Act(name = _("Sleep"),  button_icon = "action alarm", label_name = "sleep", hour_start=23, hour_stop=5), 
