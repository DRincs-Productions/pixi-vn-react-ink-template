import { CharacterBaseModel, getCharacterById, getDialogueHistory } from '@drincs/pixi-vn';
import { ModalDialogExtended } from '@drincs/react-components';
import CheckIcon from '@mui/icons-material/Check';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Chip, Input, Stack, Typography } from "@mui/joy";
import Avatar from '@mui/joy/Avatar';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { openHistoryState } from '../atoms/openHistoryState';

export default function History() {
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
        if (event.code == 'KeyH') {
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
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    minHeight: 0,
                    px: 2,
                    py: 3,
                    overflowY: 'scroll',
                    flexDirection: 'column-reverse',
                }}
            >
                <Stack spacing={2} justifyContent="flex-end">
                    {getDialogueHistory()
                        .map((step) => {
                            let character = step.dialoge?.characterId ? getCharacterById(step.dialoge?.characterId) ?? new CharacterBaseModel(step.dialoge?.characterId, { name: t(step.dialoge?.characterId) }) : undefined
                            return {
                                character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
                                text: t(step.dialoge?.text || ""),
                                icon: character?.icon,
                                choices: step.choices?.map((choice) => {
                                    return {
                                        text: t(choice.text),
                                        isResponse: choice.label === step.choiceMade?.label,
                                    }
                                }),
                            }
                        })
                        .filter((data) => {
                            if (!searchString) return true
                            return data.character?.toLowerCase().includes(searchString.toLowerCase()) || data.text?.toLowerCase().includes(searchString.toLowerCase())
                        })
                        .map((data, index) => {
                            return <React.Fragment key={index}>
                                <Stack
                                    direction="row"
                                    spacing={1.5}
                                >
                                    <Avatar
                                        size="sm"
                                        src={data.icon}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        {data.character && <Typography level="title-sm">{data.character}</Typography>}
                                        <Typography level="body-sm">{data.text}</Typography>
                                    </Box>
                                </Stack>
                                <Stack
                                    direction="row"
                                    spacing={0.5}
                                >
                                    <Box sx={{ flex: 1 }}>
                                        {data.choices && data.choices.map((choice, index) => {
                                            if (choice.isResponse) {
                                                return <Chip
                                                    key={"choices-success" + index}
                                                    color="success"
                                                    endDecorator={<CheckIcon />}
                                                >
                                                    {choice.text}
                                                </Chip>
                                            }
                                            return <Chip
                                                key={"choices" + index}
                                                color="primary"
                                            >
                                                {choice.text}
                                            </Chip>
                                        })}
                                    </Box>
                                </Stack>
                            </React.Fragment>
                        })}
                </Stack>
            </Box>
        </ModalDialogExtended>
    );
}
