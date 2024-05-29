import { ActivityModel, saveActivity } from "@drincs/nqtr";
import BedIcon from '@mui/icons-material/Bed';
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { callLabelWithGoNavigationCallBack } from "../labels/navigationCallBackLabel";
import { napLabel } from "../labels/sleepNapLabels";

export const nap = new ActivityModel("nap",
    (_, event) => {
        if (event) {
            event.navigate("/game")
            callLabelWithGoNavigationCallBack(napLabel, event)
        }
        else {
            console.error("Event is undefined")
        }
    },
    {
        name: "Nap",
        fromHour: 5,
        toHour: 23,
        renderIcon: (activity, props) => {
            return <NavigationRoundIconButton
                disabled={activity.disabled}
                onClick={() => {
                    if (!props) {
                        console.error("Props is undefined")
                        return
                    }
                    activity.onRun(props)
                }}
                ariaLabel={activity.name}
            >
                <BedIcon />
            </NavigationRoundIconButton>
        },
    }
)

// "sleep"     :   Act(name = _("Sleep"),  button_icon = "action alarm", label_name = "sleep", hour_start=23, hour_stop=5), 
saveActivity(nap)
