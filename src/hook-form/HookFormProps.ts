import { Control, FieldErrors, UseControllerProps } from "react-hook-form";
import { ITag } from "@fluentui/react";

export interface HookFormProps {
  control: Control<any>;
  name: string;
  errors?: FieldErrors<any>;
  rules?: UseControllerProps["rules"];
  defaultValue?: any;
  label?: string;
  eventTags?: ITag[];
  onChange?: any
}
