import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Navigate, NavLink } from "react-router-dom";
import { Button } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("رحمان ", "رضایی", 3810649578, "مرد", 09212863265),
  createData("سمیرا ", "محمدی", 2920654987, "زن", 09183456895),
  createData("علی ", "ساعدی", 370256649, "مرد", 09147164251),
  createData("بهنام  ", "کریمپور", 3830645987, "مرد", 09149816598),
  createData("لیلا ", "مینایی", 3720649562, "زن", 09211524698),
  createData("سوسن ", "جنگنده", 3810649578, "زن", 09212863265),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              "&:last-child th": {
                borderColor: "#FF0000",
              },
              backgroundColor: "#E5E7E9",
            }}
          >
            <TableCell align="center">نام </TableCell>
            <TableCell align="center">نام خانوادگی</TableCell>
            <TableCell align="center">کدملی</TableCell>
            <TableCell align="center">جنسیت</TableCell>
            <TableCell align="center">موبایل</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow
              key={row.index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="right">
                <NavLink to="/dashboard" state={rows[index]}>
                  <Button variant="contained" sx={{ color: "#0D24B8" }}>
                    بیشتر
                  </Button>
                </NavLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
