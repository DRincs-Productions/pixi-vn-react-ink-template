import { addCommitment, CommitmentBaseModel, newQuest, removeCommitment, saveCommitment, Stage } from "@drincs/nqtr";
import { GameStepManager } from "@drincs/pixi-vn";
import { talkAliceQuest } from "../labels/variousActionsLabels";
import { orderProduct } from "../values/activity";
import { alice } from "../values/characters";
import { mcRoom, terrace } from "../values/rooms";

const talkAlice1Commit = new CommitmentBaseModel("talk_alice1", alice, terrace, {
    fromHour: 10,
    toHour: 20,
    renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp',
    executionType: "automatic",
    priority: 1,
    onRun: (_, event) => {
        event.navigate("/game")
        GameStepManager.jumpLabel(talkAliceQuest, event)
        removeCommitment(talkAlice1Commit)
    },
})

const talkAlice1Stage = new Stage("talk_alice1", {
    onStart: () => {
        addCommitment(talkAlice1Commit)
    },
    onEnd: () => {
        mcRoom.addActivity(orderProduct)
    },
    name: "Talk to Alice",
    description: "Talk to Alice on the terrace",
})

export const aliceQuest = newQuest("aliceQuest",
    [
        talkAlice1Stage
    ],
    {
        name: "Help Alice",
    }
)

saveCommitment(talkAlice1Commit)
