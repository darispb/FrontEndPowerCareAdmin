import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./HomeScreenDoctor.css";
import CalendarInlineIcon from "../../icons/calendar-inline";
import { AuthContext } from "../../Auth";
import { server } from "../../constants/constant";
import axios from "axios";

const HomeScreenDoctor = () => {
  const { currentUser } = useContext(AuthContext);
  const [uid, setuid] = useState("");
  const [doctorname, setdoctorname] = useState("");

  const getProfileDoctor = () => {
    axios.get(`${server.HOMESCREEN_DOCTOR}/${currentUser.uid}`).then((res) => {
      console.log(res.data);
      if (res.data == false) {
        window.alert("คุณไม่มีสิทธิ์เข้าถึง");
      } else {
        setuid(res.data.DocumentID);
      }
    });
  };

  useEffect(() => {
    getProfileDoctor();
  }, []);

  return (
    <div className="content-body">
      <div class="mt-10 text-center">
        <h1 class="text-4xl font-bold text-gray-800">PowerCare Clinic</h1>
        <p class="text-lg mt-3 font-semibold">สำหรับแพทย์</p>
        <div
          className="
        flex
        justify-between
        items-center
        w-full
        py-2
        border-b-2 border-gray-200
      "
        />

        <div className=" flex  flex-col  md:flex-row justify-center  flex-wrap gap-3 mt-10  ">
          <div className>
            <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-300 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
              <div className="bg-indigo-300  flex h-20  items-center justify-center">
                <CalendarInlineIcon width="50%" height="50%" />
              </div>
              <p className="py-6 px-6 text-lg tracking-wide text-center">
                ตารางปฏิบัติการ
              </p>
              {/* <hr > */}
              <div className="flex justify-center px-5 mb-2 text-sm ">
                <Link
                  to={{
                    pathname: `/workingdoctor`,
                    state: {
                      id: uid,
                    },
                  }}
                >
                  <button
                    type="button"
                    className="border border-indigo-300 text-indigo-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-400 focus:outline-none focus:shadow-outline"
                  >
                    คลิก
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className>
            <div className="bg-white w-150 h-150 max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-300 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
              <div className="bg-indigo-300  flex h-20  items-center justify-center">
                <CalendarInlineIcon width="50%" height="50%" />
              </div>
              <p className="py-6 px-6 text-lg tracking-wide text-center">
                ยาและผลิตภัณฑ์
              </p>
              {/* <hr > */}
              <div className="flex justify-center px-5 mb-2 text-sm ">
                <Link to="/medicine">
                  <button
                    type="button"
                    className="border border-indigo-300 text-indigo-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-400 focus:outline-none focus:shadow-outline"
                  >
                    คลิก
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeScreenDoctor;
