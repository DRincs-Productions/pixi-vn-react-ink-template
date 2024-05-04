import { Button, ButtonProps } from "@drincs/react-components";

export default function MenuButton(props: ButtonProps) {
    const {
        sx,
        ...rest
    } = props;

    return (
        <Button
            size="sm"
            sx={{
                fontSize: { xs: "0.75rem", sm: "0.75rem", md: "1rem", lg: "1.25rem", xl: "1.5rem" },
                ...sx
            }}
            {...rest}
        />
    );
}
