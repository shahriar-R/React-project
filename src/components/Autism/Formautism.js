import React from "react";
import { Button, TextField, Typography, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-multi-date-picker";

import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import Searchdaru from "../Searchdaru";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    height: "auto",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: 30,
    rowGap: 2,

    padding: 7,
    backgroundColor: "#D5F5ED",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  label: {
    display: "flex",
    flexDirection: "center",
    alignItems: "center",
    marginBottom: "8px",
    marginTop: "4px",
    fontSize: "14px",
    fontWeight: 200,
    marginLeft: 12,
    marginRight: 12,
    p: 2,
  },
}));

const Formautism = () => {
  const { handleSubmit, control, register } = useForm();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form
        onSubmit={handleSubmit()}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <div className={classes.form}>
          <section className={classes.section}>
            <label className={classes.label}>
              <Typography variant="h6">نام </Typography>{" "}
            </label>
            <Searchdaru
              control={control}
              labelKey="srvName"
              name="one"
              {...register("one")}
            />
          </section>
          <section className={classes.section}>
            <label className={classes.label}>
              <Typography variant="h6">تعداد</Typography>
            </label>

            <Controller
              name="six"
              control={control}
              render={({ field }) => (
                <TextField {...field} value="1" disabled sx={{ width: 300 }} />
              )}
            />
          </section>

          <section className={classes.section}>
            <label className={classes.label}>
              <Typography variant="h6">تاریخ انجام</Typography>
            </label>

            <Controller
              name="six"
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <DatePicker
                  calendar={persian}
                  locale={persian_en}
                  onChange={(date) => {
                    onChange(date?.isValid ? date : "");
                  }}
                  format={"YYYY/MM/DD"}
                  calendarPosition="bottom-down"
                  render={
                    <TextField
                      sx={{ width: 250 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              )}
            />
          </section>
        </div>
        <Button
          onClick={() => {
            alert("data");
          }}
          variant="contained"
          color="success"
          sx={{ marginTop: "10px", width: "100%" }}
        >
          <Typography>ذخیره</Typography>
        </Button>
      </form>
    </div>
  );
};

export default React.memo(Formautism);
