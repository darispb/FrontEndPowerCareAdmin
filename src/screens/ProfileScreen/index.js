import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProfileScreen.css";
import axios from "axios";
import { server } from "../../constants/constant";
import { AuthContext } from "../../Auth";
function ProfileScreen() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [position, setposition] = useState("");
  const [email, setemail] = useState("");
  const [documentid, setdocumentid] = useState("");
  // const location = useLocation();
  // const { uid } = location.state;
  const { currentUser } = useContext(AuthContext);

  const getProfile = () => {
    try {
      axios.get(`${server.PROFILE}/${currentUser.uid}`).then((res) => {
        setfirstname(res.data.FirstName);
        setlastname(res.data.LastName);
        setposition(res.data.Position);
        setemail(res.data.Email);
        setphone(res.data.Phone);
        setdocumentid(res.data.DocumentID);
        // console.log(res.data);
      });
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getProfile();
  },[]);
  return (
    <div className="content-body">
      <div className="grid min-h-screen place-items-center ">
        <div className="w-11/12 p-12 bg-indigo-100 sm:w-8/12 md:w-1/2 lg:w-5/12">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              ข้อมูลส่วนตัว
            </h6>
            <Link
              to={{
                pathname: `/editofficer`,
                state: {
                  state_DocumentID: documentid,
                  state_FirstName: firstname,
                  state_LastName: lastname,
                  state_Phone: phone,
                  state_Position: position,
                  state_Email: email,
                },
              }}
            >
              <button className="bg-indigo-300 text-white active:bg-indigo-300 uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                แก้ไขข้อมูลส่วนตัว
              </button>
            </Link>
          </div>
          <hr className="mt-6 mb-6 border-b-1 border-blueGray-300" />
          {/* <form className="mt-6"> */}
          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label className="block text-xs font-semibold text-gray-600 uppercase">
                ชื่อจริง <h className="text-red-600"> * </h>
              </label>
              <input
                type="text"
                name="FirstName"
                value={firstname}
                // onChange={checkFirstName}
                className="block b-2 w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
                readOnly
              />
            </span>
            <span className="w-1/2">
              <label className="block text-xs font-semibold text-gray-600 uppercase">
                นามสกุล <h className="text-red-600"> * </h>
              </label>
              <input
                type="text"
                name="LastName"
                value={lastname}
                // onChange={checkLastName}
                className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
                readOnly
              />
            </span>
          </div>
          <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
            หมายเลขโทรศัพท์{" "}<h className="text-red-600"> * </h>
          </label>
          <input
            type="tel"
            name="Phone"
            value={phone}
            // onChange={checkPhone}
            readOnly
            className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
          />
          <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
            ตำแหน่งงาน<h className="text-red-600"> * </h>
          </label>
          <input
            value={position}
            id="position"
            name="Position"
            className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
            // onClick={handlePosition}
            readOnly
          />
          <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
            อีเมลล์{" "}<h className="text-red-600"> * </h>
          </label>
          <input
            type="email"
            name="Email"
            value={email}
            // onChange={checkEmail}
            className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
            readOnly
          />
        </div>
      </div>
    </div>
  );
}
export default ProfileScreen;
