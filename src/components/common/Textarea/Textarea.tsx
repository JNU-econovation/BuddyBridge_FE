import { ComponentProps, forwardRef } from "react";

interface TextareaProps extends ComponentProps<"textarea"> {}

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(props, ref) {
  return <textarea ref={ref} {...props} />;
});
