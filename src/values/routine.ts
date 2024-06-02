import { CommitmentBaseModel, saveCommitment } from "@drincs/nqtr";
import { alice } from "./characters";
import { aliceRoom } from "./rooms";

const aliceSleep = new CommitmentBaseModel("alice_sleep", alice, aliceRoom, {
    toHour: 20,
    fromHour: 10,
    renderImage: 'https://raw.githubusercontent.com/DRincs-Productions/NQTR-System/main/game/images/Alice/roomsleep0A.webp',
})

saveCommitment(aliceSleep)
