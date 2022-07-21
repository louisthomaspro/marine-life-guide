import { IconButton, InputBase, Paper } from "@mui/material";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomSearchBox(props: UseSearchBoxProps) {
  const { refine, clear } = useSearchBox(props);

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Common name or scientific name"
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => refine(event.currentTarget.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
