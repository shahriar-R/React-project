import React, { useState } from "react";
import {
  Container,
  Button,
  Divider,
  Typography,
  TextField,
  Paper,
  styled,
  Modal,
  MenuItem,
  ButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import ListIcon from "@mui/icons-material/List";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

const Mybutton = styled(Button)({
  boxShadow: "none",
  width: "100%",
  gap: 0,
  boxShadow: 3,
  borderRadius: "16px",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 5px",
  border: "1px solid",
  lineHeight: 1.5,
  // backgroundColor: '#ed1846',
  borderColor: "#0063cc",

  "&:hover": {
    backgroundColor: "#0059c3",

    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#D60F3F",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(214, 15, 63,1)",
  },
});

const useStyles = makeStyles((theme) => ({
  link: {
    marginLeft: 10,
  },
}));

function Rightbar() {
  const classes = useStyles();
  const [DataModalopen, setDataModalopen] = useState(false);
  const [receive, setReceive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    family: "",
    gender: "",
    birthDay: "",
  });
  const handleDataModalClose = () => {
    setDataModalopen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDatamodal = () => {
    setDataModalopen(true);
  };
  const handleReceiveData = () => {
    setReceive(false);
  };
  const handleData = () => {
    setDataModalopen(false);
    setReceive(true);
  };
  return (
    <>
      <Container>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0754B6",
            width: 150,
            marginRight: 1,
            marginBlock: 2,
            color: "#FDFEFE",
            borderRadius: "16px",
          }}
          onClick={handleDatamodal}
        >
          <Typography variant="h6">استعلام</Typography>
        </Button>
      </Container>
      <Container
        fixed
        sx={{ borderTop: 1, height: 370, width: 220, paddingTop: 2 }}
      >
        <Divider sx={{ height: 5, width: 150 }}></Divider>
        <List>
          <ListItem disablePadding>
            <Mybutton
              size="large"
              variant="contained"
              className={classes.text}
              component={NavLink}
              to="/dashboard"
            >
              <ListItemIcon>
                <DashboardIcon
                  sx={{
                    color: "#ed1846",
                    width: 25,
                    height: 25,
                  }}
                />
              </ListItemIcon>
              داشبورد
            </Mybutton>
          </ListItem>
          <Divider sx={{ height: 5 }}></Divider>
          <ListItem disablePadding>
            <Mybutton
              size="large"
              variant="contained"
              component={NavLink}
              to="/visit"
            >
              <ListItemIcon>
                <VaccinesOutlinedIcon
                  sx={{
                    marginRight: 0,
                    marginLeft: 5,
                    color: "#ed1846",
                    width: 25,
                    height: 25,
                  }}
                />
              </ListItemIcon>
              ویزیت
            </Mybutton>
          </ListItem>
          <Divider sx={{ height: 5 }}></Divider>
          <ListItem disablePadding>
            <Mybutton
              size="large"
              variant="contained"
              component={NavLink}
              to="/list"
            >
              <ListItemIcon>
                <ListIcon
                  sx={{
                    marginRight: 0,
                    marginLeft: 5,
                    color: "#ed1846",
                    width: 25,
                    height: 25,
                  }}
                />
              </ListItemIcon>
              <Typography variant="h7"> بیماران</Typography>
            </Mybutton>
          </ListItem>
          <Divider sx={{ height: 5 }}></Divider>
          <ListItem disablePadding>
            <Mybutton size="large" variant="contained" className={classes.text}>
              <ListItemIcon>
                <SettingsAccessibilityIcon
                  sx={{
                    marginRight: 0.75,
                    color: "#ed1846",
                    width: 25,
                    height: 25,
                  }}
                />
              </ListItemIcon>
              <Typography variant="h7">نوبت دهی</Typography>
            </Mybutton>
          </ListItem>
        </List>
      </Container>
      <Modal open={DataModalopen} onClose={handleDataModalClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "auto",
            width: 450,
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              label="محل کار"
              name="name"
              select
              defaultValue="مطب"
              value={formData.name}
              onChange={handleInputChange}
            >
              <MenuItem value="کلینیک">کلینیک</MenuItem>
              <MenuItem value="مطب">مطب</MenuItem>
            </TextField>
            <TextField
              label="کدملی"
              name="family"
              value={formData.family}
              onChange={handleInputChange}
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
              sx={{
                backgroundColor: "#040C39",
                color: "#F8F9F9",
                width: 120,
                height: 55,
              }}
              onClick={handleData}
            >
              استعلام
            </Button>
          </form>
        </div>
      </Modal>
      <Modal open={receive} onClose={handleReceiveData}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            height: "auto",
            width: 450,
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
          }}
        >
          <Paper>fjkjnjkd</Paper>
          <Paper>jnfkjw</Paper>
          <Paper>jnw</Paper>
        </div>
      </Modal>
    </>
  );
}

export default Rightbar;
