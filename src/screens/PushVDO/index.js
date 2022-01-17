import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./WorkingDetailScreen.css";
import { Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { server } from "../../constants/constant";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

function PushVDO() {
  const location = useLocation();
  const history = useHistory();
  const { appointmentID, userID, doctorId } = location.state;
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [sex, setsex] = useState("");
  const [email, setemail] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [fnameuser, setfnameuser] = useState("");
  const [lnameuser, setlnameuser] = useState("");

  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [doctorname, setdoctorname] = useState("");
  const [symptoms, setsymptoms] = useState("");

  const [linkmeeting, setlinkmeeting] = useState("");

  const handleLink = (e) => {
    const data = e.target.value;
    // console.log(data);
    setlinkmeeting(data);
  };

  const pushVdo = () => {
    try {
      const link = { linkmeeting: linkmeeting };
      const data = Object.values(link).every((value) => value);
      if (data == false) {
        window.alert("โปรดกรอกช่องทางการวีดีโอคอล");
      } else {
        axios.post(server.PUSH_VDO, {
          appointmentId: appointmentID,
          userId: userID,
          meetingLink: linkmeeting,
        });
        window.alert("ส่งข้อมูลให้ผู้ใช้สำเร็จ");
        history.push(`/working`, {
          doctorId: doctorId,
        });
      }
    } catch (error) {}
  };

  const getAppointment = () => {
    try {
      axios.get(`${server.PUSH_VDO}/${appointmentID}`).then((res) => {
        const data = res.data;
        setdate(data.Date);
        settime(data.Time);
        setdoctorname(data.DoctorName);
        setsymptoms(data.Initial_Symptoms);
      });
    } catch (error) {}
  };

  const getUserProfile = () => {
    try {
      axios.get(`${server.PUSH_VDO}/user/${userID}`).then((res) => {
        const data = res.data;
        setfnameuser(data.FirstName);
        setlnameuser(data.LastName);
        setsex(data.Sex);
        setdateofbirth(data.DateOfBirth);
        setaddress(data.Address);
        setphone(data.Phone);
        setemail(data.Email);
      });
    } catch (error) {}
  };

  const displayShortThaiDate = (date) => {
    const result = new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
      // weekday: "short",
    });
    return result;
  };

  useEffect(() => {
    getAppointment();
    getUserProfile();
  }, []);

  return (
    <div className="content-body">
      <div className="mt-2">
        <div className="  mx-auto bg-white rounded-md">
          {/* first */}
          <div className="flex flex-col justify-center items-center">
            <p class="text-xl mt-3 font-semibold">ข้อมูลคนไข้</p>
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
                <b>ชื่อ-สกุล :</b> {fnameuser} {lnameuser} <b>เพศ :</b> {sex}{" "}
                <b>วัน/เดือน/ปีเกิด :</b> {displayShortThaiDate(dateofbirth)}
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
              <p className="text-gray-500 ml-4">
                <b>ข้อมูลทำนัด ณ</b> {displayShortThaiDate(date)} <b>เวลา</b>{" "}
                {time}
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
                <b>อาการเบื้องต้น :</b> {symptoms}
              </p>
            </div>
            
          </div>
        </div>
      </div>

      <div
        className="
        flex
        justify-between
        items-right
        w-full
        py-3
        mt-2
    "
      >
        <p className=" text-black ml-4 font-bold ">ช่องทางการวีดีโอคอล <h className="text-red-600"> * </h> </p>
      </div>

      <textarea
        onChange={handleLink}
        className="form-control Detail"
        placeholder="กรุณากรอกช่องทางการวีดีโอคอล"
        rows="2"
        cols="50"
      ></textarea>

      <div className="px-2 mt-3">
        {/* <Link to="/"> */} {/* link -> pushmessage user */}
        <Button
          onClick={pushVdo}
          variant="primary"
          style={{
            borderColor: "#818CF8",
            backgroundColor: "#818CF8",
          }}
        >
          ส่งข้อมูลการติดต่อ
        </Button>
        {/* </Link>{" "} */}{" "}
        <Link
          to={{
            pathname: `/working`,
            state: {
              doctorId: doctorId,
            },
          }} //link ->working

          //   to={{
          //     pathname: `/working`,
          //     state: {
          //       doctorId: doctorid,
          //     },
          //   }}
        >
          <Button
            variant="primary"
            style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
          >
            ย้อนกลับ
          </Button>
        </Link>
      </div>
      {/* end */}
    </div>
  );
}

export default PushVDO;
