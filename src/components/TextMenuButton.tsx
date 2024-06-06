import { Link, LinkProps } from "@drincs/react-components";

export default function TextMenuButton(props: LinkProps) {
    const {
        sx,
        ...rest
    } = props;

    return (
        <Link
            sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem", lg: "1rem", xl: "1.1rem" },
                userSelect: "none",
                ...sx
            }}
            {...rest}
        />
    );
}
