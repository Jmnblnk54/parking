import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";

function CloseMapButton({ setViewMap }) {
  return (
    <IconButton
      sx={{
        bgcolor: "#4d9d74",
        color: "white",
        borderRadius: 2,
        fontSize: 14,
        "&:hover": {
          bgcolor: "#6db992",
        },
      }}
      onClick={() => setViewMap(false)}
    >
      <CloseRoundedIcon /> CLOSE MAP
    </IconButton>
  );
}

export default CloseMapButton;
