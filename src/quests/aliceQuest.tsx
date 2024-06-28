import { addCommitment, CommitmentBaseModel, newQuest, removeCommitment, saveCommitment, Stage } from "@drincs/nqtr";
import { GameStepManager } from "@drincs/pixi-vn";
import { talkAliceQuest } from "../labels/variousActionsLabels";
import { orderProduct, takeProduct } from "../values/activity";
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

export const aliceQuest = newQuest("aliceQuest",
    [ // stages
        new Stage("talk_alice1", {
            onStart: () => {
                addCommitment(talkAlice1Commit)
            },
            name: "Talk to Alice",
            description: "Talk to Alice on the terrace",
        }),
        new Stage("order_products", {
            onStart: () => {
                mcRoom.addActivity(orderProduct)
            },
            name: "Order products",
            description: "Order the products with your PC",
        }),
        new Stage("take_products", {
            onStart: (_, props) => {
                terrace.addActivity(takeProduct)
                props.notify("You can take the products on the Terrace", "info")
            },
            name: "Take products",
            description: "Take products on the Terrace",
            requestDescriptionToStart: "Wait for the products you ordered to arrive (2 day)",
            daysRequiredToStart: 2,
        }),
        new Stage("talk_alice2", {
            name: "Talk to Alice",
            description: "Talk to Alice on the terrace",
        }),
    ],
    { // props
        name: "Help Alice",
        description: "To learn more about how the repo works, Talk to Alice. \nGoing when she is there will automatically start an \"Event\" (see aliceQuest.tsx to learn more). \nAfter that an action will be added to open the pc, in MC room. \n\n(during the quest you can talk to Alice and you will see her talking during the quests of the same Quest)",
        renderImage: "https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/terrace0A.webp",
        onStart: (quest, { notify, t }) => {
            notify(t("notify_quest_is_started", { quest: quest.name }), "info")
        },
        onNextStage: (stage, { notify, t }) => {
            notify(t("notify_quest_is_updated", { quest: stage.name }), "info")
        }
    }
)

saveCommitment(talkAlice1Commit)
