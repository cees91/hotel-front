import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

interface Props {
  text: string;
  hoistDate: any;
}
const Dates = (props: Props): JSX.Element => {
  const { text, hoistDate } = props;
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );
  function handleDateChange(date: Date | null): void {
    setSelectedDate(date);
    const type = text === "Start date" ? "startDate" : "endDate";
    hoistDate(date, type);
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div>
        <KeyboardDatePicker
          margin="normal"
          id="mui-pickers-date"
          label={text}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        {/* </Grid> */}
      </div>
    </MuiPickersUtilsProvider>
  );
};
export default Dates;
