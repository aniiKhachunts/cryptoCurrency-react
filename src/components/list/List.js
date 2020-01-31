import React, { useState, useEffect } from "react";
import Loading from "../common/Loading";
import Table from "./Table";
import Pagination from "./Pagination";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCurrencies = () => {
    setLoading(true);

    fetch(`${API_URL}/cryptocurrencies/?page=${page}&perPage=10`)
      .then(handleResponse)

      .then(data => {
        setCurrencies(data.currencies);
        setLoading(false);
        setTotalPages(data.totalPages);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCurrencies();
  }, [page]);

  const handlePaginationClick = direction => {
    direction === "next" ? setPage(page + 1) : setPage(page - 1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loading width="56px" height="56px" />
      </div>
    );
  }

  return (
    <div>
      <Table currencies={currencies} />
      <Pagination
        page={page}
        totalPages={totalPages}
        handlePaginationClick={handlePaginationClick}
      />
    </div>
  );
};

export default List;
