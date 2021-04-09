import { Control, FieldErrors, UseControllerProps } from "react-hook-form";

export interface HookFormProps {
  control: Control<any>;
  name: string;
  errors: FieldErrors<any>;
  rules?: UseControllerProps["rules"];
  defaultValue?: any;
}
