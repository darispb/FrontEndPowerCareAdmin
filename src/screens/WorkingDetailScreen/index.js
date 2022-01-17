import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "./WorkingDetailScreen.css";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router";
import axios from "axios";
import { server } from "../../constants/constant";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

function WorkingDetailScreen() {
  const location = useLocation();
  const {
    // appointmentID,
    userID,
    username,
    date,
    time,
    symtoms,
    doctorname,
    doctorid,
    status,
    fnamedoctor,
    lnamedoctor,
    doctorId,
    meetingLink,
  } = location.state;
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [sex, setsex] = useState("");
  const [email, setemail] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  // const [description, setdescription] = useState("");
  // const [totalprice, settotalprice] = useState("");
  // const [medicine, setmedicine] = useState([]);
  // const [otherservice, setotherservice] = useState([]);

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

  // const openLink = (e) => {
  //   const data = e.target.value;
  //   // document.getElementById(data).getAttribute("href");
  // };

  //   const getTreatment = () => {
  //     try {
  //       axios
  //         .post(server.WORKING_DETAIL, {
  //           AppointmentID: appointmentID,
  //         })
  //         .then((res) => {
  //           const data = res.data[0];
  //           setdescription(data.Description);
  //           settotalprice(data.TotalPrice);
  //           setmedicine(data.MedicineQuantity);
  //           setotherservice(data.OtherService);
  //         });
  //     } catch (error) {
  //       return error;
  //     }
  //   };
  //   // console.log(medicine)

  //   const refreshPage = () => {
  //     window.location.reload();
  //   };

  useEffect(() => {
    getWorkingDetail();
    // getTreatment();
  }, []);

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
              <p className="text-gray-500 ml-4">
                <b>ข้อมูลทำนัด ณ</b> {displayThaiDate(date)} <b>เวลา</b> {time}
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
              <p className=" text-gray-500 ml-4 text-left">
                <b>ช่องทางการ Video Call : </b>
                <a href={meetingLink} target="_blank">
                  {meetingLink}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 mt-3">
        <Link
          to={{
            pathname: `/working`,
            state: {
              doctorId: doctorId,
            },
          }}
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

export default WorkingDetailScreen;
