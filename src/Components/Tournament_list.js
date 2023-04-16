import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTournament, getDetailTournament } from "./API_Service/api";
import { Link } from "react-router-dom";
import { DataContext } from "./Context/Context";

const Tournament_list = ({ data }) => {
  const { setDetail } = useContext(DataContext);

  const ViewDetail = async (id) => {
    const response = await getDetailTournament(id);
    if (!response) return;
    setDetail(response.data);
  };

  const Tournament_delete = async (id) => {
    const response = await deleteTournament(id);
    if (!response) return;
    setDetail(response.data);
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          margin: "50px auto",
          position: "relative",
          overflow: "hidden",
          width: 1250,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>SL.No</TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }}>
                Tournament Name
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Start-Date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                End-Date
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Status
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Total Participants
              </TableCell>
              <TableCell sx={{ color: "#fff", fontSize: 16 }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {(index += 1)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  {`${row.startDate}`.split("T")[0]}
                </TableCell>
                <TableCell align="center">
                  {`${row.endDate}`.split("T")[0]}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.participants.length}</TableCell>
                <TableCell align="center">
                  <>
                    <EditIcon
                      sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                    />
                    <DeleteIcon
                      sx={{
                        margin: "0 1rem",
                        cursor: "pointer",
                        "&:hover": { color: "red" },
                      }}
                      onClick={() => Tournament_delete(row._id)}
                    />
                    <Link
                      to={`Tournament/${row._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <VisibilityIcon
                        sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
                        onClick={() => ViewDetail(row._id)}
                      />
                    </Link>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tournament_list;
