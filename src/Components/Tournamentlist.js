import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDetailTournament } from "./API_Service/api";
import { Link } from "react-router-dom";
import { DataContext } from "./Context/Context";
import { Button } from "@mui/material";
import Edit from "./Edit/Edit";
import Register from "./Register";
import TournamentDelete from "./Delete/TournamentDelete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Tournamentlist = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joinID, setJoinID] = useState("");
  const {
    setDetail,
    setEditName,
    setEditStartDate,
    setEditEndDate,
    setEditID,
    setDeleteID,
    setRemove,
  } = useContext(DataContext);

  const ViewDetail = async (id) => {
    const response = await getDetailTournament(id);
    if (!response) return;
    setDetail(response.data);
  };

  const Tournament_delete = (id) => {
    setDeleteID(id);
    setRemove(true);
  };

  const editForm = async (id) => {
    const response = await getDetailTournament(id);
    if (!response) return;
    const editDetail = response.data;
    setEditID(editDetail._id);
    setEditName(editDetail.name);
    setEditStartDate(`${editDetail.startDate}`.split("T")[0]);
    setEditEndDate(`${editDetail.endDate}`.split("T")[0]);
    setOpen(!open);
  };

  return (
    <>
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
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>SL.No</StyledTableCell>
              <StyledTableCell>Tournament Name</StyledTableCell>
              <StyledTableCell align="center">Start-Date</StyledTableCell>
              <StyledTableCell align="center">End-Date</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">
                Total Participants
              </StyledTableCell>
              <StyledTableCell align="center">Registration</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell StyledTableCell component="th" scope="row">
                  {(index += 1)}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ textTransform: "capitalize" }}
                >
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${row.startDate}`.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`${row.endDate}`.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.participants.length}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setJoinOpen(!joinOpen);
                      setJoinID(row._id);
                    }}
                  >
                    Join
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <>
                    <EditIcon
                      sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                      onClick={() => editForm(row._id)}
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
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Edit open={open} setOpen={setOpen} />
      <Register joinOpen={joinOpen} setJoinOpen={setJoinOpen} ID={joinID} />
      <TournamentDelete />
    </>
  );
};

export default Tournamentlist;
