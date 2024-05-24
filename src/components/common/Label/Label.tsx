import { ComponentProps } from "react";

interface labelProps extends ComponentProps<"label"> {}

export default function Label({ children, ...rest }: labelProps) {
  return <label {...rest}>{children}</label>;
}
