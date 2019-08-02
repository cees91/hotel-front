//  // <---- put this at the very top of your js file

import React from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./react-dates-override.css";
import { DateRangePicker } from "react-dates";

import moment from "moment";

interface Props {
  hoistDate: any;
}
interface State {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  focusedInput: "startDate" | "endDate" | null;
}
interface Dates {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}
class Dates extends React.Component<Props, State> {
  public state: State = {
    startDate: moment().startOf("day"),
    endDate: moment()
      .startOf("day")
      .add(1, "days"),
    focusedInput: null
  };
  public render(): JSX.Element {
    return (
      <>
        <DateRangePicker
          startDate={this.state.startDate} // momentPropTypes.momentObj or null,
          startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
          endDate={this.state.endDate} // momentPropTypes.momentObj or null,
          endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
          onDatesChange={({ startDate, endDate }): void => {
            this.setState({ startDate, endDate });
            this.props.hoistDate(startDate, endDate);
          }} // PropTypes.func.isRequired,
          displayFormat={"DD/MM/YYYY"}
          focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
        />
      </>
    );
  }
}
export default Dates;
