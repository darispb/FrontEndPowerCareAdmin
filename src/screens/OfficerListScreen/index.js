import React from "react";
import { useState, useEffect } from "react";
import Edit from "../../icons/edit";
import { Link } from "react-router-dom";
import Delete from "../../icons/delete";
import "./OfficerListScreen.css";
import { TableController } from "../../components";
import axios from "axios";
import SearchIcon from "../../icons/search-icon";
import CloseIcon from "../../icons/close-icon";
import firebaseConfig from "../../config";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { server } from "../../constants/constant";

const OfficerListScreen = () => {
  const [officer, setOfficer] = useState([]);
  const [searched, setSearched] = useState(false);
  const [state, setstate] = useState();
  const [dataSearch, setdataSearch] = useState("");
  // const [doctor, setDoctor] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getOfficerList = () => {
    axios.get(server.OFFICER_LIST).then((res) => {
      setOfficer(res.data);
    });
  };

  const getDoctor = () => {
    axios.get(server.OFFICER_LIST).then((res) => {
      const data = res.data;
      const doctor = data.filter((data) => data.Position == "แพทย์");
      setOfficer(doctor);
    });
  };

  const getStaff = () => {
    axios.get(server.OFFICER_LIST).then((res) => {
      const data = res.data;
      const staff = data.filter((data) => data.Position == "เจ้าหน้าที่");
      setOfficer(staff);
    });
  };

  const getAdmin = () => {
    axios.get(server.OFFICER_LIST).then((res) => {
      const data = res.data;
      const admin = data.filter((data) => data.Position == "ผู้ดูแลระบบ");
      setOfficer(admin);
    });
  };

  useEffect(() => {
    getOfficerList();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  // const handleToEditOfficer = (DocumentID, Position) => {
  //   try {
  //     axios.get(`/EditOfficer/${Position}/${DocumentID}`);
  //     // console.log(res);
  //     // axios.get('/EditOfficer/'+Position+'/'+DocumentID+'')
  //   } catch (error) {}
  // };

  const handleToConfirmDelete = (DocumentID, Position) => {
    setstate({ DocumentID, Position });
    handleShow();
  };

  const handleDelete = (DocumentID, Position) => {
    try {
      axios
        .delete(server.OFFICER_LIST, {
          data: { DocumentID: DocumentID, Position: Position },
        })
        .then((res) => {
          if (res.data == true) {
            window.alert("ลบข้อมูลใช้สำเร็จ");
          } else {
            window.alert("มีบางอย่างผิดพลาดโปรดลองใหม่อีกครั้ง");
          }
        });
      handleClose();
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  const iconOption = { className: "icon-link", width: "1rem", height: "1rem" };

  const handleData = (e) => {
    const data = e.target.value;
    setdataSearch(data);
  };
  const searchOfficer = (message) => {
    axios.get(server.OFFICER_LIST).then((res) => {
      const data = res.data;
      const result = data.filter(
        (data) =>
          data.FirstName == message ||
          data.LastName == message ||
          data.Phone == message ||
          data.Email == message
      );
      // console.log(result);
      if (result[0] == undefined) {
        window.alert("ไม่พบสิ่งที่ต้องการค้นหา");
      } else {
       
        // const arr = [];
        // arr.push(result);
        setOfficer(result);
      }
    });
  };

  // console.log(dataSearch);

  return (
    <div className="content-body">
      <div className="head-officerlist">
        <p class="text-xl mt-3 font-semibold">รายชื่อบุคลากร</p>
        <div className="search-bar-conten">
          <div className="p-12 h-12 ">
            <div className="bg-white flex items-center rounded-full shadow h-12">
              <input
                className="rounded-l-full w-full  h-12 py-4 px-4 text-gray-400 leading-tight focus:outline-none"
                id="search"
                type="text"
                placeholder="Search"
                onChange={handleData}
              />
              <div className="  p-4">
                <button
                  onClick={() => {
                    searchOfficer(dataSearch);
                    // search(searchInput);
                    // setSearched(true);
                  }}
                  className=" bg-indigo-200 text-white rounded-full p-2 hover:bg-indigo-300 focus:outline-none w-9 h-9 flex items-center justify-center"
                >
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
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="button-officelist">
          <Button
            variant="secondary"
            onClick={getOfficerList}
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            รายชื่อทั้งหมด
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={getDoctor}
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            รายชื่อแพทย์
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={getStaff}
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            รายชื่อเจ้าหน้าที่
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={getAdmin}
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            รายชื่อผู้ดูแลระบบ
          </Button>{" "}
          <Link to="/addofficer">
            <Button
              variant="secondary"
              style={{
                borderColor: "#C7D2FE",
                backgroundColor: "#C7D2FE",
                color: "black",
              }}
            >
              เพิ่มบุคคลากร
            </Button>
          </Link>
          {/* <Link to="/addofficer">
            <button className="btn btn-officerlist "> เพิ่มบุคคลากร</button>
          </Link> */}
        </div>
      </div>
      <div className="working-content">
        <div className="table-content-officerlist">
          <div className="table-grid-officerlist header">
            {/* header table */}
            <p>ชื่อ</p>
            <p>นามสกุล</p>
            <p>ตำแหน่ง</p>
            <p>อีเมลล์ </p>
            <p>เบอร์โทรศัพท์</p>
            <p>ลบข้อมูล</p>
            {/* end header */}
          </div>
          <div className="body-table-officerlist">
            {/* body table */}
            {officer.map((officerlist) => (
              <div className="table-grid-officerlist content-officerlist">
                <p>{officerlist.FirstName}</p>
                <p>{officerlist.LastName}</p>
                <p>{officerlist.Position}</p>
                <p>{officerlist.Email}</p>
                <p>{officerlist.Phone}</p>

                <div className="menu-row">
                  {/* <Link
                    to={{
                      pathname: `/EditOfficer`,
                      state: {
                        position: officerlist.Position,
                        documentid: officerlist.DocumentID,
                      },
                    }}
                    // to={{
                    //   pathname: "/EditOfficer",
                    //   state: {
                    //     position: "pun",

                    //   },
                    // }}
                  >
                    <Edit
                      {...iconOption}
                      // onClick={() =>
                      //   handleToEditOfficer(
                      //     officerlist.DocumentID,
                      //     officerlist.Position
                      //   )
                      // }
                    />
                  </Link> */}
                  {/* ตรงนี้ยังใส่ Modal ไม่ได้  */}
                  <Delete
                    {...iconOption}
                    onClick={() =>
                      handleToConfirmDelete(
                        officerlist.DocumentID,
                        officerlist.Position
                      )
                    }
                  />
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>คำเตือน</Modal.Title>
                    </Modal.Header>

                    <center>
                      <Modal.Body>คุณต้องการลบรายชื่อนี้หรือไม่ ?</Modal.Body>
                    </center>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleClose}
                        style={{
                          borderColor: "#bdbdbd",
                          backgroundColor: "#bdbdbd",
                        }}
                      >
                        ย้อนกลับ
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDelete(state.DocumentID, state.Position)
                        }
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default OfficerListScreen;
