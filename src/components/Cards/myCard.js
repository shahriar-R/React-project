import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import Formdaru from "../Daru/Formdaru";

const MyCard = () => {
  return (
    <>
      <Card
        sx={{
          marginTop: 3,
          width: "auto",
          backgroundColor: "#73C6B6",
        }}
      >
        <CardHeader
          sx={{ display: "flex", flexDirection: "row-reverse" }}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Formdaru />
        </CardContent>
      </Card>
    </>
  );
};

export default MyCard;
