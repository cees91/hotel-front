import React from "react";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);
interface Props {
  handleAdults: any;
}
const GuestSelector = (props: Props): JSX.Element => {
  const classes = useStyles();
  const { handleAdults } = props;
  const [value, setValue]: [number, any] = React.useState(1);
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ): void => {
    setValue(Number(event.target.value));
    handleAdults(Number(event.target.value));
  };
  return (
    // <div>
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-helper">Adults: </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        input={<Input name="age" id="age-helper" />}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
        <MenuItem value={10}>10</MenuItem>
      </Select>
    </FormControl>
    // </div>
  );
};
export default GuestSelector;
