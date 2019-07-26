import React from "react";
import Grid from "@material-ui/core/Grid";

import Dates from "./Dates";
import GuestSelector from "./GuestSelector";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";

const FilterContainer = styled.div`
  max-width: 1580px;
  margin: 0 auto;
`;
interface Props {
  getData: any;
}
export default function Filters(props: Props): JSX.Element {
  const { getData } = props;
  const [params, setParams] = React.useState({
    startDate: "",
    endDate: "",
    adults: 1
  });
  const handleDate = (date: Date, dateType: string): void => {
    const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);
    setParams({
      ...params,
      [dateType]: formattedDate
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
        <Grid item xs>
          <GuestSelector handleAdults={handleAdults} />
        </Grid>
        <Grid item xs>
          <Dates text="Start date" hoistDate={handleDate} />
        </Grid>

        <Grid item xs>
          <Dates text="End date" hoistDate={handleDate} />
        </Grid>
        <Grid item xs>
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
