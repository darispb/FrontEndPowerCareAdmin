import { useState, useEffect } from "react";
// import "./AppointmentScreen.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { server } from "../../constants/constant";
import axios from "axios";
const SelectWorkingScreen = () => {
  const [doctor, setdoctor] = useState([]);
  const [id, setid] = useState("");

  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = () => {
    try {
      axios.get(server.SELECT_WORKING).then((res) => {
        // console.log(res.data);
        const data = res.data;
        setdoctor(data);
      });
    } catch (error) {}
  };
  // console.log(doctor);

  const handleID = (e) => {
    const id = e.target.value;
    setid(id);
  };

  return (
    <div className="content-body">
      <div className="grid min-h-screen place-items-center  ">
        <div className="w-11/12 p-12 bg-indigo-100 sm:w-8/12 md:w-1/2 lg:w-5/12">
          <h1 className="text-xl font-semibold">
            กรุณาเลือกแพทย์ที่ต้องการค้นหา
          </h1>
          <hr className="mt-6 border-b-1 border-blueGray-300" />
          {/* <form className="mt-6"> */}

          <select
            // required={require}
            id="position"
            name="Position"
            className="block w-full p-3 mt-3 text-gray-700 bg-white-200 appearance-none focus:outline-none focus:bg-white-300 focus:shadow-inner"
            onChange={handleID}
          >
            <option disabled selected value>
              {" "}
              กรุณาเลือกแพทย์ ..
            </option>
            {doctor.map((doctor) => (
              <option className="option" value={doctor.DocumentID}>
                {" "}
                {doctor.FirstName} {doctor.LastName}{" "}
              </option>
            ))}
          </select>

          <div className="mt-2">
            <Link
              to={{
                pathname: `/working`,
                state: {
                  doctorId: id,
                },
              }}
            >
              <Button
                variant="secondary"
                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                ค้นหาแพทย์
              </Button>
            </Link>
          </div>
          <div className="mt-2">
            <Link to="/">
              <Button
                variant="secondary"
                className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-gray shadow-lg focus:outline-none hover:bg-gray-900 hover:shadow-none"
              >
                กลับสู่หน้าหลัก
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectWorkingScreen;
