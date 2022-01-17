import "./ScheduleScreen.css";
import SearchIcon from "../../icons/search-icon";
import CloseIcon from "../../icons/close-icon";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { server } from "../../constants/constant";
import { data } from "autoprefixer";

const ScheduleScreen = () => {
  const [schedule, setSchedule] = useState([]);
  const [today, settoday] = useState("");
  // for search
  const [searchInput, setSearchInput] = useState(null);
  const [searched, setSearched] = useState(false);
  const [show, setShow] = useState(false);
  const [state, setstate] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [date, setdate] = useState("");

  // function search
  // function search(text) {
  //   let nData = [];
  //   data.forEach((item, key) => {
  //     if (item.name.search(text) != -1) nData.push(item);
  //   });
  //   setData(nData);
  // }
  const refreshPage = () => {
    window.location.reload();
  };

  const displayThaiDate = (date) => {
    const result = new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    return result;
  };

  // const getAllTimeTable = () => {
  //   try {
  //     axios.get(server.SCHEDULE).then((res) => {
  //       setSchedule(res.data);
  //     });
  //     return schedule;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  const getToday = async () => {
    await axios.get(server.SCHEDULE).then((res) => {
      const data = res.data;
      const date = new Date().toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
      const today = data.filter((data) => displayThaiDate(data.Date) == date);
      setSchedule(today);
    });
  };

  useEffect(() => {
    getToday();
    showToday();
  }, []);

  // const handleToConfirmDelete = (TimeTableID) => {
  //   const result = setstate({ TimeTableID });
  //   console.log(result);
  //   handleShow();
  // };

  // const handleDelete = (TimeTableID, Time) => {
  //   try {
  //     axios.delete(server.SCHEDULE, {
  //       data: { TimeTableID: TimeTableID, Time: Time },
  //     });
  //     handleClose();
  //     refreshPage();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const searchDate = async (date) => {
  //   const alldate = await getToday();
  //   console.log("ALL DATE ", alldate);
  // };

  const displayTime = (time) => {
    const timearray = [];
    for (let i = 0; i < time.length; i++) {
      const element = time[i];
      timearray.push(element);
    }
    // console.log(timearray);
    return timearray;
  };

  const showToday = () => {
    const result = new Date().toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    // return result
    settoday(result);
  };

  const handleDate = (e) => {
    const data = e.target.value;
    setdate(data);
  };

  const searchDate = (dateSearch) => {
    try {
      axios.get(server.SCHEDULE).then((res) => {
        const data = res.data;
        const today = data.filter(
          (data) => displayThaiDate(data.Date) == displayThaiDate(dateSearch)
        );
        if (today[0] == undefined) {
          window.alert("ไม่พบตารางปฏิบัติการ");
        } else {
          setSchedule(today);
          settoday(displayThaiDate(date));
        }
      });
    } catch (error) {}
  };

  // console.log(today);

  return (
    <div className="content-body ">
      <p class="text-xl mt-3 font-semibold">ตารางเวลาทำการของแพทย์</p>
      <div className="search-bar-conten">
        <div className="p-12 h-12 ">
          <div className="bg-white flex items-center rounded-full shadow h-12">
            <input
              className="rounded-l-full w-full  h-12 py-4 px-4 text-gray-400 leading-tight focus:outline-none"
              id="search"
              type="date"
              placeholder="Search"
              onChange={handleDate}
            />
            <div className="  p-4">
              <button
                onClick={() => {
                  searchDate(date);
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
        <Link to="/appointment">
          <Button
            variant="secondary"
            style={{
              borderColor: "#818CF8",
              backgroundColor: "#818CF8",
              color: "white",
              float: "right",
            }}
          >
            เพิ่มตารางเวลาทำการของแพทย์
          </Button>
        </Link>{" "}
      </div>
      {/* <Link to="/calendar">
      <button className="btn btn-addappointment"> ปฏิทินเวลา</button>
      </Link> */}

      <div className="card-appointment-text ">
        ตารางเวลาทำการที่ยังว่างของแพทย์ : {today}
      </div>

      <div className="appointment-content">
        {schedule.map((data) => (
          <div className="card-appointment">
            <br></br>
            <h3>ชื่อแพทย์ : {data.DoctorName}</h3>
            <br></br>
            {/* <p>{displayThaiDate(data.Date)}</p> */}
            <div className="time-item-content">
              {displayTime(data.Time).map((t) => (
                <span className="time-item">
                  {t}
                  {/* <CloseIcon
                    width="0.5rem"
                    hieght="0.5rem"
                    className="close"
                    // onClick={() => handleToConfirmDelete()}
                    value={t}
                  /> */}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>คำเตือน</Modal.Title>
                    </Modal.Header>

                    <center>
                      <Modal.Body>
                        {" "}
                        คุณต้องการลบช่วงเวลาที่เลือกใช่หรือไม่ ?
                      </Modal.Body>
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
                        // onClick={() =>
                        //   handleDelete(state.TimeTableID, state.Time)
                        // }
                      >
                        ตกลง
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-2 mt-3">
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
  );
};
export default ScheduleScreen;
