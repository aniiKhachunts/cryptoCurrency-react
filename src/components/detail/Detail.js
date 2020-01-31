import React, { useState, useEffect } from "react";
import "./Detail.css";
import Loading from "../common/Loading";
import { API_URL } from "../../config";
import { renderChangePercent, handleResponse } from "../../helpers";

const Detail = props => {
  const [currency, setCurrency] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrency = currencyId => {
    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then(data => {
        setLoading(false);
        setCurrency(data);
      });
  };
  useEffect(() => {
    setLoading(true);
    const currencyId = props.match.params.id;
    console.log(currencyId);
    fetchCurrency(currencyId);
  }, [props.match.params.id]);

  if (loading) {
    return (
      <div className="loading-container">
        <Loading width="56px" height="56px" />
      </div>
    );
  }
  return (
    <div className="Detail">
      <h1 className="Detail-heading">
        {currency.name} ({currency.symbol})
      </h1>
      ​
      <div className="Detail-container">
        <div className="Detail-item">
          Price <span className="Detail-value">$ {currency.price}</span>
        </div>
        <div className="Detail-item">
          Rank <span className="Detail-value">{currency.rank}</span>
        </div>
        <div className="Detail-item">
          24H change
          <span className="Detail-value">
            {renderChangePercent(currency.percentChange24h)}
          </span>
        </div>
        <div className="Detail-item">
          <span className="Detail-title">Market cap</span>
          <span className="Detail-dollar">$</span>
          {currency.marketCap}
        </div>
        <div className="Detail-item">
          <span className="Detail-title">24H Volume</span>
          <span className="Detail-dollar">$</span>
          {currency.volume24h}
        </div>
        <div className="Detail-item">
          <span className="Detail-title">Total supply</span>
          {currency.totalSupply}
        </div>
      </div>
      Collapse
    </div>
  );
};

export default Detail;
