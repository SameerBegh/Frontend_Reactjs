import React, { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "./Context/Context";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getDetailTournament, getParticipant } from "./API_Service/api";
import { useParams } from "react-router-dom";
import ParticipantEdit from "./Edit/ParticipantEdit";
import ParticipantDelete from "./Delete/ParticipantDelete";
import { Box, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
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

const Detail = () => {
  const {
    detail,
    setDetail,
    setEditParticipantName,
    setEditEmail,
    setEditMobile,
  } = useContext(DataContext);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState({ _id: "", id: "" });
  const [deleteParticipantID, setDeleteParticipantID] = useState({
    _id: "",
    id: "",
  });
  const [open, setOpen] = useState(false);

  const GetTournament = useRef();
  const { id } = useParams();

  useEffect(() => {
    GetTournament.current();
  }, [detail]);

  const Get_detail = async () => {
    const response = await getDetailTournament(id);
    if (!response) return;
    setDetail(response.data);
  };
  GetTournament.current = Get_detail;

  const editForm = async (ID) => {
    const response = await getParticipant({ _id: id, ID: ID });
    if (!response) return;
    const participants = response.data.participants;
    setEditParticipantName(participants[0].name);
    setEditEmail(participants[0].email);
    setEditMobile(participants[0].mobile);
    setEditID({ _id: id, id: ID });
    setEdit(!edit);
  };

  const removeParticipant = (Id) => {
    setDeleteParticipantID({ _id: id, id: Id });
    setOpen(true);
  };

  return (
    <Box sx={{height:"100vh"}}>
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
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ fontSize: "22px", textAlign: "center" }}
                colSpan={4}
              >
                Tournament Details
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell> Name</StyledTableCell>
              <StyledTableCell>{detail.name}</StyledTableCell>
              <StyledTableCell>Total Participants</StyledTableCell>
              <StyledTableCell>{detail.participants?.length}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell> Start-Date</StyledTableCell>
              <StyledTableCell>
                {`${detail.startDate}`.split("T")[0]}
              </StyledTableCell>
              <StyledTableCell>End-Date</StyledTableCell>
              <StyledTableCell>
                {`${detail.endDate}`.split("T")[0]}
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
            <StyledTableCell
              sx={{ fontSize: "22px", textAlign: "center" }}
              colSpan={5}
            >
              Participants Details
            </StyledTableCell>

            <StyledTableRow>
              <StyledTableCell>SL.No</StyledTableCell>
              <StyledTableCell>Participant Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {detail.participants?.map((row, index) => (
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
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.mobile}</StyledTableCell>

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
                      onClick={() => removeParticipant(row._id)}
                    />
                  </>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {detail.participants?.length ? null : (
        <Typography sx={{ textAlign: "center", fontSize: "20px" }}>
          No Participants!
        </Typography>
      )}
      <ParticipantEdit edit={edit} setEdit={setEdit} editID={editID} />
      <ParticipantDelete
        open={open}
        setOpen={setOpen}
        Data={deleteParticipantID}
      />
    </Box>
  );
};

export default Detail;
