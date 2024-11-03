import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import Formdaru from "../components/Daru/Formdaru";
import FormPhysi from "../components/Physiotherapy/FormPhysi";

import Formiamging from "../components/Imaging/Formiamging";
import Formlab from "../components/Laboratory/Formlab";

import FormReferal from "../components/referral/FormReferal";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "1rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#89BCEE",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },

  "& .MuiAccordionSummary-content": {
    marginRight: theme.spacing(2),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Test() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          expandIcon={<UnfoldMoreIcon sx={{ color: "#E70E1B" }} />}
        >
          <Typography variant="h6">دارو</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formdaru />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
          expandIcon={<UnfoldMoreIcon sx={{ color: "#7EF141" }} />}
        >
          <Typography variant="h6">آزمایش</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formlab />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          aria-controls="panel3d-content"
          id="panel3d-header"
          expandIcon={<UnfoldMoreIcon sx={{ color: "#41F1DC" }} />}
        >
          <Typography variant="h6">تصویربرداری</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Formiamging />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          aria-controls="panel4d-content"
          id="panel6d-header"
          expandIcon={<UnfoldMoreIcon sx={{ color: "#1E61EF" }} />}
        >
          <Typography variant="h6"> فیزیوتراپی</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormPhysi />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          aria-controls="panel5d-content"
          id="panel5d-header"
          expandIcon={<UnfoldMoreIcon sx={{ color: "#CF1EEF" }} />}
        >
          <Typography variant="h6">ارجاع</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormReferal />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
