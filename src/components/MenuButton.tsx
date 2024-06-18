import { Button, ButtonProps } from "@drincs/react-components";
import { motion, Variants } from "framer-motion";

export default function MenuButton(props: ButtonProps & { transitionDelay?: number }) {
    const {
        sx,
        transitionDelay,
        ...rest
    } = props;
    const itemVariants: Variants = {
        open: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 300, damping: 24, delay: transitionDelay }
        },
        closed: { opacity: 0, x: -50, transition: { duration: 0.2 } }
    };

    return (
        <Button
            size="sm"
            sx={{
                fontSize: { xs: "0.75rem", sm: "0.75rem", md: "1rem", lg: "1.25rem", xl: "1.5rem" },
                ...sx
            }}
            component={motion.div}
            variants={itemVariants}
            {...rest}
        />
    );
}
