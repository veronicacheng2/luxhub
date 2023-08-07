import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataGrid } from "@material-ui/data-grid";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 25px;
`;

const ListEditButton = styled.button`
  width: 60px;
  border: none;
  border-radius: 10px;
  padding: 8px 10px;
  background-color: ${(props) =>
    props.mode === "edit" ? "#00224f" : "#860000"};
  color: white;
  cursor: pointer;
  margin-right: 20px;
`;

const UserAsk = () => {
  const user = useSelector((state) => state.currentUser);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const getAsks = async () => {
      try {
        const res = await userRequest.get(`/asks/findUserAsks/${user._id}`);
        setAsks(res.data);
      } catch (err) {}
    };
    getAsks();
  }, [user]);

  const handleDelete = (id) => {
    const deleteAsks = async () => {
      try {
        await userRequest.delete(`/asks/${id}`);
        const res = await userRequest.get(`/asks/findUserAsks/${user._id}`);
        setAsks(res.data);
      } catch (err) {}
    };
    deleteAsks();
  };

  const columns = [
    { field: "productId", headerName: "Product ID", width: 250 },
    { field: "productName", headerName: "Product", width: 450 },
    { field: "size", headerName: "Size", width: 200 },
    {
      field: "price",
      headerName: "Ask Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <ListEditButton mode={"edit"}>Edit</ListEditButton>
            </Link>
            <ListEditButton
              mode={"delete"}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </ListEditButton>
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <TitleContainer>
        <Title>Ask List</Title>
      </TitleContainer>
      <DataGrid
        autoHeight={true}
        rows={asks}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        checkboxSelection
      />
    </Container>
  );
};

export default UserAsk;