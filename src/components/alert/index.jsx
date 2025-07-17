import { Alert as MantineAlert, rem } from "@mantine/core";
import Icon from "../../assets/icons/icon";

export const Alert = ({
  message,
  variant,
  onClose,
  icon,
  withCloseButton = true,
  ...props
}) => {
  return (
    <MantineAlert
      {...{ variant, onClose, withCloseButton }}
      icon={<Icon component={icon} size={24} />}
      styles={{
        closeButton: { paddingTop: rem(3) },
      }}
      {...props}
    >
      {message}
    </MantineAlert>
  );
};