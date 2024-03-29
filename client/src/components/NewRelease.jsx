import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const Container = styled.div``;

const ProductContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.h2`
  padding: 0px 30px;
  font-size: 30px;
  font-weight: 500;
`;

const NewRelease = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/new");
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  return (
    <Container>
      <Title>Latest Releases</Title>
      <ProductContainer>
        {products.slice(0, 5).map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </ProductContainer>
    </Container>
  );
};

export default NewRelease;
