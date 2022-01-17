import { useState, useEffect } from "react";
import SearchIcon from "../../icons/search-icon";
import Add from "../../icons/add-paper";
import Edit from "../../icons/edit";
import CloseIcon from "../../icons/close-icon";
import Delete from "../../icons/delete";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useLocation, useParams } from "react-router";
import axios from "axios";
import { server } from "../../constants/constant";
import "./UserDetailScreen.css";
import { TableController } from "../../components";
export default function UserDetailScreen() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [sex, setsex] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [address, setaddress] = useState("");
  const [appointment, setappointment] = useState([]);
  const [show, setShow] = useState(false);
  const iconOption = { className: "icon-link", width: "1rem", height: "1rem" };
  const location = useLocation();
  const { userid, dataSearch } = location.state;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayThaiDate = (date) => {
    const result = new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    return result;
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

  const getUserProfile = () => {
    try {
      axios.get(`${server.USER_DETAIL}/${userid}`).then((res) => {
        const data = res.data;
        setfirstname(data.user.FirstName);
        setlastname(data.user.LastName);
        setsex(data.user.Sex);
        setdateOfBirth(data.user.DateOfBirth);
        setaddress(data.user.Address);
        setphone(data.user.Phone);
        setemail(data.user.Email);
        // setappointment(data.appointment);
        const app = data.appointment;
        const success = app.filter((data) => data.Status == "สำเร็จ");
        setappointment(success);
      });
    } catch (error) {}
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="content-body">
      <p class="text-xl mt-3 font-semibold">ระเบียนคนไข้</p>
      <div className="working-content">
        <div className="mt-2">
          <div className="  mx-auto bg-white rounded-md">
            {/* first */}
            <div className="flex flex-col justify-center items-center">
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
                  <b>ชื่อ-สกุล :</b> {firstname} {lastname} <b>เพศ : </b>
                  {sex} <b>วัน/เดือน/ปีเกิด : </b>
                  {displayThaiDate(dateOfBirth)}
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
                  <b>ที่อยู่ :</b> {address}
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
                  <b> เบอร์โทรศัพท์ :</b> {phone} <b>E-mail :</b> {email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="working-content">
          <div className="table-content">
            <div className="table-grid-userdetail header">
              <p>วันที่</p>
              <p>เวลา</p>
              <p>แพทย์ที่พบ</p>
              <p>สถานะ</p>
              <p>ดูข้อมูล</p>

              {/* end header */}
            </div>
            <div className="body-table">
              {/* body table */}
              {appointment.map((app) => (
                <div className="table-grid-userdetail">
                  <p>{displayShortThaiDate(app.Date)}</p>
                  <p>{app.Time}</p>
                  <p>{app.DoctorName}</p>
                  {/* <p>{093849586}</p> */}
                  <p>{app.Status}</p>

                  <div className="menu-row">
                    <Link
                      // to ="summarytreatment"

                      to={{
                        pathname: `/summarytreatment`,
                        state: {
                          username: app.UserName,
                          // userid: app.UserID,
                          date: app.Date,
                          time: app.Time,
                          doctorname: app.DoctorName,
                          status: app.Status,
                          symptom: app.Initial_Symptoms,
                          treatmentid: app.TreatmentID,
                          userid: userid,
                          dataSearch: dataSearch,
                        },
                      }}
                    >
                      <Add
                        {...iconOption}
                        // onClick={() => console.log("Click function add " + item.id)}
                      />
                    </Link>

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>คำเตือน</Modal.Title>
                      </Modal.Header>

                      <center>
                        <Modal.Body>
                          คุณต้องการลบข้อมูลคนไข้ท่านนี้หรือไม่ ?
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
                          onClick={handleClose}
                          style={{
                            borderColor: "danger",
                            backgroundColor: "danger",
                          }}
                        >
                          ยืนยันลบคนไข้
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-2 mt-3 ">
            <Link
              to={{
                pathname: `/user`,
                state: {
                  dataSearch: dataSearch,
                },
              }}
            >
              <Button
                variant="secondary"
                style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
              >
                ย้อนกลับ
              </Button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
