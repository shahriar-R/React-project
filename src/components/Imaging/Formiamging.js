import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  Modal,
  Tooltip,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Searchdaru from "../Searchdaru";
import Imaging from "./Imaging";
import Radiology from "./Radiology";
import Sonography from "./Sonography";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    height: "auto",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignContent: "center",
  },
  form: {
    display: "flex",

    flexDirection: "column",
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
  IconLabel: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
}));

const Formiamging = () => {
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const [expanded, setExpanded] = React.useState("");
  const date = useMemo(() => new DateObject({ calendar: persian }), []);

  const handleOpen = (panel) => (event, newExpanded) => {
    setExpanded(panel);
    setOpen(true);
  };
  const handleDeleteRow = (index) => {
    setRequestData((prevData) => prevData.filter((_, i) => i !== index));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (formData, event) => {
    event.preventDefault();
    const data = formData;

    setRequestData([...requestData, data]);
  };
  const handleSendData = () => {
    const noteDetailEprscs = requestData.map((req, index) => ({
      srvId: {
        srvType: {
          srvType: req.srvType.srvType.srvType,
        },
        srvCode: req.srvType.wsSrvCode,
      },
      srvQty: req.srvQty,

      repeat: req.repeat,
      dateDO: req["dateDO"].format?.("YYYY/MM/DD"),
    }));
    const dataSend = {
      patient: "1234567891",
      mobile: "09129999999",
      prescType: {
        prescTypeId: 2,
      },
      prescDate: date.format("YYYY/MM/DD").replace(/\//g, ""),
      docId: "2000200092",
      docMobileNo: "09991111111",
      docNationalCode: "1234567891",
      comments: "",
      expireDate: "14030102",
      noteDetailEprscs: noteDetailEprscs,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataSend),
    };
    fetch("http://127.0.0.1:8000/forward/", requestOptions)
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)));
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        <div className={classes.IconLabel}>
          <Typography variant="h6">CTScan</Typography>
          <Tooltip title="CTScan">
            <QueueIcon
              onClick={handleOpen("CTScan")}
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
        </div>
        <div className={classes.IconLabel}>
          <Typography variant="h6">سونوگرافی</Typography>
          <Tooltip title="سونوگرافی">
            <QueueIcon
              onClick={handleOpen("سونوگرافی")}
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
        </div>
        <div className={classes.IconLabel}>
          <Typography variant="h6">رادیولوژی</Typography>
          <Tooltip title="رادیولوژی">
            <QueueIcon
              onClick={handleOpen("رادیولوژی")}
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
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: 500,
            width: 800,
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Typography variant="h5" color="error">
            {expanded}
          </Typography>
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
                  <Typography variant="h6">نام </Typography>{" "}
                </label>
                <Controller
                  name="srvType"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Searchdaru
                      data={
                        expanded === "CTScan"
                          ? Imaging
                          : expanded === "رادیولوژی"
                          ? Radiology
                          : Sonography
                      }
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
                  name="srvQty"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <TextField {...field} sx={{ width: 400 }} />
                  )}
                />
              </section>

              <section className={classes.section}>
                <label className={classes.label}>
                  <Typography variant="h6">تاریخ انجام</Typography>
                </label>

                <Controller
                  name="dateDO"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      calendar={persian}
                      locale={persian_en}
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      format={"YYYY/MM/DD"}
                      calendarPosition="top-end"
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
              sx={{ marginTop: "10px", width: 250 }}
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
                <TableCell align="center">
                  {request["srvType"].srvName}
                </TableCell>
                <TableCell align="center">{request["srvQty"]}</TableCell>

                <TableCell align="center">
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
            sx={{ backgroundColor: "#0059c3", width: 100 }}
            onClick={handleSendData}
          >
            ارسال
          </Button>
        </TableContainer>
      </div>
    </div>
  );
};
export default React.memo(Formiamging);
