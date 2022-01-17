import { useState, useEffect } from "react";
import SearchIcon from "../../icons/search-icon";
import Edit from "../../icons/edit";
import CloseIcon from "../../icons/close-icon";
import Delete from "../../icons/delete";
import Add from "../../icons/add-paper";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { server } from "../../constants/constant";
import axios from "axios";
import { useLocation } from "react-router";
import "./UserScreen.css";

export default function UserScreen() {
  const [searched, setSearched] = useState(false);
  const [user, setuser] = useState([]);
  const [show, setShow] = useState(false);
  const [datauserSearch, setdatauserSearch] = useState("");
  const location = useLocation();
  const { dataSearch } = location.state;
  // const [state, setstate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getSearchResult = () => {
    axios.get(server.USER).then((res) => {
      const data = res.data;
      const result = data.filter(
        (data) =>
          data.FirstName == dataSearch ||
          data.LastName == dataSearch ||
          data.Phone == dataSearch ||
          data.Email == dataSearch
      );
      if (result[0] == undefined) {
        window.alert("ไม่พบสิ่งที่ต้องการค้นหา");
      } else {
        setuser(result);
      }
    });
  };

  useEffect(() => {
    getSearchResult();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };
  console.log(dataSearch);
  // const handleToConfirmDelete = (UserID) => {
  //   setstate(UserID);
  //   handleShow();
  // };

  // const handleDelete = (UserID) => {
  //   try {
  //     axios.delete(server.USER, {
  //       data: { UserID: UserID },
  //     });
  //     handleClose();
  //     refreshPage();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(state);

  // console.log(state);

  const iconOption = { className: "icon-link", width: "1rem", height: "1rem" };

  const handleuserData = (e) => {
    const data = e.target.value;
    setdatauserSearch(data);
  };

  const searchUser = (message) => {
    axios.get(server.USER).then((res) => {
      const data = res.data;
      const result = data.filter(
        (data) =>
          data.FirstName == message ||
          data.LastName == message ||
          data.Phone == message ||
          data.Email == message
      );
      if (result[0] == undefined) {
        window.alert("ไม่พบสิ่งที่ต้องการค้นหา");
      } else {
        setuser(result);
      }
    });
  };
  return (
    <div className="content-body">
      <div className="head-officerlist">
        <p class="text-xl mt-3 font-semibold">ระเบียนคนไข้</p>
        <div className="search-bar-conten">
          <div className="p-12 h-12 ">
            <div className="bg-white flex items-center rounded-full shadow h-12">
              <input
                className="rounded-l-full w-full  h-12 py-4 px-4 text-gray-400 leading-tight focus:outline-none"
                id="search"
                type="text"
                placeholder="Search"
                onChange={handleuserData}
              />
              <div className="  p-4">
                <button
                  onClick={() => {
                    searchUser(datauserSearch);
                  }}
                  className="  bg-indigo-200 text-white rounded-full p-2 hover:bg-indigo-300 focus:outline-none w-9 h-9 flex items-center justify-center"
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
      </div>
      <div className="working-content">
        <div className="table-content-user">
          <div className="table-grid-user header">
            {/* header table */}
            <p>ชื่อ</p>
            <p>นามสกุล</p>
            <p>อีเมลล์ </p>
            <p>เบอร์โทรศัพท์</p>
            <p>ดูข้อมูลคนไข้</p>
            {/* end header */}
          </div>
          <div className="body-table-user">
            {/* body table */}
            {/* {officer.map((officerlist) => ( */}
            {user.map((data) => (
              <div className="table-grid-user content-user">
                <p>{data.FirstName}</p>
                <p>{data.LastName}</p>
                <p>{data.Email}</p>
                <p className="text-user">{data.Phone}</p>

                <div className="menu-row">
                  <Link
                    to={{
                      pathname: `/userdetail`,
                      state: {
                        userid: data.UserID,
                        dataSearch: dataSearch,
                      },
                    }}
                  >
                    <Add
                      {...iconOption}
                      // onClick={() => console.log("Click function add " + item.id)}
                    />
                  </Link>
                  {/* <Delete
                    {...iconOption}
                    // onClick={() => handleToConfirmDelete(data.UserID)}
                  /> */}

                  {/* <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>คำเตือน</Modal.Title>
                    </Modal.Header>

                    <center>
                      <Modal.Body>คุณต้องการลบคนไข้ท่านนี้หรือไม่ ?</Modal.Body>
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
                        style={{
                          borderColor: "danger",
                          backgroundColor: "danger",
                        }}
                        // onClick={() => handleDelete(state)}
                      >
                        ยืนยันลบคนไข้
                      </Button>
                    </Modal.Footer>
                  </Modal> */}
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
}
