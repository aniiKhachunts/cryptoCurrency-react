import React from "react";
import "./Table.css";
import { renderChangePercent } from "../../helpers";
import { withRouter } from "react-router-dom";

const Table = props => {
  const { currencies } = props;

  return (
    <div className="Table-container">
      {
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <th>Cryptocurrency</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody className="Table-body">
            {currencies.map(currensy => {
              return (
                <tr
                  key={currensy.id}
                  onClick={() => props.history.push(`/currency/${currensy.id}`)}
                >
                  <td>
                    <span className="Table-rank">{currensy.rank}</span>
                    {currensy.name}
                  </td>
                  <td className="Table-dollar">
                    <span>$</span>
                    {currensy.price}
                  </td>
                  <td className="Table-dollar">
                    <span>$</span>
                    {currensy.marketCap}
                  </td>
                  <td>{renderChangePercent(currensy.percentChange24h)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      }
    </div>
  );
};

export default withRouter(Table);
