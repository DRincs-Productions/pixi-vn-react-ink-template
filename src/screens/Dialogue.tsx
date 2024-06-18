import { GameWindowManager } from '@drincs/pixi-vn';
import { StepLabelProps } from '@drincs/pixi-vn/dist/override';
import { Box, DragHandleDivider, resizeWindowsHandler, Sheet, Typewriter, Typography } from '@drincs/react-components';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { dialogDataState } from '../atoms/dialogDataState';
import { typewriterDelayState } from '../atoms/typewriterDelayState';
import ChoicesMenu from './ChoicesMenu';
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
            <ChoicesMenu
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
                <AnimatePresence>
                    <Box
                        key={"divider"}
                        sx={{
                            position: "absolute",
                            top: -5,
                            width: "100%",
                            zIndex: 100,
                        }}
                        component={motion.div}
                        variants={{
                            open: {
                                opacity: 1,
                                y: 0,
                                pointerEvents: "auto",
                            },
                            closed: {
                                opacity: 0,
                                y: windowSize.y,
                                pointerEvents: "none",
                            }
                        }}
                        initial={"closed"}
                        animate={hidden ? "closed" : "open"}
                        exit={"closed"}
                        transition={{ type: "tween" }}
                    >
                        <DragHandleDivider
                            orientation="horizontal"
                            onMouseDown={(e) => resizeWindowsHandler(e, windowSize, setWindowSize)}
                        />
                    </Box>
                    <Card
                        key={"dialogue-card"}
                        orientation="horizontal"
                        sx={{
                            overflow: 'auto',
                            height: windowSize.y,
                            gap: 1,
                        }}
                        component={motion.div}
                        variants={{
                            open: {
                                opacity: 1,
                                y: 0,
                                pointerEvents: "auto",
                            },
                            closed: {
                                opacity: 0,
                                y: windowSize.y,
                                pointerEvents: "none",
                            }
                        }}
                        initial={"closed"}
                        animate={hidden ? "closed" : "open"}
                        exit={"closed"}
                        transition={{ type: "tween" }}
                    >
                        {character && <AspectRatio
                            flex
                            ratio="1"
                            maxHeight={"20%"}
                            sx={{
                                height: "100%",
                                minWidth: imageSize.x,
                            }}
                            component={motion.div}
                            variants={{
                                open: {
                                    opacity: 1,
                                    scale: 1,
                                    pointerEvents: "auto",
                                },
                                closed: {
                                    opacity: 0,
                                    scale: 0,
                                    pointerEvents: "none",
                                }
                            }}
                            initial={"closed"}
                            animate={character?.icon ? "open" : "closed"}
                            exit={"closed"}
                            transition={{ type: "tween" }}
                        >
                            <img
                                src={character?.icon}
                                loading="lazy"
                                alt=""
                            />
                        </AspectRatio>}
                        {character && <Box
                            component={motion.div}
                            variants={{
                                open: {
                                    opacity: 1,
                                    x: 0,
                                    pointerEvents: "auto",
                                },
                                closed: {
                                    opacity: 0,
                                    x: -100,
                                    pointerEvents: "none",
                                }
                            }}
                            initial={"closed"}
                            animate={character?.icon ? "open" : "closed"}
                            exit={"closed"}
                            transition={{ type: "tween" }}
                        >
                            <DragHandleDivider
                                orientation="vertical"
                                onMouseDown={(e) => resizeWindowsHandler(e, imageSize, setImageSize)}
                                sx={{
                                    width: 0,
                                    height: "100%",
                                    left: -8,
                                }}
                            />
                        </Box>}
                        <CardContent>
                            <AnimatePresence>
                                {character && character.name && <Typography
                                    fontSize="xl"
                                    fontWeight="lg"
                                    sx={{
                                        color: character.color,
                                    }}
                                    component={motion.div}
                                    variants={{
                                        open: {
                                            opacity: 1,
                                            pointerEvents: "auto",
                                            scale: 1,
                                        },
                                        closed: {
                                            opacity: 0,
                                            pointerEvents: "none",
                                            scale: 0,
                                        }
                                    }}
                                    initial={"closed"}
                                    animate={character.name ? "open" : "closed"}
                                    exit={"closed"}
                                >
                                    {(character.prefix ? t(character.prefix) + " " : "") + character.name}
                                </Typography>}
                            </AnimatePresence>
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
                                <Typewriter
                                    text={text || ""}
                                    delay={typewriterDelay}
                                />
                            </Sheet>
                        </CardContent>
                    </Card>
                    <NextButton
                        nextOnClick={nextOnClick}
                    />
                </AnimatePresence>
            </Box>
        </>
    );
}
