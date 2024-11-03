import React, { useMemo } from "react";

import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  Paper,
  InputBase,
  Box,
  styled,
  alpha,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { useLocation } from "react-router-dom";
import Test from "./test";

const Mybox = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  width: "100%",
  padding: "5px",
});

const MyInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1F8CDC",
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    fontSize: 16,
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    // Use the system font instead of the default Roboto font.

    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
      backgroundColor: "#67ABDE",
    },
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#D60F3F",
    borderColor: "#D60F3F",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(214, 15, 63,1)",
    borderColor: "#D60F3F",
  },
}));

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginBottom: "2px",
    margin: "5px",
  },
  icon: {
    marginLeft: 2,
    color: "#030700",
    width: 30,
    height: 30,
  },
}));

const Patient = () => {
  const location = useLocation();
  const { state } = location;
  const date = useMemo(
    () => new DateObject({ calendar: persian, locale: persian_fa }),
    []
  );
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper elevation={3}>
        <Mybox component="form">
          <div className={classes.form}>
            <label>
              <Typography variant="h6">نام</Typography>
            </label>
            <MyInput defaultValue={state.name} size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6">نام خانوادگی</Typography>
            </label>
            <MyInput defaultValue={state.family} size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6">جنسیت</Typography>
            </label>
            <MyInput defaultValue={state.gender} size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6">تاریخ تولد </Typography>
            </label>
            <MyInput defaultValue={state.birthDay} size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6">تاریخ اعتبار بیمه </Typography>
            </label>
            <MyInput defaultValue="1403/4/15" size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6">نوع بیمه </Typography>
            </label>
            <MyInput defaultValue=" تامین اجتماعی" size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6"> تاریخ نسخه</Typography>
            </label>
            <MyInput defaultValue={date.format("YYYY/MM/DD")} size="large" />
          </div>
          <div className={classes.form}>
            <label>
              <Typography variant="h6">تاریخ اعتبار نسخه </Typography>
            </label>
            <MyInput
              defaultValue={date.add(2, "month").format("YYYY/MM/DD")}
              size="large"
            />
          </div>
        </Mybox>
      </Paper>
      <Paper sx={{ marginTop: 3 }}>
        <Test />
      </Paper>
    </div>
  );
};

export default Patient;
