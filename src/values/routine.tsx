import { CommitmentBaseModel, saveCommitment, setFixedCommitments } from "@drincs/nqtr";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { callLabelWithGoNavigationCallBack } from "../labels/navigationCallBackLabel";
import { talkSleepLabel } from "../labels/variousActionsLabels";
import { alice } from "./characters";
import { aliceRoom } from "./rooms";

const aliceSleep = new CommitmentBaseModel("alice_sleep", alice, aliceRoom, {
    fromHour: 20,
    toHour: 10,
    renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/roomsleep0A.webp',
    renderIcon: (commitment, props) => {
        return <NavigationRoundIconButton
            disabled={commitment.disabled}
            onClick={() => {
                if (commitment.onRun) {
                    commitment.onRun(props)
                }
            }}
            ariaLabel={commitment.name}
        >
            <QuestionAnswerIcon />
        </NavigationRoundIconButton>
    },
    onRun: (_, event) => {
        event.navigate("/game")
        callLabelWithGoNavigationCallBack(talkSleepLabel, event)
    },
})

saveCommitment(aliceSleep)
setFixedCommitments([aliceSleep])
