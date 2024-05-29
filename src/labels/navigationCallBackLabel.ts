import { GameStepManager, Label, newLabel, StepLabelPropsType } from "@drincs/pixi-vn";

const navigationCallBackLabel = newLabel<{
    label: Label<any>,
}>("NavigationCallBackLabel",
    [
        ({ label, ...rest }) => {
            GameStepManager.callLabel(label, { ...rest })
        },
        ({ navigate }) => navigate("/navigation"),
    ]
)

/**
 * Call the label and after the label is ended, navigate to the "/navigation" route.
 * If you use "jump" in the label, the navigation will not be executed.
 * @param label The label to call.
 * @param props The props to pass to the label.
 */
export function callLabelWithGoNavigationCallBack<T extends {} = {}>(label: Label<T>, props: StepLabelPropsType<T>) {
    GameStepManager.callLabel(navigationCallBackLabel, {
        label: label,
        ...props
    })
}
