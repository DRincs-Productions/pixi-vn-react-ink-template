import { GameWindowManager } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Box, DragHandleDivider, resizeWindowsHandler, Sheet, Typewriter, Typography } from '@drincs/react-components';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { motion } from "framer-motion";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { dialogDataState } from '../atoms/dialogDataState';
import { typewriterDelayState } from '../atoms/typewriterDelayState';
import ChoiceMenu from './ChoiceMenu';
import NextButton from './NextButton';

export default function Dialogue({ nextOnClick }: {
    nextOnClick: (props: StepLabelProps) => void,
}) {
    const [windowSize, setWindowSize] = useState({
        x: 0,
        y: 300 * GameWindowManager.screenScale,
    });
    const [imageSize, setImageSize] = useState({
        x: 300 * GameWindowManager.screenScale,
        y: 0,
    })
    const { t } = useTranslation(["translation"]);
    const typewriterDelay = useRecoilValue(typewriterDelayState)
    const { text, character, hidden } = useRecoilValue(dialogDataState)

    return (
        <>
            <ChoiceMenu
                marginButton={windowSize.y}
                fullscreen={text ? false : true}
            />
            <Box
                sx={{
                    width: '100%',
                    position: "absolute",
                    bottom: { xs: 14, sm: 18, md: 20, lg: 24, xl: 30 },
                    left: 0,
                    right: 0,
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: -5,
                        width: "100%",
                        zIndex: 100,
                    }}
                    component={motion.div}
                    animate={{
                        opacity: hidden ? 0 : 1,
                        y: hidden ? windowSize.y : 0,
                        pointerEvents: hidden ? "none" : "auto",
                    }}
                    transition={{ type: "tween" }}
                >
                    <DragHandleDivider
                        orientation="horizontal"
                        onMouseDown={(e) => resizeWindowsHandler(e, windowSize, setWindowSize)}
                    />
                </Box>
                <Card
                    orientation="horizontal"
                    sx={{
                        overflow: 'auto',
                        height: windowSize.y,
                        gap: 1,
                    }}
                    component={motion.div}
                    animate={{
                        opacity: hidden ? 0 : 1,
                        y: hidden ? windowSize.y : 0,
                        pointerEvents: hidden ? "none" : "auto",
                    }}
                    transition={{ type: "tween" }}
                >
                    {character && <>
                        <AspectRatio
                            flex
                            ratio="1"
                            maxHeight={"20%"}
                            sx={{
                                height: "100%",
                                minWidth: imageSize.x,
                            }}
                        >
                            <img
                                src={character.icon}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>
                        <DragHandleDivider
                            orientation="vertical"
                            onMouseDown={(e) => resizeWindowsHandler(e, imageSize, setImageSize)}
                            sx={{
                                width: 0,
                                left: -8,
                            }}
                        />
                    </>}
                    <CardContent>
                        {character && character.name && <Typography fontSize="xl" fontWeight="lg"
                            sx={{
                                color: character.color,
                            }}

                        >
                            {(character.prefix ? t(character.prefix) + " " : "") + character.name}
                        </Typography>}
                        <Sheet
                            sx={{
                                bgcolor: 'background.level1',
                                borderRadius: 'sm',
                                p: 1.5,
                                minHeight: 10,
                                display: 'flex',
                                flex: 1,
                                overflow: 'auto',
                            }}
                        >
                            {typewriterDelay !== 0
                                ? <Typewriter
                                    text={text || ""}
                                    delay={localStorage.getItem('typewriter_delay_millisecond')! as unknown as number}
                                />
                                : text}
                        </Sheet>
                    </CardContent>
                </Card>
                <NextButton
                    nextOnClick={nextOnClick}
                />
            </Box>
        </>
    );
}
