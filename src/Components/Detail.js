import React, { useContext, useEffect, useRef } from "react";
import { DataContext } from "./Context/Context";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDetailTournament } from "./API_Service/api";

const Detail = () => {
  const { detail, setDetail } = useContext(DataContext);
  const GetTournament = useRef();

  useEffect(() => {
    GetTournament.current();
  }, [detail]);

  const Get_detail = async () => {
    const response = await getDetailTournament(detail._id);
    if (!response) return;
    setDetail(response.data);
  };
  GetTournament.current = Get_detail;

  return (
    <>
      <div className="">
        <table>
          <tr>
            <th>Tournament Detail</th>
          </tr>
          <tr>
            <td>Tournament Name</td>
            <td>{detail.name}</td>
          </tr>
          <tr>
            <td>Tournament Start</td>
            <td>{`${detail.startDate}`.split("T")[0]}</td>
          </tr>
          <tr>
            <td>Ernst Handel</td>
            <td>{`${detail.endDate}`.split("T")[0]}</td>
          </tr>
        </table>
      </div>
      <TableContainer
        component={Paper}
        sx={{
          margin: "50px auto",
          position: "relative",
          overflow: "hidden",
          width: 1250,
          justifyContent: "center",
          alignItems: "center",
          width: 1200,
        }}
      >
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>SL.No</TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>
                Participant Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Email
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Mobile
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detail.participants?.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {(index += 1)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.mobile}</TableCell>
                <TableCell align="center">{row.participants?.length}</TableCell>
                <TableCell align="center">
                  <>
                    <EditIcon
                      sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                    />
                    <DeleteIcon
                      sx={{
                        margin: "0",
                        cursor: "pointer",
                        "&:hover": { color: "red" },
                      }}
                    />
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Detail;
