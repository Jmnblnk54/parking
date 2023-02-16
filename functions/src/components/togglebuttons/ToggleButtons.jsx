import React from "react";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

function ToggleButtons({ duration, handleDuration }) {
  return (
    <ToggleButtonGroup
      value={duration}
      exclusive
      onChange={handleDuration}
      aria-label="set duraion"
      sx={{
        py: 1.25,
        height: 55,
        "& .MuiToggleButtonGroup-grouped": {
          border: 0,
          color: "#111730",
          fontWeight: "bold",
          mx: 1,
          fontFamily: "Arciform",
          "&:not(:first-of-type)": {
            borderRadius: "25px",
          },
          "&:first-of-type": {
            borderRadius: "25px",
          },
        },
        "& .Mui-selected": {
          bgcolor: "#c3d9ce !important",
        },
        "@media screen and (max-width: 720px)": {
          pt: 0,
          pb: 1.25,
          height: 45,
          justifyContent: "center",
        },
      }}
    >
      <ToggleButton value="Half Day" aria-label="hourly">
        HOURLY
      </ToggleButton>
      <ToggleButton value="Daily" aria-label="daily">
        DAILY
      </ToggleButton>
      <ToggleButton value="Weekly" aria-label="weekly">
        WEEKLY
      </ToggleButton>
      <ToggleButton value="Monthly" aria-label="monthly">
        MONTHLY
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
