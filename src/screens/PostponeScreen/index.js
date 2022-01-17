import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./PostponeScreen.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";
import axios from "axios";
import { server } from "../../constants/constant";
import { useHistory } from "react-router";

function PostponeScreen() {
  const location = useLocation();
  const {
    appointmentID,
    userID,
    username,
    date,
    time,
    symtoms,
    doctorname,
    doctorid,
    oldtimetableid,
  } = location.state;
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [sex, setsex] = useState("");
  const [email, setemail] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [newDateSlot, setNewDateSlot] = useState([]);
  const [timeslot, settimeslot] = useState([]);
  const [newdate, setnewdate] = useState("");
  const [newtime, setnewtime] = useState("");
  const [newtimetableid, setnewtimetableid] = useState("");
  const history = useHistory();

  const getWorkingDetail = () => {
    try {
      axios.get(`${server.WORKING_DETAIL}/${userID}`).then((res) => {
        setaddress(res.data.Address);
        setphone(res.data.Phone);
        setsex(res.data.Sex);
        setemail(res.data.Email);
        setdateofbirth(res.data.DateOfBirth);
      });
    } catch (error) {
      return error;
    }
  };

  const getNewDate = () => {
    try {
      axios.get(`${server.POSTPONE}/date/${doctorid}`).then((res) => {
        setNewDateSlot(res.data);
      });
    } catch (error) {}
  };

  const getTimeSlot = (TimeTableID) => {
    try {
      axios.get(`${server.POSTPONE}/time/${TimeTableID}`).then((res) => {
        settimeslot(res.data);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getWorkingDetail();
    getNewDate();
  }, []);

  const handleDate = (e) => {
    const date = e.target.value;
    const data = JSON.parse(date);
    setnewdate(data.date);
    setnewtimetableid(data.timetableid);
    getTimeSlot(data.timetableid);
  };

  const handleTime = (e) => {
    const time = e.target.value;
    const data = JSON.parse(time);
    setnewtime(data.time);
  };

  const checkData = () => {
    let slot = {
      newdate: newdate,
      newtime: newtime,
    };

    let data = Object.values(slot).every((value) => value);
    if (data == false) {
      window.alert("โปรดกรอกวันและเวลาที่ต้องการให้ครบ");
    } else {
      history.push({
        pathname: `/summarypostpone`,
        state: {
          appointmentID: appointmentID,
          olddate: date,
          newdate: newdate,
          time: time,
          newtime: newtime,
          oldtimetableid: oldtimetableid,
          newtimetableid: newtimetableid,
          doctorId: doctorid,
          userID:userID
        },
      });
    }
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
  return (
    <div className="content-body">
      <div className="mt-2">
        <div className="  mx-auto bg-white rounded-md">
          {/* first */}
          <div className="flex flex-col justify-center items-center">
            <p class="text-xl mt-3 font-semibold">เลื่อนนัด</p>
            <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className="text-gray-500 ml-4">
                <b>ชื่อ-สกุล :</b> {username} <b>เพศ :</b> {sex}{" "}
                <b>วัน/เดือน/ปีเกิด :</b> {displayThaiDate(dateofbirth)}
              </p>
            </div>
            <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className="text-gray-500 ml-4">
                <b>ที่อยู่ : </b>
                {address}
              </p>
            </div>
            <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className="text-gray-500 ml-4">
                <b>เบอร์โทร :</b> {phone} <b>E-mail :</b> {email}
              </p>
            </div>
            <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className=" text-gray-500 ml-4">
                <b>แพทย์ที่พบ :</b> {doctorname}
              </p>
            </div>
            <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className=" text-gray-500 ml-4">
                <b>อาการเบื้องต้น :</b> {symtoms}
              </p>
            </div>
            <div
              className="
        flex
        justify-between
        items-center
        w-full
        py-3
        border-b-2 border-gray-200
      "
            >
              <p className="text-red-500 ml-4">
                <b> วันที่ทำนัดเดิม : {displayThaiDate(date)}</b>
              </p>
            </div>
            <div
              className="
        flex
        justify-between
        items-center
        w-full
        py-3
        border-b-2 border-gray-200
      "
            >
              <p className="text-red-500 ml-4">
                <b> เวลาที่ทำนัดเดิม : {time}</b>
              </p>
            </div>
            <div
              className="
        flex
        justify-between
        items-center
        w-full
        py-3
      "
            >
              <p className="text-black ml-4">
                กรุณาเลือกวัน และเวลาที่ต้องการทำนัดใหม่
              </p>
            </div>
            <div className=" -m-2 text-center">
              <div className=" p-2">
                <div className="  inline-flex items-center bg-white  text-black rounded-full p-2 ">
                  <span className="postpone-text inline-flex bg-indigo-300 text-white rounded-full h-6 px-3 justify-center items-center">
                    วันที่ทำนัดใหม่ :
                  </span>
                  <select className="inline-flex  px-3" onChange={handleDate}>
                    <option disabled selected value>
                      {" "}
                      เลือกวันที่การทำนัด
                    </option>
                    {newDateSlot.map((date) => (
                      <option
                        className="option"
                        value={JSON.stringify({
                          timetableid: `${date.TimeTableID}`,
                          date: `${date.Date}`,
                        })}
                      >
                        {" "}
                        {displayThaiDate(date.Date)}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className=" m-2 text-center">
              <div className="p-2">
                <div className=" inline-flex items-center bg-white  text-black rounded-full p-2 ">
                  <span className="postpone-text inline-flex bg-indigo-300 text-white rounded-full h-6 px-3 justify-center items-center">
                    เวลาทำนัดใหม่ :
                  </span>
                  <select className="inline-flex  px-3" onChange={handleTime}>
                    <option disabled selected value>
                      {" "}
                      เลือกเวลาการทำนัด
                    </option>
                    {timeslot.map((time) => (
                      <option
                        className="option"
                        value={JSON.stringify({
                          time: `${time}`,
                        })}
                      >
                        {" "}
                        {time}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 ">
          {/* <Link
            to={{
              pathname: `/summarypostpone`,
              state: {
                appointmentID: appointmentID,
                olddate: date,
                newdate: newdate,
                time: time,
                newtime: newtime,
                oldtimetableid: oldtimetableid,
                newtimetableid: newtimetableid,
              },
            }}
          > */}
          <Button
            onClick={checkData}
            variant="primary"
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            ถัดไป
          </Button>
          {/* </Link> */}{" "}
          <Link
            to={{
              pathname: `/working`,
              state: {
                doctorId: doctorid,
              },
            }}
          >
            <Button
              variant="secondary"
              style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
            >
              ย้อนกลับ
            </Button>
          </Link>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default PostponeScreen;
