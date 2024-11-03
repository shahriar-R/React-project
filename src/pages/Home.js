import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Rightbar from "../components/Home/Rightbar";

const useStyles = makeStyles((theme) => ({
  container: {},
  rightbar: {},
}));

function Home() {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid container>
        <Grid item lg={2} sm={0} className={classes.rightbar}>
          <Rightbar />
        </Grid>
        <Grid item lg={10} sm={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
