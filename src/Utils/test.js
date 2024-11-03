const tabComponents = useRef([
  {
    label: "دارو",
    icon: <VaccinesIcon className={classes.icon} />,
    component: <Formdaru state={state} />,
  },
  {
    label: "آزمایش",
    icon: <ScienceOutlinedIcon className={classes.icon} />,
    component: <Formlab />,
  },
  {
    label: "پاراکلینیک",
    icon: <LocalHospitalOutlinedIcon className={classes.icon} />,
    component: <FormParC />,
  },
  {
    label: "تصویربرداری",
    icon: <CompareOutlinedIcon className={classes.icon} />,
    component: <Formiamging />,
  },
  {
    label: "فیزیوتراپی",
    icon: <DirectionsWalkOutlinedIcon className={classes.icon} />,
    component: <FormPhysi />,
  },
  {
    label: "اوتیسم",
    icon: <PsychologyOutlinedIcon className={classes.icon} />,
    component: <Formautism />,
  },
  {
    label: "ارجاع",
    icon: <CustomSvgButton className={classes.icon} />,
    component: <FormReferal />,
  },
]);
