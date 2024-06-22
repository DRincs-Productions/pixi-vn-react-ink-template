import { CharacterBaseModel, getCharacterById, getDialogueHistory } from '@drincs/pixi-vn';
import { ModalDialogExtended } from '@drincs/react-components';
import CheckIcon from '@mui/icons-material/Check';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { Box, Chip, Input, Stack, Typography } from "@mui/joy";
import Avatar from '@mui/joy/Avatar';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DialogueModel } from '../model/DialogueModel';

type HistoryInfo = {
    character: string | undefined;
    text: string;
    icon: string | undefined;
    choices: {
        text: string;
        isResponse: boolean;
    }[] | undefined;
}

export default function History() {
    const { t } = useTranslation(["translation"]);
    const methods = useForm<{
        open: boolean,
        searchString: string,
        history: HistoryInfo[]
    }>({
        defaultValues: {
            open: false,
            history: [],
            searchString: "",
        }
    });

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'KeyH') {
            let open = methods.getValues("open")
            if (!open) {
                methods.setValue("open", !open)
                let list: HistoryInfo[] = getDialogueHistory<DialogueModel>()
                    .map((step) => {
                        let character = step.dialoge?.characterId ? getCharacterById(step.dialoge?.characterId) ?? new CharacterBaseModel(step.dialoge?.characterId, { name: t(step.dialoge?.characterId) }) : undefined
                        return {
                            character: character?.name ? character.name + (character.surname ? " " + character.surname : "") : undefined,
                            text: step.dialoge?.text || "",
                            icon: character?.icon,
                            choices: step.choices?.map((choice) => {
                                return {
                                    text: choice.text,
                                    isResponse: choice.isResponse,
                                }
                            })
                        }
                    })
                methods.setValue("history", list)
            }
        }
    }

    return (
        <Controller
            control={methods.control}
            name="open"
            render={({ field: { value: open } }) => (
                <ModalDialogExtended
                    open={open}
                    setOpen={(value) => methods.setValue("open", value)}
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
                        <Controller
                            control={methods.control}
                            name="searchString"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder={t("search")}
                                    value={value}
                                    onChange={onChange}
                                    startDecorator={<SearchRoundedIcon />}
                                    aria-label={t("search")}
                                />
                            )}
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
                            <Controller
                                control={methods.control}
                                name="history"
                                render={({ field: { value } }) => (
                                    <Controller
                                        control={methods.control}
                                        name="searchString"
                                        render={({ field: { value: searchString } }) => {
                                            let list = value.filter((data) => {
                                                if (!searchString) return true
                                                return data.character?.toLowerCase().includes(searchString.toLowerCase()) || data.text?.toLowerCase().includes(searchString.toLowerCase())
                                            })
                                                .map((data, index) => {
                                                    return <React.Fragment key={"history" + index}>
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
                                                })
                                            return <>{list}</>
                                        }}
                                    />
                                )}
                            />
                        </Stack>
                    </Box>
                </ModalDialogExtended>
            )}
        />
    )
}
