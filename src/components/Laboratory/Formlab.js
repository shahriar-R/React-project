import React, { useMemo, useState } from "react";
import {
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  TextField,
  Typography,
  Tooltip,
  Modal,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Searchdaru from "../Searchdaru";

import Laboratories from "./Laboratory";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  form: {
    display: "flex",

    flexDirection: "column",
    justifyContent: "center",
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

const Formlab = () => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const [requestData, setRequestData] = useState([]);
  const [open, setOpen] = useState(false);
  const date = useMemo(() => new DateObject({ calendar: persian }), []);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteRow = (index) => {
    setRequestData((prevData) => prevData.filter((_, i) => i !== index));
  };
  const onSubmit = (formData, event) => {
    event.preventDefault();
    const data = formData;

    setRequestData([...requestData, data]);
  };
  const handleSendData = (event) => {
    event.preventDefault();
    const noteDetailEprscs = requestData.map((req, index) => ({
      srvId: {
        srvType: {
          srvType: req.srvType.srvType.srvType,
        },
        srvCode: req.srvType.wsSrvCode,
      },
      srvQty: req.srvQty,

      dateDO: req["dateDO"].format?.("YYYY/MM/DD"),
    }));
    const dataSend = {
      patient: "1234567891",
      mobile: "09129999999",
      prescType: {
        prescTypeId: 1,
      },
      prescDate: date.format("YYYY/MM/DD").replace(/\//g, ""),
      docId: "2000200092",
      docMobileNo: "09991111111",
      docNationalCode: "1234567891",
      comments: "",
      expireDate: "14030102",
      noteDetailEprscs: { noteDetailEprscs },
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
            height: 500,
            width: 800,
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
              justifyContent: "center",
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
                      data={Laboratories}
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
                  defaultValue="1"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      defaultValue="1"
                      disabled="true"
                      sx={{ width: 400 }}
                    />
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
                <TableCell>
                  {request["srvQty"] ? request["srvQty"] : 1}
                </TableCell>

                <TableCell>
                  {request["dateDO"].format?.("YYYY/MM/DD")}
                </TableCell>

                <TableCell>
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

export default React.memo(Formlab);
