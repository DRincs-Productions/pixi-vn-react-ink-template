import { ActivityModel, saveActivity, TimeManager } from "@drincs/nqtr";
import BedIcon from '@mui/icons-material/Bed';
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { callLabelWithGoNavigationCallBack } from "../labels/navigationCallBackLabel";
import { napLabel, sleepLabel } from "../labels/sleepNapLabels";

export const nap = new ActivityModel("nap",
    (_, event) => {
        event.navigate("/game")
        if (TimeManager.nowIsBetween(5, 23)) {
            callLabelWithGoNavigationCallBack(napLabel, event)
        }
        else {
            callLabelWithGoNavigationCallBack(sleepLabel, event)
        }
    },
    {
        name: "Nap",
        renderIcon: (activity, props) => {
            return <NavigationRoundIconButton
                disabled={activity.disabled}
                onClick={() => {
                    activity.onRun(props)
                }}
                ariaLabel={activity.name}
            >
                <BedIcon />
            </NavigationRoundIconButton>
        },
    }
)

saveActivity(nap)
