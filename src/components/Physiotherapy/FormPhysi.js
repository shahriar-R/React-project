import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  Modal,
  Autocomplete,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

import Select from "@mui/material/Select";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import QueueIcon from "@mui/icons-material/Queue";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import Searchdaru from "../Searchdaru";
import PhysioType from "./PhysioType";
import Phisio from "./Phisio";
import Plan from "./Plan";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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

const FormPhysi = () => {
  const { handleSubmit, control } = useForm();
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const classes = useStyles();
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const date = useMemo(() => new DateObject({ calendar: persian }), []);
  const theme = useTheme();

  const handleOpen = () => {
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
    console.log(requestData);
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

      illnessId: req["six"].planDesc,
      planId: req["tarh"],

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
      <Tooltip title="CTScan">
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
                      data={Phisio}
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
                  <Typography variant="h6">تعداد جلسات</Typography>
                </label>

                <Controller
                  name="srvQty"
                  control={control}
                  render={({ field }) => (
                    <TextField sx={{ width: 400 }} {...field} />
                  )}
                />
              </section>
              <section className={classes.section}>
                <label className={classes.label} id="demo-multiple-chip-label">
                  <Typography variant="h6">بیماری</Typography>
                </label>

                <Controller
                  name="six"
                  control={control}
                  rules={{ required: false }}
                  render={({ field: { onChange, name, value } }) => (
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      onChange={onChange}
                      input={
                        <OutlinedInput
                          sx={{ width: 400 }}
                          color="secondary"
                          label="Algorithm"
                          id="select-multiple"
                        />
                      }
                    >
                      {PhysioType.map((item) => (
                        <MenuItem value={item.illnessDesc}>
                          <em>{item.illnessDesc}</em>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </section>
              <section className={classes.section}>
                <label className={classes.label}>
                  <Typography variant="h6">طرح درمان</Typography>
                </label>

                <Controller
                  name="tarh"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      id="checkboxes-tags-demo"
                      options={Plan}
                      onChange={(event, newValue) => {
                        setSelectedOptions(newValue);
                        onChange(newValue); // Update form value
                      }}
                      value={selectedOptions}
                      getOptionLabel={(option) => option.planDesc}
                      defaultValue={[]}
                      disableCloseOnSelect
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.planDesc}
                        </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          color="secondary"
                          label=""
                          placeholder=""
                          sx={{ width: 400 }}
                        />
                      )}
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
              sx={{ marginTop: "10px", width: 150 }}
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
              <TableCell align="center">نام خدمت </TableCell>
              <TableCell align="center">تعداد جلسات</TableCell>
              <TableCell align="center"> بیماری</TableCell>
              <TableCell align="center"> طرح درمان</TableCell>
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
                <TableCell align="center">{request["six"]}</TableCell>
                <TableCell align="center">{request["tarh"].planDesc}</TableCell>

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

export default FormPhysi;
