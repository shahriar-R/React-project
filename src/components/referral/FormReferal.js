import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Tooltip,
  Modal,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableHead,
  Autocomplete,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_fa";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Searchdaru from "../Searchdaru";
import complaints from "./complaints";
import Expertise from "./تخصص";
import Recognition from "./Recognition";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
    columnGap: 5,
    rowGap: 2,

    padding: 2,
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

const FormReferal = () => {
  const { handleSubmit, control } = useForm();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [requestData, setRequestData] = React.useState([]);
  const [personName2, setPersonName2] = React.useState([]);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const date = useMemo(() => new DateObject({ calendar: persian }), []);

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName2(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleDeleteRow = (index) => {
    setRequestData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSendData = () => {
    const noteDetailsReferralList = requestData.map((req, index) => ({
      docSpecReferred: {
        specCode: req.specDesc.specCode,
      },
      complaints: req.displayName.map((item) => ({ id: item["id"] })),
      message: "",
      quantity: req.srvQty,
      icd10s: req.tashkhis.map((item) => ({ icdId: item["icdId"] })),
      referralDate: req["dateDO"] ? req["dateDO"].format("YYYY/MM/DD") : null,
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
      noteDetailEprscs: [],
      noteDetailsReferralList: noteDetailsReferralList,
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
  const onSubmit = (formData, event) => {
    event.preventDefault();
    const data = formData;

    setRequestData([...requestData, data]);
    // console.log(requestData);
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
                  <Typography variant="h6">تخصص </Typography>{" "}
                </label>
                <Controller
                  name="specDesc"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Searchdaru
                      data={Expertise}
                      value={value}
                      onChange={
                        onChange // Update the value
                      }
                      labelKey="specDesc"
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
                    <TextField sx={{ width: 400 }} {...field} />
                  )}
                />
              </section>
              <section className={classes.section}>
                <label className={classes.label} id="demo-multiple-chip-label">
                  <Typography variant="h6">شکایات</Typography>
                </label>
                <Controller
                  name="displayName"
                  control={control}
                  defaultValue={[]}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      options={complaints}
                      onChange={(event, newValue) => {
                        setSelectedOptions(newValue);
                        onChange(newValue); // Update form value
                      }}
                      value={selectedOptions}
                      getOptionLabel={(option) => option.displayName}
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
                          {option.displayName}
                        </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          color="secondary"
                          label="شکایات"
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
              <section className={classes.section}>
                <label className={classes.label}>
                  <Typography variant="h6">تشخیص اولیه </Typography>
                </label>

                <Controller
                  name="tashkhis"
                  defaultValue={[]}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={Recognition}
                      onChange={(event, newValue) => {
                        onChange(newValue); // Update form value
                      }}
                      value={value}
                      getOptionLabel={(option) => option.icdName}
                      defaultValue={[names]}
                      disableCloseOnSelect
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.icdName}
                        </li>
                      )}
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          multiline
                          color="secondary"
                          sx={{ width: 900 }}
                        />
                      )}
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
              <TableCell align="center">تخصص </TableCell>
              <TableCell align="center">تعداد</TableCell>
              <TableCell align="center"> شکایات</TableCell>
              <TableCell align="center"> تشخیص اولیه</TableCell>
              <TableCell align="center"> تاریخ انجام</TableCell>

              <TableCell align="center"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestData.map((request, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {request["specDesc"]?.specDesc}
                </TableCell>
                <TableCell align="center">
                  {request["srvQty"] ? request["srvQty"] : null}
                </TableCell>
                <TableCell align="center" sx={{ width: 100 }}>
                  {request["displayName"].map((item) => (
                    <div dir="ltr">
                      {item.displayName} <br />
                    </div>
                  ))}
                </TableCell>
                <TableCell align="center">
                  {request["tashkhis"].map((item) => (
                    <div dir="ltr">
                      {"-->  " + item.icdName + "*"} <br />
                    </div>
                  ))}
                </TableCell>

                <TableCell align="center">
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
            type="submit"
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

export default FormReferal;
