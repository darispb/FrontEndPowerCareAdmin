import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./UserSummaryScreen.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router";
import axios from "axios";
import { server } from "../../constants/constant";

function UserSummaryScreen() {
  const history = useHistory();
  const [total, settotal] = useState(0);
  // const [state, setstate] = useState(initialState)
  // const [list, setlist] = useState([])
  const location = useLocation();
  const {
    appointmentid,
    userid,
    description,
    otherservice,
    medicine,
    date,
    time,
    doctorname,
    symtoms,
    price,
    choosemedicine,
  } = location.state;

  const calculate = () => {
    let arr = [];
    let totalCal = 0;
    for (let i = 0; i < choosemedicine.length; i++) {
      const element = choosemedicine[i];
      const totalmedicine = parseInt(element.Price) * element.quantity;
      arr.push(totalmedicine);
      console.log(totalmedicine);
    }
    arr.push(parseInt(price));
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      totalCal += arr[i];
    }
    console.log(totalCal);
    settotal(totalCal);
  };

  useEffect(() => {
    calculate();
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

  const submitTreatment = () => {
    try {
      axios
        .post(server.USER_SUMMARY, {
          AppointmentID: appointmentid,
          Description: description,
          MedicineQuantity: choosemedicine,
          TotalPrice: total,
          UserID: userid,
          OtherServiceDescription: otherservice,
          OtherServicePrice: price,
        })
        .then((res) => {
          if (res.data == true) {
            history.push("/confirmusersummary");
          } else {
            window.alert("มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง");
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
            <p class="text-xl mt-3 font-semibold">สรุปข้อมูลการรักษาคนไข้</p>
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
                <b>
                  {" "}
                  ข้อมูล ณ วันที่ {displayThaiDate(date)} รอบเวลา {time}{" "}
                </b>
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
                <b> แพทย์ที่พบ :{doctorname} </b>
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
                <b>สรุปผลอาการ :</b> {description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div
            className="
          flex
          justify-between
          items-center
          w-full
          py-3
          mt-2
        "
          >
            <p className=" text-black ml-4 font-bold">ค่าบริการยา: </p>
          </div>
          <div className="flex justify-center my-6">
            <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg rounded-md pin-r pin-y md:w-5/6 lg:w-5/6 ">
              <div className="flex-1">
                <table className="w-full text-sm lg:text-base" cellSpacing={0}>
                  <thead>
                    <tr className="h-12 ">
                      <th className="hidden text-center md:table-cell">
                        ชื่อยา
                      </th>
                      <th className="hidden text-center md:table-cell">
                        ราคาต่อหน่วย
                      </th>
                      <th className="lg:text-center text-left pl-5 lg:pl-0">
                        <span className="hidden lg:inline">จำนวน</span>
                      </th>
                      <th className="lg:text-center text-left pl-5 lg:pl-0">
                        <span className="hidden lg:inline">เป็นเงิน</span>
                      </th>
                      <th className="hidden text-center md:table-cell"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {choosemedicine.map((medicine) => (
                      <tr>
                        {/* <tr key={medicine.MedicineName}> */}
                        <td>
                          <p className="mb-2"></p>
                          <p className="mb-2 ">{medicine.MedicineName}</p>
                        </td>
                        <td className="hidden text-center md:table-cell">
                          <span className="text-sm lg:text-base font-medium">
                            {medicine.Price}
                          </span>
                        </td>
                        {/* <td className="text-center">
                          <span className="text-sm lg:text-base font-medium">
                            {medicine.Price}
                          </span>
                        </td> */}
                        <td className="text-center">
                          <span className="text-sm lg:text-base font-medium">
                            {medicine.quantity}
                          </span>
                        </td>
                        <td className="text-center">
                          <span className="text-sm lg:text-base font-medium">
                            {medicine.Price * medicine.quantity} บาท
                          </span>
                        </td>
                      </tr>
                    ))}

                    {/* ))} */}
                  </tbody>
                </table>
                {/* <hr className="pb-6 mt-6" /> */}
              </div>
            </div>
          </div>

          <div
            className="
          flex
          justify-between
          items-center
          w-full
          py-3
          mt-2
        "
          >
            <p className=" text-black ml-4 font-bold">ค่าบริการเพิ่มเติม: </p>
          </div>

          <div className="flex justify-center my-6">
            <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg rounded-md pin-r pin-y md:w-5/6 lg:w-5/6 ">
              <div className="flex-1">
                <table className="w-full text-sm lg:text-base" cellSpacing={0}>
                  <thead>
                    <tr className="h-12 ">
                      <th className="hidden text-center md:table-cell">
                        รายละเอียด
                      </th>
                      <th className="hidden text-center md:table-cell">ราคา</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-sm lg:text-base font-medium">
                          {otherservice}
                        </span>
                      </td>
                      <td className="justify-center  md:flex">
                        <div className="w-20 h-10">
                          <span className="text-sm lg:text-base  text-center font-medium">
                            {price}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <p>คิดเป็นเงินทั้งสิ้น : {total} บาท</p>
        <div className="px-4 mt-4 ">
          {/* <Link
            to="/confirmusersummary"
            // to={{
            //   pathname: `/userdetail`,
            //   state: {
            //     // userid: userid,
            //   },
            // }}
          > */}
          <Button
            onClick={submitTreatment}
            style={{
              borderColor: "#818CF8",
              backgroundColor: "#818CF8",
              color: "white",
            }}
          >
            บันทึกผล
          </Button>
          {/* </Link> */}{" "}
          <Link
            to={{
              pathname: `/workingdetaildoctor`,
              state: {
                appointmentID: appointmentid,
                userID: userid,
                date: date,
                time: time,
                doctorname: doctorname,
                symtoms: symtoms,
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

export default UserSummaryScreen;
