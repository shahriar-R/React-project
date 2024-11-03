import React, { memo, useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Table,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  Tooltip,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Searchdaru from "../Searchdaru";
import topFilms from "./Data";
import data2 from "./Data2";
import namedru from "./Namedru";
import Data3 from "./Data3";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 2fr)",
    columnGap: 30,
    rowGap: 2,

    padding: 7,
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
  table: {
    marginTop: 3,
  },
}));

const Formdaru = (state) => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState([]);
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
  const handleSendData = () => {
    const noteDetailEprscs = requestData.map((req, index) => ({
      srvId: {
        srvType: {
          srvType: req["srvType"].srvType.srvType,
        },
        srvCode: req["srvType"].wsSrvCode,
      },
      srvQty: req.srvQty,
      timesAday: {
        drugAmntId: req.Dosage.drugAmntId,
      },
      repeat: req.repeat,
      dateDO: req["dateDO"].format?.("YYYY/MM/DD"),
      drugInstruction: {
        drugInstId: req.timeserve.drugInstId,
      },
      dose: req["Hto-used"].drugUsageId,
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
      noteDetailEprscs: noteDetailEprscs,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        0: dataSend,
        1: requestData[0]["srvType"].srvName,
      }),
    };
    fetch("http://127.0.0.1:8000/forward/", requestOptions)
      .then((response) => response.json())
      .then((data) => alert(JSON.stringify(data)));
  };
  const onSubmit = (formData, event) => {
    event.preventDefault();
    const data = formData;
    setRequestData([...requestData, data]);
  };

  return (
    <>
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
                    <Typography variant="h6">نام دارو</Typography>{" "}
                  </label>
                  <Controller
                    name="srvType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Searchdaru
                        data={namedru}
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
                    render={({ field }) => (
                      <TextField {...field} sx={{ width: 400 }} />
                    )}
                  />
                </section>
                <section className={classes.section}>
                  <label className={classes.label}>
                    <Typography variant="h6">زمان مصرف</Typography>
                  </label>
                  <Controller
                    name="timeserve"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Searchdaru
                        data={data2}
                        value={value}
                        onChange={onChange}
                        labelKey="drugInstConcept"
                      />
                    )}
                  />
                </section>
                <section className={classes.section}>
                  <label className={classes.label}>
                    <Typography variant="h6">مقدار مصرف</Typography>
                  </label>
                  <Controller
                    name="Dosage"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Searchdaru
                        data={topFilms}
                        value={value}
                        onChange={onChange}
                        labelKey="drugAmntConcept"
                      />
                    )}
                  />
                </section>
                <section className={classes.section}>
                  <label className={classes.label}>
                    <Typography variant="h6">طریقه مصرف</Typography>
                  </label>
                  <Controller
                    name="Hto-used"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Searchdaru
                        data={Data3}
                        value={value}
                        onChange={onChange}
                        labelKey="drugUsageConcept"
                      />
                    )}
                  />
                </section>
                <section className={classes.section}>
                  <label className={classes.label}>
                    <Typography variant="h6">فاصله زمان تکرار</Typography>
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
                        calendarPosition="Right"
                        render={
                          <TextField
                            sx={{ width: 400 }}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="end">
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
                <section className={classes.section}>
                  <label className={classes.label}>
                    <Typography variant="h6">دوره تکرار</Typography>{" "}
                  </label>

                  <Controller
                    name="repeat"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField {...field} sx={{ width: 400 }} />
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
                <TableCell align="center">نوع دارو</TableCell>
                <TableCell align="center">تعداد</TableCell>
                <TableCell align="center">زمان مصرف</TableCell>
                <TableCell align="center">مقدار مصرف</TableCell>
                <TableCell align="center">طریقه مصرف</TableCell>
                <TableCell align="center">فاصله زمان تکرار</TableCell>
                <TableCell align="center">دوره تکرار</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestData.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>{request["srvType"].srvName}</TableCell>
                  <TableCell>{request["srvQty"]}</TableCell>
                  <TableCell>{request["timeserve"].drugInstConcept}</TableCell>
                  <TableCell>{request["Dosage"].drugAmntConcept}</TableCell>
                  <TableCell>{request["Hto-used"].drugUsageConcept}</TableCell>
                  <TableCell>
                    {request["dateDO"].format?.("YYYY/MM/DD")}
                  </TableCell>
                  <TableCell>{request["repeat"]}</TableCell>
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
    </>
  );
};

export default memo(Formdaru);
