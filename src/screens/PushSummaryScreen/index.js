import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../constants/constant";
// import Success from "../../icons/success";
import { useLocation, useHistory } from "react-router";
function PushSummaryScreen() {
  const history = useHistory();
  const location = useLocation();
  const {
    appointmentid,
    medicinequantity,
    otherserviceprice,
    otherservicedesc,
    username,
    treatmentid,
    totalprice,
    // appointmentid,
    // treatmentid,
    // username,
    symptom,
    date,
    time,
    doctorname,
    doctorId,
  } = location.state;
  console.log(location.state);

  const hadlepushsummary = () => {
    try {
      axios.post(server.PUSH_SUMMARY, {
        treatmentid: treatmentid,
        appointmentid: appointmentid,
        medicinequantity: medicinequantity,
        otherserviceprice: otherserviceprice,
        otherservicedesc: otherservicedesc,
        totalprice: totalprice,
        date: date,
        time: time,
      });
      window.alert("ส่งข้อมูจสำเร็จ")
      // .then(
        history.push({
          pathname: `/working`,
          state: {
            doctorId: doctorId,
          },
        })
      // );
    } catch (error) {}
  };
  return (
    <div className="content-body">
      <div className="flex items-center justify-center mt-10">
        <div className="relative bg-indigo-50 py-6 px-6 rounded-3xl w-4/6 my-4 shadow-xl ">
          <div className="mt-8">
            <center>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png"
                className="w-20 h20"
              />
            </center>
            <br />
            <p className="text-xl  font-semibold my-2">ข้อมูลสรุปการรักษา</p>
            <p className="text-l  font-semibold my-2">สำหรับคนไข้</p>
            <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-white
        "
            ></div>
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
              <div className="flex justify-center my-6">
                <div className="flex-1">
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
                  <table
                    className="w-full text-sm lg:text-base"
                    cellSpacing={0}
                  >
                    <thead>
                      <tr className="h-12 ">
                        <th className="lg:text-center text-left pl-5 lg:pl-0">
                          <span className="hidden lg:inline">ชื่อยา</span>
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
                      {medicinequantity.map((medicine) => (
                        <tr>
                          <td className="text-left">
                            <p className="mb-2 ">{medicine.MedicineName}</p>
                          </td>
                          <td className="text-center">
                            <span className="text-sm lg:text-base font-medium">
                              {medicine.quantity}
                            </span>
                          </td>
                          <td className="text-center">
                            <span className="text-sm lg:text-base font-medium">
                              {medicine.quantity * medicine.Price} บาท
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                    <p className=" text-black ml-4 font-bold mt-2">
                      ค่าบริการเพิ่มเติม:{" "}
                    </p>
                  </div>
                  <table
                    className="w-full text-sm lg:text-base"
                    cellSpacing={0}
                  >
                    <thead>
                      <tr className="h-12 ">
                        <th className="lg:text-center text-left pl-5 lg:pl-0">
                          <span className="hidden lg:inline">รายละเอียด</span>
                        </th>
                        <th className="lg:text-center text-left pl-5 lg:pl-0">
                          <span className="hidden lg:inline">เป็นเงิน</span>
                        </th>
                        <th className="hidden text-center md:table-cell"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="text-left">
                          <p className="mb-2 ">{otherservicedesc}</p>
                        </td>
                        <td className="text-center">
                          <span className="text-sm lg:text-base font-medium">
                            {otherserviceprice}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            รวมเป็นเงิน : {totalprice} บาท
            <div className="px-2 mt-4">
              {/* <Link to="/"> */}
              <Button
                onClick={hadlepushsummary}
                variant="primary"
                style={{
                  borderColor: "#818CF8",
                  backgroundColor: "#818CF8",
                }}
              >
                ส่งข้อมูลคนไข้
              </Button>
              {/* </Link> */}{" "}
              <Link
                to={{
                  pathname: `workingdetailsummary`,
                  state: {
                    appointmentid: appointmentid,
                    treatmentid: treatmentid,
                    username: username,
                    symptom: symptom,
                    date: date,
                    time: time,
                    doctorname: doctorname,
                    doctorId: doctorId,
                  },
                }}
                // to="/workingdetailsummary"
              >
                <Button
                  variant="primary"
                  style={{
                    borderColor: "#bdbdbd",
                    backgroundColor: "#bdbdbd",
                  }}
                >
                  ย้อนกลับ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end */}

      {/* <div className="px-2 ">
        <Link
          to={{
            pathname: `/working`,
            state: {
              doctorId: doctorid,
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
      </div> */}
      {/* end */}
    </div>
  );
}

export default PushSummaryScreen;
