import { getAllStartedQuests } from '@drincs/nqtr';
import { Box, Link, ModalDialogExtended, Sheet } from '@drincs/react-components';
import { AspectRatio, Divider, Stack, Typography } from "@mui/joy";
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMyNavigate } from '../../utility/useMyNavigate';

type QuestDescription = {
    id: string;
    name: string;
    description: string;
    currentStage: {
        description: string;
    }
    questImage?: string,
}

export default function Memo() {
    const { t } = useTranslation(["translation"]);
    const navigate = useMyNavigate();
    const methods = useForm<{
        open: boolean,
        selectedQuest: QuestDescription | undefined,
        quests: QuestDescription[],
    }>({
        defaultValues: {
            open: false,
            selectedQuest: undefined,
            quests: [],
        }
    });
    const selectedQuest = methods.getValues("selectedQuest")

    useEffect(() => {
        window.addEventListener('keydown', onkeydown);
        return () => {
            window.removeEventListener('keydown', onkeydown);
        };
    }, []);

    function onkeydown(event: KeyboardEvent) {
        if (event.code == 'KeyJ') {
            let open = methods.getValues("open")
            if (!open) {
                let selectedQuest = methods.getValues("selectedQuest")
                methods.setValue("open", !open)
                let quests: QuestDescription[] = getAllStartedQuests().map((quest) => {
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
                    return {
                        id: quest.id,
                        name: quest.name,
                        description: quest.description,
                        currentStage: {
                            description: quest.currentStage?.description || "",
                        },
                        questImage: image,
                    }
                })
                methods.setValue("quests", quests)
                if (!selectedQuest && quests.length > 0) {
                    methods.setValue("selectedQuest", quests[0])
                }
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
                            <Controller
                                control={methods.control}
                                name="quests"
                                render={({ field: { value: quests } }) => (
                                    <Box>
                                        {quests.map((quest) => (
                                            <Box
                                                key={quest.id}
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1,
                                                }}
                                            >
                                                <Link
                                                    selected={selectedQuest?.id === quest.id}
                                                    onClick={() => {
                                                        methods.setValue("selectedQuest", quest)
                                                    }}
                                                >
                                                    {quest.name}
                                                </Link>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            />
                        </Sheet>
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
                                {selectedQuest?.questImage && <AspectRatio
                                    maxHeight={"10dvh"}
                                    objectFit="cover"
                                >
                                    <img
                                        src={selectedQuest.questImage}
                                    />
                                </AspectRatio>}
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
                    </Box>
                </ModalDialogExtended>
            )}
        />
    );
}
