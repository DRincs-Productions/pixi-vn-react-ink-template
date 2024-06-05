import { RoundIconButton, RoundIconButtonProps, useTheme } from "@drincs/react-components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NavigationRoundIconButtonProps extends RoundIconButtonProps {
    selected?: boolean;
}

export default function NavigationRoundIconButton(props: NavigationRoundIconButtonProps) {
    const {
        selected,
        sx,
        ...rest
    } = props;
    const [hidden, setHidden] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setHidden(false);
        }, 100);
    }, []);

    return (
        <RoundIconButton
            circumference={{ xs: "3rem", sm: "3.5rem", md: "4rem", lg: "5rem", xl: "7rem" }}
            sx={{
                border: 3,
                borderColor: selected ? useTheme().palette.primary[800] : useTheme().palette.background.body,
                ...sx
            }}
            elevation="lg"
            component={motion.div}
            animate={{
                scale: hidden ? 0 : 1,
            }}
            transition={{ type: "spring" }}
            {...rest}
        />
    );
}
