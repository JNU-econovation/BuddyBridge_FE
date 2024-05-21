import { ComponentProps } from "react";

interface RadioInputProps extends ComponentProps<"input"> {
  firstValue: string;
  secondtValue: string;
}

export default function RadioInput(props: RadioInputProps) {
  return (
    <div>
      <input type="radio" {...props} />
      <input type="radio" {...props} />
    </div>
  );
}
