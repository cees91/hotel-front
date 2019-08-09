import React from "react";
import Grid from "@material-ui/core/Grid";

import Dates from "./Dates";
import GuestSelector from "./GuestSelector";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import moment from "moment";
const FilterContainer = styled.div`
  max-width: 1700px;
  margin: 0 auto;
`;
interface Props {
  getData: any;
}
export default function Filters(props: Props): JSX.Element {
  const { getData } = props;
  const [params, setParams] = React.useState({
    startDate: moment()
      .startOf("day")
      .format("DD/MM/YYYY"),
    endDate: moment()
      .startOf("day")
      .add(1, "days")
      .format("DD/MM/YYYY"),
    adults: 1
  });
  const handleDate = (startDate: Date, endDate: Date): void => {
    const formattedStartDate = new Intl.DateTimeFormat("en-GB").format(
      startDate
    );
    const formattedEndDate = new Intl.DateTimeFormat("en-GB").format(endDate);
    setParams({
      ...params,
      startDate: formattedStartDate,
      endDate: formattedEndDate
    });
  };
  const handleAdults = (adults: number): void => {
    setParams({
      ...params,
      adults
    });
  };
  return (
    <FilterContainer>
      <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <GuestSelector handleAdults={handleAdults} />
        </Grid>
        <Grid item xs={8}>
          <Dates hoistDate={handleDate} />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => getData(params)}
          >
            {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
            <SearchIcon></SearchIcon>
          </Button>
        </Grid>
      </Grid>
    </FilterContainer>
  );
}
