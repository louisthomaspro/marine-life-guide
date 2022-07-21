import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import React, { Fragment } from "react";

const Search: NextPage = () => {
  return (
    <Fragment>
      <Typography variant="h1" component="h1">
        Search
      </Typography>

      {/* <InstantSearch indexName="sea-guide" searchClient={algolia}>
        <Box sx={{ pb: 2 }}>
          <CustomSearchBox />
        </Box>
        <CustomInfiniteHits />
      </InstantSearch> */}
    </Fragment>
  );
};

export default Search;
