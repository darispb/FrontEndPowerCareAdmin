import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./SummaryPostponeScreen.css";
import { Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { server } from "../../constants/constant";
function SummaryPostponeScreen() {
  const history = useHistory();
  const location = useLocation();
  const {
    appointmentID,
    olddate,
    time,
    newdate,
    newtime,
    oldtimetableid,
    newtimetableid,
    doctorId,
    userID,
  } = location.state;

  const displayThaiDate = (date) => {
    const result = new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    return result;
  };

  const editAppointment = () => {
    try {
      axios
        .put(server.SUMMARY_POSTPONE, {
          AppointmentID: appointmentID,
          OldTimeTableID: oldtimetableid,
          NewTimeTableID: newtimetableid,
          Date: newdate,
          OldTime: time,
          NewTime: newtime,
          olddate: olddate,
          userID: userID,
        })
        .then((res) => {
          const data = res.data;
          if (data == true) {
            window.alert("แก้ไขข้อมูลสำเร็จ");
            history.push({
              pathname: `/working`,
              state: { doctorId: doctorId },
            });
          }
        });
    } catch (error) {}
  };
  return (
    <div className="content-body">
      <div className="mt-2">
        <div className="  mx-auto bg-white rounded-md">
          {/* first */}
          <div className="flex flex-col justify-center items-center">
            <p class="text-xl mt-3 font-semibold">สรุปข้อมูลการเลื่อนนัด</p>
            {/* <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className="text-gray-500 ml-4">รหัสผู้ป่วย : A001</p>
            </div> */}
            {/* <div
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
                ชื่อ-สกุล : {username} เพศ : {sex} วัน/เดือน/ปีเกิด :{" "}
                {displayThaiDate(dateofbirth)}
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
                เบอร์โทร : {phone} E-mail : {email}
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
              <p className=" text-gray-500 ml-4">แพทย์ที่พบ : {doctorname}</p>
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
            </div> */}
            {/* <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className="text-gray-600 ml-4">
                <b>ข้อมูลทำนัด : วันที่ 1/1/64 เวลา 10.30-11.00 น. </b>
              </p>
            </div> */}
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
                <b> วันที่ทำนัดเดิม : {displayThaiDate(olddate)}</b>
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
        border-b-2 border-gray-200
      "
            >
              <p className="text-green-500 ml-4">
                <b> วันที่ทำนัดใหม่ : {displayThaiDate(newdate)}</b>
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
              <p className="text-green-500 ml-4">
                <b> เวลาที่ทำนัดใหม่ : {newtime}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 ">
          <br />
          {/* <Link to="/postpone"> */}
          <Button
            onClick={editAppointment}
            variant="primary "
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            บันทึกผล
          </Button>
          {/* </Link> */}{" "}
          <Link
            to={{
              pathname: `/working`,
              state: {
                doctorId: doctorId,
              },
            }}
          >
            <Button
              variant="secondary"
              style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
            >
              ยกเลิก
            </Button>
          </Link>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default SummaryPostponeScreen;
