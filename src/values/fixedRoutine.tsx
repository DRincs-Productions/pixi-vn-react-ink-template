import { CommitmentBaseModel, saveCommitment, setFixedRoutine } from "@drincs/nqtr";
import { GameStepManager } from "@drincs/pixi-vn";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import NavigationRoundIconButton from "../components/NavigationRoundIconButton";
import { aliceTalkMenuLabel, talkSleepLabel } from "../labels/variousActionsLabels";
import { alice } from "./characters";
import { aliceRoom, classRoom, terrace } from "./rooms";

const aliceSleep = new CommitmentBaseModel("alice_sleep", alice, aliceRoom, {
    fromHour: 20,
    toHour: 10,
    renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/roomsleep0A.webp',
    renderIcon: (commitment, props) => {
        return <NavigationRoundIconButton
            disabled={commitment.disabled}
            onClick={() => {
                if (commitment.run) {
                    commitment.run(props)
                }
            }}
            ariaLabel={commitment.name}
        >
            <QuestionAnswerIcon />
        </NavigationRoundIconButton>
    },
    onRun: (_, event) => {
        event.navigate("/game")
        GameStepManager.jumpLabel(talkSleepLabel, event)
    },
})

const aliceGoSchool = new CommitmentBaseModel("alice_go_school", alice, classRoom, {
    fromHour: 8,
    toHour: 14,
    hidden: "weekend",
    priority: 2,
})

const aliceSmokes = new CommitmentBaseModel("alice_smokes", alice, terrace, {
    fromHour: 10,
    toHour: 20,
    renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp',
    renderIcon: (commitment, props) => {
        return <NavigationRoundIconButton
            disabled={commitment.disabled}
            onClick={() => {
                if (commitment.run) {
                    commitment.run(props)
                }
            }}
            ariaLabel={commitment.name}
        >
            <QuestionAnswerIcon />
        </NavigationRoundIconButton>
    },
    onRun: (_, event) => {
        event.navigate("/game")
        GameStepManager.jumpLabel(aliceTalkMenuLabel, event)
    },
})


saveCommitment([aliceSleep, aliceGoSchool, aliceSmokes])
setFixedRoutine([aliceSleep, aliceGoSchool, aliceSmokes])
