import { addCommitment, CommitmentBaseModel, QuestBaseModel, StageBaseModel } from "@drincs/nqtr";
import { callLabelWithGoNavigationCallBack } from "../labels/navigationCallBackLabel";
import { aliceTalkMenuLabel } from "../labels/variousActionsLabels";
import { alice } from "../values/characters";
import { terrace } from "../values/rooms";

const talkAlice1Stage = new StageBaseModel("talk alice1", {
    onStart: () => {
        let a = new CommitmentBaseModel("alice_smokes", alice, terrace, {
            fromHour: 10,
            toHour: 20,
            renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp',
            executionType: "automatic",
            onRun: (_, event) => {
                event.navigate("/game")
                callLabelWithGoNavigationCallBack(aliceTalkMenuLabel, event)
            },
        })
        addCommitment(a)
    },
    name: "Talk to Alice",
    description: "Talk to Alice on the terrace",
})

export const aliceQuest = new QuestBaseModel("aliceQuest",
    [
        talkAlice1Stage
    ],
    {
        name: "Help Alice",
    }
)
