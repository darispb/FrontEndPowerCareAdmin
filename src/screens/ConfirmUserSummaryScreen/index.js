import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Success from "../../icons/success";

import { useLocation } from "react-router";

function ConfirmUserSummaryScreen() {
//   const location = useLocation();
//   const { firstname, lastname, phone, position, email } = location.state;

  return (
    <div className="content-body">
      <div className="flex items-center justify-center mt-10">
        <div className="relative bg-indigo-50 py-6 px-6 rounded-3xl w-4/6 my-4 shadow-xl ">
          <div className="mt-8">
          <center><Success /></center>
          <br/>
            <p className="text-xl  font-semibold my-2">บันทึกข้อมูลคนไข้สำเร็จ</p>
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
            <div className="px-2 mt-4">
              <Link to="/">
                <Button
                  variant="primary"
                  style={{
                    borderColor: "#bdbdbd",
                    backgroundColor: "#bdbdbd",
                  }}
                >
                  กลับสู่หน้าหลัก
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default ConfirmUserSummaryScreen;
