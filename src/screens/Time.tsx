import { TimeManager } from '@drincs/nqtr';
import { RoundIconButton, Stack, Typography } from '@drincs/react-components';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';
import { wait } from '../utility/TimeUtility';

export default function Time(props: {
    hour: number;
    setHour: (time: number) => void;
}) {
    const { t } = useTranslation(["translation"]);
    const { setHour, hour } = props;

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
                marginTop: "0.5rem",
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
                >
                    {hour > 9 ? `${hour}:00` : `0${hour}:00`}
                </Typography>
                <RoundIconButton
                    variant='outlined'
                    ariaLabel={t("wait")}
                    sx={{
                        padding: 0,
                        border: 0,
                        marginTop: "0.5rem",
                    }}
                    onClick={() => {
                        wait(1)
                        setHour(TimeManager.currentHour)
                    }}
                >
                    <AccessTimeIcon
                        sx={{
                            fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.5rem", lg: "1.7rem", xl: "2rem" },
                        }}
                    />
                </RoundIconButton>
            </Stack>
            <Typography
                fontSize={{ xs: "0.8rem", sm: "1rem", md: "1.2rem", lg: "1.5rem", xl: "2rem" }}
            >
                {TimeManager.currentDayName ? t(TimeManager.currentDayName) : ""}
            </Typography>
        </Stack>
    );
}
