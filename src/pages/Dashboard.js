import React, { useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AnalyticEcommerce from "../components/Cards/CustomeCard";
import MainCard from "../components/Cards/MAinCards";
import MyCard from "../components/Cards/myCard";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [secretaries, setSecretaries] = useState([]);
  const [openAddSecretaryModal, setOpenAddSecretaryModal] = useState(false);
  const [newSecretary, setNewSecretary] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleAddSecretary = () => {
    setSecretaries((prevSecretaries) => [...prevSecretaries, newSecretary]);
    setNewSecretary({ name: "", phoneNumber: "" });
    setOpenAddSecretaryModal(false);
  };

  const handleChangeSecretaryField = (e) => {
    const { name, value } = e.target;
    setNewSecretary((prevSecretary) => ({
      ...prevSecretary,
      [name]: value,
    }));
  };
  const handleDeleteRow = (index) => {
    setSecretaries((prevSecretary) =>
      prevSecretary.filter((_, i) => i !== index)
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <div>
        <Typography variant="h4" gutterBottom>
          داشبورد
        </Typography>
      </div>

      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={6} sx={{ mb: -2.25 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddSecretaryModal(true)}
            style={{ marginTop: 20, backgroundColor: "#0BD420" }}
          >
            <Typography variant="h7">اضافه کردن منشی</Typography>
          </Button>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Typography variant="h6" gutterBottom>
              منشی ها
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#69C0E3" }}>
                    <TableCell align="center">نام</TableCell>
                    <TableCell align="center">شماره موبایل </TableCell>
                    <TableCell> حذف </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {secretaries.map((secretary, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{secretary.name}</TableCell>

                      <TableCell align="center">
                        {secretary.phoneNumber}
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
              </Table>
            </TableContainer>
          </MainCard>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="بیماران امروز"
            count="25"
            percentage={59.3}
            extra="35,000"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="کل بیماران"
            count="450"
            percentage={70.5}
            extra="8,900"
          />
        </Grid>
      </Grid>
      <Dialog
        open={openAddSecretaryModal}
        onClose={() => setOpenAddSecretaryModal(false)}
      >
        <DialogTitle>Add Secretary</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={newSecretary.name}
            onChange={handleChangeSecretaryField}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            value={newSecretary.phoneNumber}
            onChange={handleChangeSecretaryField}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpenAddSecretaryModal(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#0BD420" }}
            onClick={handleAddSecretary}
          >
            اضافه کردن
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
