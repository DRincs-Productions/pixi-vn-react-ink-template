import { ChoiceMenuOptionsType, clearChoiceMenuOptions, GameStepManager, GameWindowManager } from '@drincs/pixi-vn';
import { Box, Grid } from '@drincs/react-components';
import { motion, Variants } from "framer-motion";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { hideInterfaceState } from '../atoms/hideInterfaceState';
import DialogueMenuButton from '../components/DialogueMenuButton';
import { useMyNavigate } from '../utility/useMyNavigate';

type IProps = {
    menu?: ChoiceMenuOptionsType,
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
    const hideInterface = useRecoilValue(hideInterfaceState)
    const [showList, setShowList] = useState(false)
    useEffect(() => {
        if (!menu || !(menu.length > 0)) {
            setShowList(false)
            return
        }
        let timer = setTimeout(() => {
            setShowList(true)
        }, 1)
        return () => {
            clearTimeout(timer)
        }
    }, [menu])
    const showMenu = showList && !hideInterface
    const itemVariants: Variants = {
        open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
    };

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
            component={motion.div}
            initial={false}
            animate={showMenu ? "open" : "closed"}
            className="menu"
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
                component={motion.div}
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.7,
                            delayChildren: 0.3,
                            staggerChildren: 0.05
                        }
                    },
                    closed: {
                        clipPath: "inset(10% 50% 90% 50% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3
                        }
                    }
                }}
            >
                {menu?.map((item, index) => {
                    return (
                        <Grid
                            key={index}
                            justifyContent="center"
                            alignItems="center"
                            component={motion.div}
                            variants={itemVariants}
                        >
                            <DialogueMenuButton
                                loading={loading}
                                onClick={() => {
                                    setLoading(true)
                                    clearChoiceMenuOptions()
                                    if (item.type == "call") {
                                        GameStepManager.callLabel(item.label, {
                                            navigate: navigate,
                                            t: t,
                                            ...item.props
                                        })
                                            .then(() => {
                                                afterClick && afterClick()
                                                setLoading(false)
                                            })
                                            .catch((e) => {
                                                setLoading(false)
                                                console.error(e)
                                            })
                                    }
                                    else if (item.type == "jump") {
                                        GameStepManager.jumpLabel(item.label, {
                                            navigate: navigate,
                                            t: t,
                                            ...item.props
                                        })
                                            .then(() => {
                                                afterClick && afterClick()
                                                setLoading(false)
                                            })
                                            .catch((e) => {
                                                setLoading(false)
                                                console.error(e)
                                            })
                                    }
                                    else if (item.type == "close") {
                                        GameStepManager.closeChoiceMenu(item.label, {
                                            navigate: navigate,
                                            t: t,
                                            ...item.props
                                        })
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
                                {item.text}
                            </DialogueMenuButton>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    );
}
