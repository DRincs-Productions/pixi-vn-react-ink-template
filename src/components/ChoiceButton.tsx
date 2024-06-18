import { Button, ButtonProps } from "@drincs/react-components";

export default function ChoiceButton(props: ButtonProps) {
    const {
        sx,
        ...rest
    } = props;

    return (
        <Button
            size="sm"
            {...rest}
        />
    );
}
