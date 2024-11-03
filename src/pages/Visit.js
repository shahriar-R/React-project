import React, { useState, useMemo } from "react";
import {
  Button,
  Modal,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import { makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom";
import { usePatientContext } from "../contexts/patientContext";

const useStyles = makeStyles({
  tableHead: {
    height: 10,
    borderBottom: "none",
    paddingTop: 0.8,
    paddingBottom: 0,
  },
});

const MyModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { patients, setPatients } = usePatientContext();

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [editRowIndex, setEditRowIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    gender: "",
    birthDay: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditModalOpen = (index) => {
    setEditModalOpen(true);
    setEditRowIndex(index);
    setFormData(patients[index]);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditRowIndex(null);
    setFormData({
      name: "",
      family: "",
      gender: "",
      birthDay: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    if (editRowIndex !== null) {
      setPatients((prevData) => {
        const newData = [...prevData];
        newData[editRowIndex] = formData;
        return newData;
      });
    } else {
      setPatients((prevData) => [...prevData, formData]);
      setFormData({
        name: "",
        family: "",
        gender: "",
        birthDay: "",
      });
    }
    handleEditModalClose();
  };

  const handleDeleteRow = (index) => {
    setPatients((prevData) => prevData.filter((_, i) => i !== index));
  };

  const memoizedTableHead = useMemo(
    () => (
      <TableHead sx={{ backgroundColor: "#A9D9F9" }}>
        <TableRow>
          <TableCell align="center">
            <Typography variant="h6">نام</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center">
              نام خانوادگی
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center">
              جنسیت
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6" align="center">
              کد ملی
            </Typography>{" "}
          </TableCell>
          <TableCell align="center">
            <Typography variant="h7">Action</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
    ),
    []
  );

  const memoizedTableRows = useMemo(
    () =>
      patients?.map((row, index) => (
        <TableRow key={index}>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.family}</TableCell>
          <TableCell align="center">{row.gender}</TableCell>
          <TableCell align="center">{row.birthDay}</TableCell>
          <TableCell
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <ModeEditIcon
              color="secondary"
              onClick={() => handleEditModalOpen(index)}
            />

            <DeleteForeverIcon
              sx={{ color: "#F82138" }}
              onClick={() => handleDeleteRow(index)}
            />
            <NavLink
              to="/patient"
              className={classes.link}
              state={patients[index]}
            >
              <Button
                variant="outlined"
                startIcon={
                  <VaccinesOutlinedIcon
                    sx={{
                      color: "#0BD420",
                      marginLeft: 2,
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                sx={{ borderBlockColor: "#1DF9E2 " }}
              >
                <Typography variant="h7" sx={{ color: "#000106" }}>
                  ویزیت
                </Typography>
              </Button>
            </NavLink>
          </TableCell>
        </TableRow>
      )),
    [patients]
  );

  return (
    <>
      <div>
        <Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0754B6",
              width: 150,
              marginRight: 5,
              borderRadius: "16px",
              marginBlock: 3,
              color: "#FDFEFE",
            }}
            onClick={handleOpen}
          >
            <Typography variant="h6">پذیرش</Typography>
          </Button>
        </Box>
        <Modal open={open} onClose={handleClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: 400,
              width: 300,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <form>
              <TextField
                label="نام"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                label="نام خانوادگی"
                name="family"
                value={formData.family}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="جنسیت"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="کدملی"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                endIcon={
                  <PersonAddOutlinedIcon
                    sx={{
                      marginRight: 2,
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                variant="contained"
                sx={{ backgroundColor: "#0BD420" }}
                onClick={handleFormSubmit}
              >
                {editRowIndex !== null ? "ذخیره" : "اضافه کردن"}
              </Button>
            </form>
          </div>
        </Modal>
        <Modal open={editModalOpen} onClose={handleEditModalClose}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: 400,
              width: 300,
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
            }}
          >
            <form>
              <TextField
                label="نام"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="نام خانوادگی"
                name="family"
                value={formData.family}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="جنسیت"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="کد ملی"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <Button
                endIcon={
                  <SaveAsOutlinedIcon
                    sx={{
                      marginRight: 2,
                      width: 20,
                      height: 20,
                    }}
                  />
                }
                variant="contained"
                sx={{ backgroundColor: "#0BD420" }}
                onClick={handleFormSubmit}
              >
                ذخیره
              </Button>
            </form>
          </div>
        </Modal>

        <TableContainer sx={{}}>
          <Table sx={{ maxWidth: 900 }}>
            {memoizedTableHead}
            <TableBody>{memoizedTableRows}</TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default MyModal;
