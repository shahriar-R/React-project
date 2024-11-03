import {
  Modal,
  Button,
  Tooltip,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  useTheme,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import React, { memo, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import { makeStyles } from "@mui/styles";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Controller, useForm } from "react-hook-form";
import Searchdaru from "../Searchdaru";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "auto",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: 30,
    rowGap: 2,

    padding: 7,
    backgroundColor: "#B2EEE5",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    marginRight: 5,
    marginBottom: 3,
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const FormParC = () => {
  const { handleSubmit, control, register } = useForm();
  const classes = useStyles();
  const theme = useTheme();
  const [requestData, setRequestData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [personName, setPersonName] = React.useState();
  const [personName2, setPersonName2] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      value
    );
  };
  const onSubmit = (formData, event) => {
    event.preventDefault();
    const data = formData;
    const newRequest = {
      noteDetailEprscs: [
        {
          srvId: {
            srvType: {
              srvType: data["srvType"].srvType.srvType,
            },
            // srvCode: data["srvType"].wsSrvCode,
          },
          srvQty: 1,
          // parTarefGrp: {
          //   parGrpCode: data["srvType"].parTarefGrp.parGrpCode,
          // },

          dateDO: data["dateDO"],
        },
      ],
    };
    setRequestData([...requestData, data]);
    // console.log(requestData);
  };
  const handleDeleteRow = (index) => {
    setRequestData((prevData) => prevData.filter((_, i) => i !== index));
  };
  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className={classes.container}>
      <Tooltip title="تجویز دارو">
        <QueueIcon
          onClick={handleOpen}
          sx={{
            "&:hover": {
              color: "#00acee",
            },
            fontSize: 30,
            marginRight: 3,
            marginBottom: 3,
            color: "#1215F7",
          }}
        />
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
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
                  <Typography variant="h6">نام خدمت</Typography>{" "}
                </label>
                <Controller
                  name="srvType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Searchdaru
                      data={value}
                      value={value}
                      onChange={
                        onChange // Update the value
                      }
                      labelKey="srvName"
                    />
                  )}
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
                    <TextField {...field} sx={{ width: 400 }} />
                  )}
                />
              </section>
              <section className={classes.section}>
                <label className={classes.label} id="demo-multiple-chip-label">
                  <Typography variant="h6">نوع خدمت</Typography>
                </label>

                <Controller
                  name="six"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={personName}
                      onChange={handleChange}
                      input={
                        <OutlinedInput
                          sx={{ width: 400 }}
                          color="secondary"
                          label="Algorithm"
                          id="select-multiple"
                        />
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
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
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      format={"YYYY/MM/DD"}
                      calendarPosition="bottom-Right"
                      render={<TextField sx={{ width: 400 }} />}
                    />
                  )}
                />
              </section>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{ marginTop: "10px", width: "100%" }}
            >
              <Typography variant="h6">ذخیره</Typography>
            </Button>
          </form>
        </div>
      </Modal>
      <div>
        <TableContainer component={Table} className={classes.table}>
          <TableHead style={{ backgroundColor: "#A9D9F9" }}>
            <TableRow>
              <TableCell align="center">نام </TableCell>
              <TableCell align="center">تعداد</TableCell>
              <TableCell align="center"> تاریخ انجام</TableCell>

              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestData.map((request, index) => (
              <TableRow key={index}>
                <TableCell>{request["srvType"].srvName}</TableCell>
                <TableCell>{request["srvQty"]}</TableCell>

                <TableCell>
                  {request["dateDO"].format?.("YYYY/MM/DD")}
                </TableCell>

                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <DeleteForeverIcon
                    sx={{ color: "#F82138" }}
                    onClick={() => handleDeleteRow(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0BD420", width: 100 }}
            onClick={() => console.log("state")}
          >
            ارسال
          </Button>
        </TableContainer>
      </div>
    </div>
  );
};

export default React.memo(FormParC);
