import { useState, useEffect } from "react";
import SearchIcon from "../../icons/search-icon";
// import { InputNumber, TableController } from "../../components";
import "./MedicineScreen.css";
import CloseIcon from "../../icons/close-icon";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../constants/constant";

import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function MedicineScreen() {
 
  const [medicine, setMedicine] = useState([]);

  const getMedicine = () => {
    axios.get(server.MEDICINE).then((res) => {
      setMedicine(res.data);
    });
  };

  useEffect(() => {
    getMedicine();
  }, []);

  const getSkincare = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const skincare = data.filter((data) => data.Type == "ผลิตภัณฑ์บำรุงผิว");
      setMedicine(skincare);
    });
  };

  const getCleanFace = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const cleanface = data.filter((data) => data.Type == "ผลิตภัณฑ์ทำความสะอาดหน้า");
      setMedicine(cleanface); 
    });
  };

  const getHeal = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const heal = data.filter((data) => data.Type == "ผลิตภัณฑ์แก้แพ้ ผื่นคัน");
      setMedicine(heal); 
    });
  };

  const getSupply = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const supply = data.filter((data) => data.Type == "ผลิตภัณฑ์เสริมอาหาร");
      setMedicine(supply); 
    });
  };

  const getMedi = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const medi = data.filter((data) => data.Type == "ยารักษาโรค");
      setMedicine(medi); 
    });
  };
  // for search
  const [searched, setSearched] = useState(false);
  // table
  // function row data creating
  const RowMedicine = () => {
    // const [disable, setDisable] = useState(amount ? false : true);
    return (
      <div>
        {medicine.map((med) => (
          <div className="table-grid-medicine content-medicine ">
            <p>{med.MedicineName}</p>
            <p className ="text-med" >{med.Price}</p>
            <p>{med.MedicineDescription}</p>
            <p className ="text-med" >{med.Type}</p>
            <p></p>
          </div>
        ))}
      </div>
    );
  };


  // refresh page
  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="content-body">
      <div className="medicine-content">
        <div className="search-bar-container">
          {/* <h3 style={{ alignSelf: "flex-start" }}> ยา </h3> */}
          <p class="text-xl mt-3 font-semibold">ยาและผลิตภัณฑ์</p>
        </div>
        
        <div className=" bg-indigo-300  w-full mt-4 main flex border rounded-full overflow-hidden  select-none">
          {/* <div class="title py-3 my-auto px-5 bg-indigo-300 text-white text-sm font-semibold mr-3">Gender</div> */}
          <label
            className=" ml-10 flex radio p-2 cursor-pointer"
            onClick={getMedicine}
          >
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2  px-2 color-white">ยาและผลิตภัณฑ์</div>
          </label>

          <label
            className=" ml-10 flex radio p-2 cursor-pointer"
            onClick={getSkincare}
          >
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2  px-2 color-white">ผลิตภัณฑ์บำรุงผิว</div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getCleanFace}>
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white ">
              ผลิตภัณฑ์ทำความสะอาดผิวหน้า
            </div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getHeal}>
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white">
              ผลิตภัณฑ์แก้แพ้ ผื่นคัน
            </div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getSupply}>
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white">ผลิตภัณ์เสริมอาหาร</div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getMedi}>
            <input
              className="my-auto transform scale-125 "
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white">ยารักษาโรค</div>
          </label>
        </div>

        <div className="table-content-medicine">
          {/* header table */}
          <div className="table-grid-medicine header">
            {/* <p></p> */}
            <p>ชื่อยา</p>
            <p>ราคา</p>
            <p>คำอธิบาย</p>
            <p>ประเภท</p>
            {/* <p></p> */}
          </div>
          {/* end header */}

          <div className="body-table-medicine">

              {/* {medicine} */}
              {medicine.map((med) => (
                <div className="table-grid-medicine content-medicine">
                  {/* <p> </p> */}
                  <p>{med.MedicineName}</p>
                  <p className ="text-med" > {med.Price}</p>
                  <p>{med.MedicineDescription}</p>
                  <p className ="text-med" >{med.Type}</p>

                </div>
              ))}
              {/* end body table */}


            {/* end body table */}
          </div>
        </div>

        <div className="px-2 mt-3 ">
          <Link to="/">
            <Button
              variant="secondary"
              style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
            >
              กลับสู่หน้าหลัก
            </Button>
          </Link>{" "}
          </div>
      </div>
    </div>
  );
}

