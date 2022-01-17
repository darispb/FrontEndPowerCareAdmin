import { useState } from "react";
import "./TableComponent.css";

export default function TableComponent({
  indexTable,
  setIndexTable,
  setNumOfRow,
  numOfTable,
  numOfRow,
}) {
  return (
    <div className="table-controller-content">
      <div className="table-controller-detail">
        <p>จำนวนแถว</p>
        <input
          className="number-row"
          type="number"
          min="5"
          max="20"
          step="5"
          value={numOfRow}
          onChange={(e) => setNumOfRow(+e.target.value || 1)}
        />
      </div>
      <div className="table-controller-detail">
        <span
          className="button-controller"
          onClick={() => {
            setIndexTable(indexTable > 0 ? indexTable - 1 : indexTable);
          }}
        >
          Previous
        </span>
        {[...Array(numOfTable).keys()].map((item, key) => (
          <div
            className="number-table-item"
            style={
              indexTable == item
                ? { backgroundColor: "#C7D2FE", color: "white" }
                : null
            }
            onClick={() => {
              setIndexTable(item);
            }}
          >
            {item + 1}
          </div>
        ))}

        <span
          className="button-controller"
          onClick={() => {
            setIndexTable(
              indexTable < numOfTable - 1 ? indexTable + 1 : indexTable
            );
          }}
        >
          Next
        </span>
      </div>
    </div>
  );
}
