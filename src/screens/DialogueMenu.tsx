import { ChoiceMenuOptionsType, clearChoiceMenuOptions, GameStepManager, GameWindowManager, LabelRunModeEnum } from '@drincs/pixi-vn';
import { Box, Grid } from '@mui/joy';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DialogueMenuButton from '../components/DialogueMenuButton';
import { useMyNavigate } from '../utility/useMyNavigate';

type IProps = {
    menu: ChoiceMenuOptionsType,
    dialogueWindowHeight: number,
    fullscreen?: boolean,
    afterClick?: () => void,
}

export default function DialogueMenu(props: IProps) {
    const {
        menu,
        dialogueWindowHeight,
        fullscreen = true,
        afterClick,
    } = props;
    const [loading, setLoading] = useState(false)
    const height = GameWindowManager.screenHeight - dialogueWindowHeight
    const { t } = useTranslation(["translation"]);
    const navigate = useMyNavigate();

    return (
        <Box
            sx={{
                width: '100%',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: fullscreen ? "100%" : height,
            }}
        >
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    overflow: 'auto',
                    height: fullscreen ? "100%" : height,
                    gap: 1,
                    width: '100%',
                }}
            >
                {menu.map((item, index) => {
                    return (
                        <Grid
                            key={index}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <DialogueMenuButton
                                loading={loading}
                                onClick={() => {
                                    setLoading(true)
                                    clearChoiceMenuOptions()
                                    if (item.type == LabelRunModeEnum.OpenByCall) {
                                        GameStepManager.callLabel(item.label)
                                            .then((result) => {
                                                afterClick && afterClick()
                                                setLoading(false)
                                                if (result && result.newRoute) {
                                                    navigate(result.newRoute)
                                                }
                                            })
                                            .catch((e) => {
                                                setLoading(false)
                                                console.error(e)
                                            })
                                    }
                                    else if (item.type == LabelRunModeEnum.OpenByJump) {
                                        GameStepManager.jumpLabel(item.label)
                                            .then(() => {
                                                afterClick && afterClick()
                                                setLoading(false)
                                            })
                                            .catch((e) => {
                                                setLoading(false)
                                                console.error(e)
                                            })
                                    }
                                    else {
                                        setLoading(false)
                                        console.error("Unsupported label run mode")
                                    }
                                }}
                                sx={{
                                    left: 0,
                                    right: 0,
                                }}
                            >
                                {t(item.text)}
                            </DialogueMenuButton>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}
