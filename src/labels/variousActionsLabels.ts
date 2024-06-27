import { ChoiceMenuOption, ChoiceMenuOptionClose, ChoiceMenuOptionsType, newLabel, setChoiceMenuOptions, setDialogue } from "@drincs/pixi-vn";
import { aliceQuest } from "../quests/aliceQuest";
import { orderProduct, takeProduct } from "../values/activity";
import { liam } from "../values/characters";
import { mcRoom, terrace } from "../values/rooms";

export const orderProductLabel = newLabel("OrderProductLabel",
    [
        () => setDialogue(`OK! Let's see, let's look for a book....`),
        (props) => {
            setDialogue(`Here's R****, for $1. Just the thing for me.`)
            mcRoom.removeActivity(orderProduct)
            aliceQuest.completeCurrentStageAndGoNext(props, {})
        },
    ]
)

export const takeKeyLabel = newLabel("TakeKeyLabel",
    [
        (props) => {
            setDialogue(`Are these the car keys?! Well... I should try to access the car!`)
            terrace.removeActivity(takeProduct)
            aliceQuest.completeCurrentStageAndGoNext(props, {})
        },
    ]
)

const talkSleepResultLabel = newLabel("TalkSleepResultLabel",
    [
        () => setDialogue(liam.name + "!!!! What are you doing?!!"),
        () => setDialogue("Get out of here! Now!"),
    ]
)
export const talkSleepLabel = newLabel("TalkSleepLabel",
    [
        () => {
            setDialogue("zZz zZz ...")
            setChoiceMenuOptions([
                new ChoiceMenuOption(
                    "Try waking up",
                    talkSleepResultLabel
                ),
                new ChoiceMenuOptionClose("Leave her alone"),
            ])
        },
    ]
)

export const talkAliceQuest = newLabel("talkAliceQuest",
    () => {
        if (aliceQuest.currentStageIndex == 0) {
            return [
                () => setDialogue("Hi, can you order me a new book from pc?"),
                () => setDialogue("Ok"),
                (props) => {
                    setDialogue("Thanks")
                    aliceQuest.completeCurrentStageAndGoNext(props, {})
                },
            ]
        }
        else if (aliceQuest.currentStageIndex == 1) {
            return [
                () => setDialogue("What book do you want me to order?"),
                () => setDialogue("For me it is the same."),
            ]
        }
        else if (aliceQuest.currentStageIndex == 2) {
            return [
                () => setDialogue("I ordered the Book, hope you enjoy it."),
                () => setDialogue("Great, when it arrives remember to bring it to me."),
            ]
        }
        else if (aliceQuest.currentStageIndex == 3) {
            return [
                () => setDialogue("Here's your book."),
                (props) => {
                    setDialogue("Thank you, I can finally read something new.")
                    aliceQuest.completeCurrentStageAndGoNext(props, {})
                },
            ]
        }
        return [
            () => setDialogue("Thanks for the book."),
        ]
    }
)
export const aliceTalkMenuLabel = newLabel("AliceTalkMenuLabel",
    [
        () => {
            setDialogue("Hi, what do you want to talk about?")
            let optionsMenu: ChoiceMenuOptionsType = []
            if (aliceQuest.started) {
                optionsMenu.push(new ChoiceMenuOption(
                    "About the book",
                    talkAliceQuest
                ))
            }
            setChoiceMenuOptions([
                ...optionsMenu,
                new ChoiceMenuOptionClose("Cancel"),
            ])
        },
    ]
)
