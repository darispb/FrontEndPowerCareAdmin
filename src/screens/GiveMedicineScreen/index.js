import { useState } from "react";
import SearchIcon from "../../icons/search-icon";
import { InputNumber, TableController } from "../../components";

import CloseIcon from "../../icons/close-icon";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function GiveMedicineScreen() {
  // const [modalOpen, setModalOpen] = useState(false);


  // for search
  const [searchInput, setSearchInput] = useState(null);
  const [searched, setSearched] = useState(false);
  // data
  const [data, setData] = useState(mockup);
  // table
  const [indexTable, setIndexTable] = useState(0);
  const [numOfRow, setNumOfRow] = useState(10);
  const numOfTable = Math.ceil(data.length / numOfRow);
  const numberStartData = indexTable * numOfRow;
  const dataLength = +numOfRow;
  const numberEndData =
    numberStartData + dataLength > data.length
      ? data.length
      : numberStartData + dataLength;
  if (indexTable >= numOfTable) setIndexTable(numOfTable - 1);

  // function row data creating
  const RowMedicine = ({ id, name, price, numberinstock, index, amount }) => {
    const [disable, setDisable] = useState(amount ? false : true);
    return (
      <div className="table-grid">
        <div className="menu-row">
          <input
            type="checkbox"
            checked={!disable}
            onChange={(e) => {
              let nData = data;
              nData[index] = { ...data[index], amount: undefined };
              setDisable(!e.target.checked);
              setData(nData);
            }}
          />
        </div>
        <p>{id}</p>
        <p>{name}</p>
        <div className="menu-row">
          <InputNumber
            disable={disable}
            value={amount}
            min={0}
            onChange={(number) => {
              let nData = data;
              nData[index] = { ...data[index], amount: number };
              setData(nData);
            }}
          />
        </div>
        <p>{price}</p>
        <p>{numberinstock}</p>
      </div>
    );
  };

  // data slice with table
  const rowData = data
    .slice(numberStartData, numberEndData)
    .map((item, key) => (
      <RowMedicine
        id={item.id}
        name={item.name}
        price={item.price}
        key={key}
        index={numberStartData + key}
        amount={item.amount}
        numberinstock={item.numberinstock}
      />
    ));

  // refresh page
  function refreshPage() {
    window.location.reload();
  }
  // function search
  function search(text) {
    let nData = [];
    data.forEach((item, key) => {
      if (item.name.search(text) != -1) nData.push(item);
    });
    setData(nData);
  }

  // function submit
  const submit = () => {
    const report = data.filter((item) => item.amount != undefined);
    console.log({ report });
  };

  return (
    <div className="content-body">
      <div className="medicine-content">
        <div className="search-bar-container">
          {/* <h3 style={{ alignSelf: "flex-start" }}> ยา </h3> */}
          <p class="text-xl mt-3 font-semibold">ยาและผลิตภัณฑ์</p>
          <div className="search-bar-conten">
            <div className="p-12 h-12">
              <div className="bg-white flex items-center rounded-full shadow h-12">
                <input
                  className="rounded-l-full w-full  h-12 py-4 px-4 text-gray-600 leading-tight focus:outline-none"
                  id="search"
                  type="text"
                  placeholder="Search"
                />
                <div className="p-4">
                  <button className="bg-indigo-200 text-white rounded-full p-2 hover:bg-indigo-300 focus:outline-none w-9 h-9 flex items-center justify-center">
                    {searched ? (
                      <span onClick={refreshPage}>
                        <CloseIcon
                          width="1rem"
                          hieght="1rem"
                          className="close"
                          // value={i}
                        />
                      </span>
                    ) : (
                      <SearchIcon
                        width="1.5rem"
                        hieght="1.5rem"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // search(searchInput);
                          setSearched(true);
                        }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="table-content">
          {/* header table */}
          <div className="table-grid header">
            <p></p>
            <p>รหัส</p>
            <p>ชื่อยา</p>
            <p>จำนวน</p>
            <p>ราคา</p>
            <p>สต๊อกสินค้า</p>
          </div>
          {/* end header */}

          <div className="body-table">
            {/* body table */}
            {rowData}
            {/* end body table */}
          </div>
        </div>

        <TableController
          indexTable={indexTable}
          setIndexTable={setIndexTable}
          numOfTable={numOfTable}
          setNumOfRow={setNumOfRow}
          numOfRow={numOfRow}
        />
        <div className="px-2 ">
          {/* <button
            className="
            button-done
            w-45
            bg-blue-200
            text-white
            px-3
            py-2
            rounded-md
          "
          >
            ยืนยัน
          </button>
          <Link to="/workingdetail">
            <button
              className="
            button-back
            w-30
            bg-gray-400
            text-white
            px-2
            py-2
            margin-left-2vh
            rounded-md
          "
            >
              ย้อนกลับ
            </button>
          </Link> */}
          <Link to="/medicinedetail">
          <Button variant="primary" 
          style={
            { borderColor: "#818CF8",
              backgroundColor: "#818CF8" }
         }>
            บันทึกผล
          </Button>
          </Link>{" "}
          <Link to="/workingdetail">
          <Button variant="secondary" 
           style={
            { borderColor: "#bdbdbd",
              backgroundColor: "#bdbdbd" }
         }>
            ย้อนกลับ
          </Button>
          </Link>

        </div>
      </div>
      {/* {modalOpen && <AddMedicineScreen setOpenModal={setModalOpen} />} */}
    </div>
  );
}

//////////////////////// Mockup Data //////

const mockup = [
  {
    id: "C001",
    name: "ยา A",
    price: 100,
    numberinstock: "2",
  },
];
