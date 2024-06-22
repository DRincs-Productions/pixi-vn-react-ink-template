import { Box, ModalDialogExtended, Sheet } from '@drincs/react-components';
import { AspectRatio, Divider, Stack, Typography } from "@mui/joy";
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function Quest() {
    const { t } = useTranslation(["translation"]);
    const methods = useForm<{
        open: boolean,
    }>({
        defaultValues: {
            open: false,
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
                                dwqe
                            </Box>
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
                                <AspectRatio
                                    maxHeight={"10dvh"}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
                                        srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800&dpr=2 2x"
                                        alt=""
                                    />
                                </AspectRatio>
                                <Typography
                                    level="h2"
                                    textAlign={"center"}
                                    maxHeight={"10dvh"}
                                    sx={{
                                        overflowY: "auto",
                                    }}
                                >
                                </Typography>
                                <Typography
                                    maxHeight={"20dvh"}
                                    sx={{
                                        overflowY: 'scroll',
                                    }}
                                >
                                </Typography>
                                <Divider />
                                <Typography
                                    maxHeight={"20dvh"}
                                    sx={{
                                        overflowY: 'scroll',
                                    }}
                                >
                                </Typography>
                            </Stack>
                        </Sheet>
                    </Box>
                </ModalDialogExtended>
            )}
        />
    );
}
