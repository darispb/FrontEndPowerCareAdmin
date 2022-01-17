import { useState, useEffect } from "react";
import "./AppointmentScreen.css";
import axios from "axios";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { server } from "../../constants/constant";

const AppointmentScreen = () => {
  const [doctor, setDoctor] = useState([]);
  const [id, setid] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const timeList = [
    "09.00 - 09.30",
    "09.30 - 10.00",
    "10.00 - 10.30",
    "10.30 - 11.00",
    "11.00 - 11.30",
    "11.30 - 12.00",
    "13.00 - 13.30",
    "13.30 - 14.00",
    "14.00 - 14.30",
    "14.30 - 15.00",
  ];

  useEffect(() => {
    axios.get(server.APPOINTMENT).then((res) => {
      setDoctor(res.data);
    });
  }, []);

  const handleData = (e) => {
    e.preventDefault();
    const data = e.target.value;
    const d = JSON.parse(data);
    const name = `${d.FirstName} ${d.LastName}`
    setName(name);
    setid(d.DocumentID);
  };

  // Input Component
  function InputSchedule({ title, children }) {
    return (
      <div className="input-schedule">
        <p>{title}</p>
        <div className="input-schedule-content">{children}</div>
      </div>
    );
  }

  // แปลง Date
  // const d = new Date(date);
  // const thaiDate = d.toLocaleDateString("th-TH", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   weekday: "long",
  // });

  // style when time-item active
  // const styleActive = { backgroundColor: "#7e99b8", color: "white" };

  // const transferDate = (date) => {
  //   new Date(date).toLocaleDateString();
  // };
  const refreshPage = () => {
    window.location.reload();
  };

  const submit = () => {
    let slot = {
      name: name,
      date: date,
      timeList: timeList,
    };

    let data = Object.values(slot).every((value) => value);
    try {
      if (data == false) {
        window.alert("โปรดกรอกชื่อแพทย์และวันที่ให้ครบ");
      } else {
        axios
          .post(server.APPOINTMENT, {
            doctor: name,
            date: date,
            time: timeList,
            id: id,
          })
          .then((res) => {
            if (res.data == "exist") {
              window.alert(
                "ผิดพลาด เนื่องจากมีตารางเวลาของแพทย์ที่เลือกอยู่ในระบบแล้ว"
              );
            } else {
              window.alert("เพิ่มเวลาการแพทย์สำเร็จ");
              refreshPage();
            }
          });
      }
    } catch (error) {}
  };

  const handleId = (documentid) => {
    setid(documentid);
  };

  console.log("name : ", name, "id : ", id);

  return (
    <div className="content-body mt-6">
      <p class="text-xl mt-3 font-semibold">จัดการตารางเวลา</p>

      {/* Input Doctor */}
      <div className="schedule-content mt-4">
        
        <InputSchedule title="เลือกหมอ" invalid>
          <select
            name="doctor-select"
            className="doctor-select"
            //value={name}
            onChange={handleData}
          >
            <option value="" disabled selected>
            กรุณาเลือกแพทย์...
            </option>
            {doctor.map((doctorname) => (
              <option
               value={JSON.stringify(doctorname)}
              >
                {doctorname.FirstName} {doctorname.LastName}
              </option>
            ))}
          </select>
          {/* <div>{name}</div> */}
          <h3 style={{ position: "absolute", right: "3rem", top: "4rem" }}>
            ▼
          </h3>
        </InputSchedule>

        {/* Input Date */}
        <InputSchedule title="เลือกวันที่">
          <DatePicker
            value={date}
            onChange={setDate}
            format={"DD/MM/YYYY"}
            style={{
              width: "100%",
              height: "50px",
              boxSizing: "border-box",
            }}
            placeholder=" กรุณาเลือกวันที่"
            multiple
            plugins={[<DatePanel />]}
          />
        </InputSchedule>

        <span className="button-submit" onClick={submit}>
          ยืนยัน
        </span>
      </div>
      <div className="px-2 mt-3">
      <Link to="/schedule">
              <Button
                variant="secondary"
                style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
              >
                ย้อนกลับ
              </Button>
            </Link>{" "}
            </div>
    </div>
  );
};
export default AppointmentScreen;
