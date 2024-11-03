import React from "react";
import { TextField, Autocomplete, CircularProgress } from "@mui/material";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const Searchdaru = (props) => {
  const [open, setOpen] = React.useState(false);

  const loading = open;

  const getOptionLabel = (option) => {
    return option[props.labelKey] || ""; // Get the label using the labelKey prop
  };
  const getOptionSelected = (option, value) => {
    return option[props.labelKey] === value[props.labelKey];
  };

  return (
    <Autocomplete
      sx={{ width: 400 }}
      open={open}
      onChange={(event, item) => {
        props.onChange(item);
      }}
      value={props.value}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={getOptionLabel}
      getOptionSelected={getOptionSelected}
      options={props.data}
      renderInput={(params) => (
        <TextField
          {...params}
          color="secondary"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default Searchdaru;
