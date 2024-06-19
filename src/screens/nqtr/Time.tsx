import { TimeManager } from '@drincs/nqtr';
import { RoundIconButton, Stack, Typography, useTheme } from '@drincs/react-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { currentHourState } from '../../atoms/currentHourState';
import { wait } from '../../utility/TimeUtility';

export default function Time() {
    const { t } = useTranslation(["translation"]);
    const [hour, setHour] = useRecoilState(currentHourState);

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
                marginTop: "0.5rem",
                opacity: 0.5,
                ":hover": {
                    opacity: 1,
                },
            }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
                height={{ xs: "0.7rem", sm: "1rem", md: "1.5rem", lg: "2rem", xl: "3rem" }}
            >
                <Typography
                    fontSize={{ xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem", xl: "4rem" }}
                    sx={{
                        color: useTheme().palette.common.white,
                        textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${useTheme().palette.common.black}`,
                        pointerEvents: "auto",
                        userSelect: "none",
                    }}
                >
                    {hour > 9 ? `${hour}:00` : `0${hour}:00`}
                </Typography>
                <RoundIconButton
                    variant="soft"
                    ariaLabel={t("wait")}
                    sx={{
                        padding: 0,
                        border: 0,
                        marginTop: "0.5rem",
                        backgroundColor: "#0000007c",
                    }}
                    onClick={() => {
                        wait(1)
                        setHour(TimeManager.currentHour)
                    }}
                    elevation="sm"
                >
                    <AccessTimeIcon
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.5rem", lg: "1.7rem", xl: "2rem" },
                            color: useTheme().palette.common.white,
                        }}
                    />
                </RoundIconButton>
            </Stack>
            <Typography
                fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem", xl: "2rem" }}
                sx={{
                    color: useTheme().palette.common.white,
                    textShadow: `0 0 3px ${useTheme().palette.common.black}, 0 0 5px ${useTheme().palette.common.black}`,
                    pointerEvents: "auto",
                    userSelect: "none",
                }}
            >
                {TimeManager.currentDayName ? t(TimeManager.currentDayName) : ""}
            </Typography>
        </Stack>
    );
}
