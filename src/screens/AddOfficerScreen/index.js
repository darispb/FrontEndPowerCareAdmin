import React, { useState } from "react";
import "./AddOfficerScreen.css";
import { Link, Redirect, Route } from "react-router-dom";
import axios from "axios";
import { regEmail, regThaiChar, regPhoneNumber } from "../../regex";
import { server } from "../../constants/constant";
import { useHistory } from "react-router";

import { Button } from "react-bootstrap";

const AddOfficerScreen = () => {
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Phone, setPhone] = useState();
  const [Position, setPosition] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [exist, setexist] = useState(Boolean);
  const history = useHistory();

  const refreshPage = () => {
    window.location.reload();
  };

  const checkFirstName = (firstname) => {
    const data = firstname.target.value;
    setFirstName(data);
    const result = regThaiChar.test(FirstName);
    console.log(result);
    return result;
  };

  const checkLastName = (lastname) => {
    const data = lastname.target.value;
    setLastName(data);
    const result = regThaiChar.test(LastName);
    console.log(result);
    return result;
  };

  const checkPhone = (phone) => {
    const data = phone.target.value;
    setPhone(data);
    const result = regPhoneNumber.test(Phone);
    console.log(result);
    return result;
  };

  const checkEmail = (email) => {
    const data = email.target.value;
    setEmail(data);
    const result = regEmail.test(Email);
    return result;
  };

  const handlePosition = (e) => {
    const position = e.target.value;
    setPosition(position);
    console.log(position);
  };

  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    console.log(Password);
  };

  const handleConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    console.log(confirmPassword);
  };

  const handleSubmit = () => {
    let user = {
      firstname: FirstName,
      lastname: LastName,
      phone: Phone,
      position: Position,
      email: Email,
      password: Password,
      confirmpassword: ConfirmPassword,
    };

    let data = Object.values(user).every((value) => value);
    try {
      if (data == false) {
        window.alert("โปรดกรอกข้อมูลให้ครบถ้วน");
      } else if (Password !== ConfirmPassword) {
        window.alert("โปรดกรอกรหัสผ่านให้ตรงกัน");
      } else if (!regPhoneNumber.test(Phone)) {
        window.alert("โปรดกรอกหมายเลขโทรศัพท์เป็นตัวเลข");
      } else if (!regEmail.test(Email)) {
        window.alert("โปรดกรอกอีเมลล์ให้ถูกต้อง");
      } else if (!regThaiChar.test(FirstName)) {
        window.alert("โปรดกรอกชื่อจริงเป็นภาษาไทย");
      } else if (!regThaiChar.test(LastName)) {
        window.alert("โปรดกรอกนามสกุลเป็นภาษาไทย");
      } else {
        try {
          axios.get(`${server.ADD_OFFICER}/${Email}`).then((res) => {
            const data = res.data;
            if (data == false) {
              window.alert(
                "ลงทะเบียนผิดพลาด เนื่องจากอีเมล์นี้มีบัญชีผู้ใช้ในระบบแล้ว"
              );
            } else {
              axios
                .post(server.ADD_OFFICER, {
                  FirstName: FirstName,
                  LastName: LastName,
                  Phone: Phone,
                  Position: Position,
                  Email: Email,
                  Password: Password,
                })
                .then((res) => {
                  const profile = res.data;
                  history.push({
                    pathname: `/confirmaddofficer`,
                    state: {
                      firstname: profile.FirstName,
                      lastname: profile.LastName,
                      phone: profile.Phone,
                      position: profile.Position,
                      email: profile.Email,
                    },
                  });
                });
            }
          });
        } catch (error) {
          return error;
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="content-body">
      <div className="grid min-h-screen place-items-center ">
        <div className="w-11/12 p-12 bg-indigo-100 sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold">เพิ่มบุคลากร </h1>
          <p className="text-xl font-semibold">สำหรับผู้ดูแลระบบ </p>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          {/* <form className="mt-6"> */}
          <div className="mt-6 flex justify-between gap-3">
            <span className="w-1/2">
              <label className="block text-xs font-semibold text-gray-600 uppercase">
                ชื่อจริง  <h className="text-red-600"> * </h>
              </label>
              <input
                type="text"
                name="FirstName"
                placeholder="โปรดกรอกชื่อจริง "
                onChange={checkFirstName}
                className="block b-2 w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label className="block text-xs font-semibold text-gray-600 uppercase">
                นามสกุล <h className="text-red-600"> * </h>
              </label>
              <input
                type="text"
                name="LastName"
                placeholder="โปรดกรอกนามสกุล "
                onChange={checkLastName}
                className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
                required
              />
            </span>
          </div>
          <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
            หมายเลขโทรศัพท์{" "} <h className="text-red-600"> * </h>
          </label>
          <input
            type="tel"
            name="Phone"
            placeholder="โปรดกรอกหมายเลขโทรศัพท์"
            onChange={checkPhone}
            required
            className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
          />
          <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
            ตำแหน่งงาน <h className="text-red-600"> * </h>
          </label>
          <select
            required={require}
            id="position"
            name="Position"
            className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
            onChange={handlePosition}
          >
            <option disabled selected value>
              {" "}
              โปรดระบุตำแหน่งงาน 
            </option>
            <option className="option" value="แพทย์">
              {" "}
              แพทย์{" "}
            </option>
            <option className="option" value="เจ้าหน้าที่">
              เจ้าหน้าที่
            </option>
            <option className="option" value="ผู้ดูแลระบบ">
              ผู้ดูแลระบบ
            </option>
          </select>
          <label className="block mt-2 text-xs font-semibold text-gray-600 uppercase">
            อีเมลล์{" "} <h className="text-red-600"> * </h>
          </label>
          <input
            type="email"
            name="Email"
            placeholder="โปรดกรอกอีเมลล์"
            onChange={checkEmail}
            required
            className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
          />

          <div className="flex justify-between gap-3">
            <span className="w-1/2">
              <label className="mt-2 block text-xs font-semibold text-gray-600 uppercase">
                รหัสผ่าน <h className="text-red-600"> * </h>
              </label>
              <input
                type="password"
                name="Password"
                placeholder="โปรดกรอกรหัสผ่าน"
                onChange={handlePassword}
                className="block b-2 w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
                required
              />
            </span>
            <span className="w-1/2">
              <label className=" mt-2 block text-xs font-semibold text-gray-600 uppercase">
                ยืนยันรหัสผ่าน <h className="text-red-600"> * </h>
              </label>
              <input
                type="password"
                name="ConfirmPassword"
                placeholder="โปรดยืนยันรหัสผ่านอีกครั้ง"
                onChange={handleConfirmPassword}
                className="block w-full p-3 mt-2 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
                required
              />
            </span>
          </div>

          <div className="mt-2">
            {/* <Link to="/confirmaddofficer"> */}
            <Button
              variant="secondary"
              className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-black shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
              onClick={handleSubmit}
            >
              เพิ่มบุคคลากร
            </Button>
            {/* </Link> */}
          </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};
export default AddOfficerScreen;
