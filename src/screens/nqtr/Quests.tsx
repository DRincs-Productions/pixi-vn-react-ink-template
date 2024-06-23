import { getAllStartedQuests, Quest } from '@drincs/nqtr';
import { Box, Link, ModalDialogExtended, Sheet } from '@drincs/react-components';
import { AspectRatio, Divider, Stack, Typography } from "@mui/joy";
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMyNavigate } from '../../utility/useMyNavigate';

export default function Memo() {
    const { t } = useTranslation(["translation"]);
    const navigate = useMyNavigate();
    const methods = useForm<{
        open: boolean,
        selectedQuest: Quest | undefined,
        questImage: string | undefined,
    }>({
        defaultValues: {
            open: false,
            selectedQuest: undefined,
            questImage: undefined,
        }
    });

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'KeyJ') {
            let open = methods.getValues("open")
            methods.setValue("open", !open)
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
                                {t("quests")}
                            </Typography>
                        </Stack>
                    </Stack>}
                    minWidth="80%"
                    sx={{
                        maxHeight: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            minHeight: '100%',
                        }}
                    >
                        <Sheet
                            className="Sidebar"
                            sx={{
                                position: 'sticky',
                                transition: 'transform 0.4s, width 0.4s',
                                width: 200,
                                top: 0,
                                p: 2,
                                flexShrink: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <Box>
                                {getAllStartedQuests().map((quest) => (
                                    <Box
                                        key={quest.id}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                        }}
                                    >
                                        <Link
                                            onClick={() => {
                                                methods.setValue("selectedQuest", quest)
                                                let image: string | undefined = undefined
                                                if (quest.renderImage) {
                                                    let renderImage = quest.renderImage({
                                                        navigate,
                                                        t,
                                                    })
                                                    if (typeof renderImage === "string") {
                                                        image = renderImage
                                                    }
                                                }
                                                methods.setValue("questImage", image)
                                            }}
                                        >
                                            {quest.name}
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </Sheet>
                        <Controller
                            control={methods.control}
                            name="selectedQuest"
                            render={({ field: { value: selectedQuest } }) => (
                                <Sheet
                                    component="main"
                                    className="MainContent"
                                    sx={{
                                        flex: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        minWidth: 0,
                                        gap: 1,
                                        overflow: "auto",
                                        p: 5,
                                    }}
                                >
                                    <Stack
                                        spacing={1}
                                    >
                                        {selectedQuest?.renderImage && <Controller
                                            control={methods.control}
                                            name="questImage"
                                            render={({ field: { value: questImage } }) => (
                                                <AspectRatio
                                                    maxHeight={"10dvh"}
                                                    objectFit="cover"
                                                >
                                                    <img
                                                        src={questImage}
                                                    />
                                                </AspectRatio>
                                            )}
                                        />}
                                        <Typography
                                            level="h2"
                                            textAlign={"center"}
                                        >
                                            {selectedQuest?.name}
                                        </Typography>
                                        <Typography
                                            maxHeight={"20dvh"}
                                            textColor={"primary.500"}
                                            sx={{
                                                overflowY: "auto",
                                            }}
                                        >
                                            {selectedQuest?.description}
                                        </Typography>
                                        <Divider />
                                        <Typography
                                            maxHeight={"20dvh"}
                                            sx={{
                                                overflowY: "auto",
                                            }}
                                        >
                                            {selectedQuest?.currentStage?.description}
                                        </Typography>
                                    </Stack>
                                </Sheet>
                            )}
                        />
                    </Box>
                </ModalDialogExtended>
            )}
        />
    );
}
