import React, { useContext, useState } from "react";
import "./Login.css";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import firebaseConfig from "../../config";
import { AuthContext } from "../../Auth";
import { Redirect } from "react-router-dom";
import firebaseconfig from "../../config";
import axios from "axios";
import { server } from "../../constants/constant";
import { useHistory } from "react-router";

const Login = () => {
  const [role, setrole] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseconfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .catch((error) =>
          window.alert("ลงชื่อเข้าใช้ผิดพลาด โปรดลองใหม่อีกครั้ง")
        );
    } catch (error) {
      window.alert("ลงชื่อเข้าใช้ผิดพลาด โปรดลองใหม่อีกครั้ง");
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    axios.get(`${server.LOGIN}/${currentUser.email}`).then((res) => {
      if (res.data == "เจ้าหน้าที่") {
        setrole(history.push("/homescreenstaff"));
        // return <Redirect to="/homescreenstaff" />;
      } else if (res.data == "แพทย์") {
        setrole(history.push("/homescreendoctor"));
        // return <Redirect to="/homescreendoctor" />;
      } else if (res.data == "ผู้ดูแลระบบ") {
        setrole(history.push("/homescreenadmin"));
        // return <Redirect to="/homescreenadmin" />;
      }
    });
    return role;
    // return <Redirect to="/homescreenstaff" />;
  }

  // const user = checkRole(currentUser.Email);
  // if (user == "เจ้าหน้าที่") {
  //   return <Redirect to="/homescreenstaff" />;
  // } else if (user == "แพทย์") {
  //   return <Redirect to="/homescreendoctor" />;
  // } else if (user == "ผู้ดูแลระบบ") {
  //   return <Redirect to="/homescreenadmin" />;
  // }

  return (
    <div className="bg-indigo-200 h-screen w-screen">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: 500 }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-thin">
                Power Care Clinic
              </h1>

              <div className="w-full mt-4">
                <form
                  className="form-horizontal w-3/4 mx-auto"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="text"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="email"
                      required
                      placeholder="Email"
                      pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                      required
                    />
                  </div>
                  {/* <div className="flex flex-col mt-4">
                    <input
                      id="email"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      // name="email"
                      defaultValue
                      placeholder="Email"
                      pattern="[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})"
                      required
                     
                    />
                  </div> */}
                  <div className="flex flex-col mt-4">
                    <input
                      id="password"
                      type="password"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="password"
                      required
                      placeholder="Password"
                    />
                  </div>
                  {/* <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      className="mr-2"
                    />{" "}
                    <label
                      htmlFor="remember"
                      className="text-sm text-grey-dark"
                    >
                      Remember Me
                    </label>
                  </div> */}
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      className="button-done hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded"
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className="text-center mt-4">
                  {/* <a
                    className="no-underline hover:underline text-blue-dark text-xs"
                    // Link หน้าไป
                  >
                    Forgot Your Password?
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              background:
                'url("https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80")',
              backgroundSize: "cover",
              backgroundPosition: "center center",

              // รูปมาเปลี่ยนเป็น โลโก้
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
