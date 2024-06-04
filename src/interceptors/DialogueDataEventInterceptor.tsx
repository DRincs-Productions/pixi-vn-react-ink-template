import { CharacterBaseModel, getCharacterById, getChoiceMenuOptions, getDialogue } from '@drincs/pixi-vn';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { choiceMenuState } from '../atoms/choiceMenuState';
import { dialogDataState } from '../atoms/dialogDataState';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import { nextStepButtonHiddenState } from '../atoms/nextStepButtonHiddenState';
import { reloadInterfaceDataEventState } from '../atoms/reloadInterfaceDataEventState';

export default function DialogueDataEventInterceptor() {
    const reloadInterfaceDataEvent = useRecoilValue(reloadInterfaceDataEventState);
    const { t } = useTranslation(["translation"]);
    const hideInterface = useRecoilValue(hideInterfaceState)
    const setNextStepButtonHidden = useSetRecoilState(nextStepButtonHiddenState)
    const [{ text, character }, setDialogData] = useRecoilState(dialogDataState)
    const [menu, setMenu] = useRecoilState(choiceMenuState)

    useEffect(() => {
        let dial = getDialogue()
        let newText: string | undefined = dial?.text
        let newCharacter: CharacterBaseModel | undefined = undefined
        if (dial) {
            newCharacter = dial.characterId ? getCharacterById(dial.characterId) : undefined
            if (!newCharacter && dial.characterId) {
                newCharacter = new CharacterBaseModel(dial.characterId, { name: t(dial.characterId) })
            }
        }
        try {
            if (dial !== text || newCharacter !== character) {
                setDialogData({
                    text: newText,
                    character: newCharacter,
                    hidden: !hideInterface || newText ? false : true,
                })
            }
        } catch (e) { }
        let m = getChoiceMenuOptions()
        setMenu(m)
    }, [reloadInterfaceDataEvent])

    useEffect(() => {
        setNextStepButtonHidden(hideInterface || menu ? true : false)
    }, [menu, hideInterface])

    useEffect(() => {
        setDialogData((prev) => {
            return {
                ...prev,
                visible: !hideInterface && prev.text ? true : false,
            }
        })
    }, [hideInterface])

    return null
}
