import { ModalDialogExtended } from '@drincs/react-components';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import { Box, Button, DialogContent, DialogTitle, Divider, Drawer, FormHelperText, FormLabel, IconButton, ModalClose, Sheet, Slider, Stack, ToggleButtonGroup, Tooltip, Typography, useColorScheme } from "@mui/joy";
import { useEffect, useState } from 'react';
import { HuePicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { openSettingsState } from '../atoms/openSettingsState';
import { typewriterDelayState } from '../atoms/typewriterDelayState';
import { useEditColorProvider } from '../providers/ThemeProvider';
import { useMyNavigate } from '../utility/useMyNavigate';

export default function Settings() {
    const [open, setOpen] = useRecoilState(openSettingsState);
    const { mode, setMode } = useColorScheme();
    const { primaryColor, setPrimaryColor, setSolidColor, solidColor } = useEditColorProvider()
    const navigate = useMyNavigate();
    const location = useLocation();
    const [openYouSure, setOpenYouSure] = useState(false)
    const [autoTime, setAutoTime] = useState(localStorage.getItem('auto_forward_second') ? parseInt(localStorage.getItem('auto_forward_second')!) : 1)
    const [typewriterDelay, setTypewriterDelay] = useRecoilState(typewriterDelayState)
    const [fullScreenEnabled, setFullScreenEnabled] = useState(false)
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'Escape') {
            setOpen((prev) => !prev)
        }
    }

    useEffect(() => {
        // Debouncing
        const setAuto = setTimeout(() => {
            localStorage.setItem('auto_forward_second', autoTime.toString())
        }, 500)

        return () => {
            clearTimeout(setAuto)
        }
    }, [autoTime])

    useEffect(() => {
        // Debouncing
        const setTypewriter = setTimeout(() => {
            localStorage.setItem('typewriter_delay_millisecond', typewriterDelay.toString())
        }, 500)

        return () => {
            clearTimeout(setTypewriter)
        }
    }, [typewriterDelay])

    return (
        <>
            <Drawer
                size="md"
                variant="plain"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    content: {
                        sx: {
                            bgcolor: 'transparent',
                            p: { md: 3, sm: 0 },
                            boxShadow: 'none',
                        },
                    },
                }}
            >
                <Sheet
                    sx={{
                        borderRadius: 'md',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <DialogTitle>{t("settings")}</DialogTitle>
                    <ModalClose />
                    <Divider sx={{ mt: 'auto' }} />
                    <DialogContent sx={{ gap: 2 }}>
                        <Typography level="title-md" fontWeight="bold">
                            {t("dialogues")}
                        </Typography>
                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                {t("auto_forward_time")}
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                {t("auto_forward_time_description")}
                            </FormHelperText>
                        </Box>
                        <Box
                            sx={{
                                paddingX: 3,
                            }}
                        >
                            <Slider
                                defaultValue={autoTime}
                                getAriaValueText={(value) => `${value}s`}
                                step={1}
                                marks={[
                                    {
                                        value: 1,
                                        label: '1s',
                                    },
                                    {
                                        value: 10,
                                        label: '10s',
                                    },
                                ]}
                                valueLabelDisplay="on"
                                max={10}
                                min={1}
                                onChange={(_, value) => {
                                    if (value)
                                        setAutoTime(value as number)
                                }}
                            />
                        </Box>
                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                {t("text_speed")}
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                {t("text_speed_description")}
                            </FormHelperText>
                        </Box>
                        <Box
                            sx={{
                                paddingX: 3,
                            }}
                        >
                            <Slider
                                defaultValue={typewriterDelay}
                                getAriaValueText={(value) => `${value}ms`}
                                step={10}
                                marks={[
                                    {
                                        value: 0,
                                        label: '0ms',
                                    },
                                    {
                                        value: 200,
                                        label: '200ms',
                                    },
                                ]}
                                valueLabelDisplay="on"
                                max={200}
                                min={0}
                                onChange={(_, value) => {
                                    setTypewriterDelay(value as number || 0)
                                }}
                            />
                        </Box>

                        <Typography level="title-md" fontWeight="bold">
                            {t("display")}
                        </Typography>
                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                {t("fullscreen")}
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                {t("fullscreen_description")}
                            </FormHelperText>
                        </Box>
                        <Button
                            onClick={() => {
                                if (fullScreenEnabled) {
                                    document.exitFullscreen()
                                    setFullScreenEnabled(false)
                                } else {
                                    document.documentElement.requestFullscreen()
                                    setFullScreenEnabled(true)
                                }
                            }}
                            startDecorator={fullScreenEnabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        >
                            {fullScreenEnabled ? t('exit_fullscreen') : t('enter_fullscreen')}
                        </Button>

                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                {t("theme_mode")}
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                {t("theme_mode_description")}
                            </FormHelperText>
                        </Box>
                        <ToggleButtonGroup
                            value={mode}
                            onChange={(_, newValue) => {
                                if (newValue)
                                    setMode(newValue)
                            }}
                        >
                            <Tooltip title="Light Mode">
                                <IconButton value="light">
                                    <LightModeIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="System Mode">
                                <IconButton value="system">
                                    <AutoModeIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Dark Mode">
                                <IconButton value="dark">
                                    <DarkModeIcon />
                                </IconButton>
                            </Tooltip>
                        </ToggleButtonGroup>

                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                {t("primary_color")}
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                {t("primary_color_description")}
                            </FormHelperText>
                        </Box>
                        <Box
                            sx={{
                                paddingX: 3,
                            }}
                        >
                            <HuePicker
                                width='99%'
                                color={primaryColor}
                                onChange={(color) => setPrimaryColor(color.hex)}
                                styles={{
                                    default: {
                                        picker: {
                                            minHeight: '15px',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box>
                            <FormLabel sx={{ typography: 'title-sm' }}>
                                {t("solid_color")}
                            </FormLabel>
                            <FormHelperText sx={{ typography: 'body-sm' }}>
                                {t("solid_color_description")}
                            </FormHelperText>
                        </Box>
                        <ToggleButtonGroup
                            value={solidColor}
                            onChange={(_, newValue) => {
                                if (newValue)
                                    setSolidColor(newValue)
                            }}
                        >
                            <Tooltip title="White">
                                <IconButton value="white">
                                    <WbIncandescentIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Black">
                                <IconButton value="black">
                                    <ModeNightIcon />
                                </IconButton>
                            </Tooltip>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup
                            color="primary"
                            variant="solid"
                        >
                            <Button>{t("example")}</Button>
                        </ToggleButtonGroup>
                    </DialogContent>
                    {location.pathname !== '/' && <>
                        <Divider sx={{ mt: 'auto' }} />
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            useFlexGap
                            spacing={1}
                        >
                            <Button
                                variant="outlined"
                                color="danger"
                                startDecorator={<ExitToAppIcon />}
                                onClick={() => setOpenYouSure(true)}
                            >
                                {t("return_main_menu")}
                            </Button>
                        </Stack>
                    </>}
                </Sheet>
            </Drawer>

            <ModalDialogExtended
                open={openYouSure}
                setOpen={setOpenYouSure}
                color='danger'
                head={<Typography level="h4"
                    startDecorator={<ExitToAppIcon />}
                >
                    {t("attention")}
                </Typography>}
                actions={<>
                    <Button
                        key={'exit'}
                        color='danger'
                        variant="outlined"
                        onClick={() => {
                            navigate('/')
                            setOpen(false)
                            setOpenYouSure(false)
                        }}
                        startDecorator={<ExitToAppIcon />}
                    >
                        {t("exit")}
                    </Button>
                    <Button
                        key={'cancel'}
                        color="neutral"
                        variant="plain"
                        onClick={() => setOpenYouSure(false)}
                    >
                        {t("cancel")}
                    </Button>
                </>}
            >
                <Typography>
                    {t("you_sure_to_return_main_menu")}
                </Typography>
            </ModalDialogExtended>
        </>
    );
}
