import { Button as MantineButton } from "@mantine/core";

export const Button = ({ children, ...props }) => {
  return (
    <MantineButton loaderProps={{ type: "dots" }} {...props}>
      {children}
    </MantineButton>
  );
};