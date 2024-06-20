import { Drawer, ModalDialogExtended, useThemeMaterial } from '@drincs/react-components';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Input, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { openHistoryState } from '../../atoms/openHistoryState';

export default function Quest() {
    const [open, setOpen] = useRecoilState(openHistoryState);
    const [searchString, setSearchString] = useState("")
    const { t } = useTranslation(["translation"]);

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'KeyJ') {
            setOpen((prev) => !prev)
        }
    }

    return (
        <ModalDialogExtended
            open={open}
            setOpen={setOpen}
            head={<Stack
                sx={{
                    width: "100%",
                }}
            >
                <Stack sx={{ mb: 2 }}>
                    <Typography level="h2">
                        {t("history")}
                    </Typography>
                </Stack>
                <Input
                    placeholder={t("search")}
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    startDecorator={<SearchRoundedIcon />}
                    aria-label={t("search")}
                />
            </Stack>}
            minWidth="80%"
            sx={{
                maxHeight: "80%",
            }}
        >
            <Drawer
                zIndex={useThemeMaterial().zIndex.drawer}
                width={200}
            >

            </Drawer>
        </ModalDialogExtended>
    );
}
