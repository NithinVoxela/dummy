import { InputAdornment, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextField, { BaseTextFieldProps, StandardTextFieldProps } from "@material-ui/core/TextField";
import { SearchOutlined as SearchOutlinedIcon } from "@material-ui/icons";
import classNames from "classnames";
import * as React from "react";

import { styles } from "./styles";

type WidthSizeOption = "xs" | "sm" | "md" | "lg" | "auto";

export interface ITextInputProps
  extends WithStyles<typeof styles>,
    Pick<BaseTextFieldProps, Exclude<keyof BaseTextFieldProps, keyof IProps | "classes">>,
    IProps {
  dataComponent?: string;
}

interface IProps {
  label?: string | JSX.Element;
  value?: string;
  className?: string;
  minWidth?: WidthSizeOption;
  autoComplete?: "on" | "off";
  InputProps?: StandardTextFieldProps["InputProps"];
}

const TextInputComponent: React.FC<ITextInputProps> = ({
  classes,
  className,
  minWidth,
  type,
  InputProps,
  onChange: handleChange,
  ...props
}) => {
  return (
    <TextField
      {...props}
      onChange={handleChange}
      InputProps={{
        startAdornment: type === "search" && (
          <InputAdornment position="start">
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
        classes: { root: classes.inputRoot },
        disableUnderline: true,
        ...InputProps
      }}
      InputLabelProps={{
        className: classNames(classes.label),
        filled: true,
        shrink: true
      }}
      className={classNames(
        className,
        // @ts-ignore
        minWidth && classes[`minWidth_${minWidth}`]
      )}
      type={type || "text"}
      variant="filled"
    />
  );
};

export const TextInput = withStyles(styles)(TextInputComponent);
