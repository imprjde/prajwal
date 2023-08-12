import React, { useState, useEffect } from "react";

const Forward = ({ receiveData }) => {
  const [apiData, setApiData] = useState([]);

  const fetchHandle = async () => {
    let resp = await fetch("https://fakestoreapi.com/products");
    let result = await resp.json();
    setApiData(result);
  };

  useEffect(() => {
    receiveData(apiData);
  }, [apiData]);

  useEffect(() => {
    fetchHandle();
  }, []);
  return <div>Forward</div>;
};

export default Forward;
