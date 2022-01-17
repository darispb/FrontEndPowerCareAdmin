import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURL, server } from "../../constants/constant";
import { useLocation, useHistory } from "react-router";
import Delete from "../../icons/delete";
import SearchIcon from "../../icons/search-icon";
import { AuthContext } from "../../Auth";
import React, { useContext } from "react";
import { regPhoneNumber } from "../../regex";

function WorkingDetailDoctorScreen() {
  const [searched, setSearched] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const {
    appointmentID,
    userID,
    username,
    date,
    time,
    symtoms,
    doctorname,
    status,
    id,
    meetinglink,
  } = location.state;

  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [sex, setsex] = useState("");
  const [email, setemail] = useState("");
  const [dateofbirth, setdateofbirth] = useState("");
  const [medicine, setmedicine] = useState([]);
  const [choosemedicine, setchoosemedicine] = useState([]);
  const [quantity, setquantity] = useState([]);
  const [description, setdescription] = useState("");
  const [otherservice, setotherservice] = useState("");
  const [price, setprice] = useState("");
  const [resultotherservice, setresultotherservice] = useState([]);
  // const [medicineID, setmedicineID] = useState("");
  // const [medicineResult, setmedicineResult] = useState("")

  const getWorkingDetail = () => {
    try {
      axios.get(`${server.WORKING_DETAIL}/${userID}`).then((res) => {
        setaddress(res.data.Address);
        setphone(res.data.Phone);
        setsex(res.data.Sex);
        setemail(res.data.Email);
        setdateofbirth(res.data.DateOfBirth);
      });
    } catch (error) {
      return error;
    }
  };

  const getMedicine = () => {
    try {
      axios.get(`${server.WORKING_DETAIL_DOCTOR}`).then((res) => {
        setmedicine(res.data);
      });
    } catch (error) {}
  };

  const handleMedicine = async (e) => {
    const med = e.target.value;
    const data = await JSON.parse(med);
    data.medicine["quantity"] = 1;
    console.log(data);
    setchoosemedicine([...choosemedicine, data.medicine]);
    // setmedicineID(data.medicine.MedicineID);
  };

  useEffect(() => {
    getWorkingDetail();
    getMedicine();
  }, []);

  const handleToUserSummary = () => {
    if (description == "") {
      window.alert("จำเป็นต้องกรอกคำแนะนำ");
    } else if (!regPhoneNumber.test(price)) {
      window.alert("โปรดกรอกยาเป็นตัวเลข");
    } else {
      history.push({
        pathname: `/usersummary`,
        state: {
          appointmentid: appointmentID,
          userid: userID,
          description: description,
          otherservice: otherservice,
          medicine: choosemedicine,
          date: date,
          time: time,
          doctorname: doctorname,
          symtoms: symtoms,
          price: price,
          choosemedicine: choosemedicine,
          otherservice: otherservice,
          price: price,
        },
      });
    }
  };

  const displayThaiDate = (date) => {
    const result = new Date(date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    return result;
  };

  const handleDeleteMedicine = (MedicineID) => {
    const index = choosemedicine.findIndex(
      (med) => med.MedicineID == MedicineID
    );
    const arr = choosemedicine.splice(index, 1);
    const array = choosemedicine.filter((x) => x.MedicineID !== arr.MedicineID);
    setchoosemedicine(array);
  };

  const iconOption = { className: "icon-link", width: "1rem", height: "1rem" };

  const handleQuantity = (data) => {
    console.log(data);
  };

  // console.log(medicineResult)

  // const calculatePrice = (MedicineID) => {
  //   const index = choosemedicine.findIndex(
  //     (med) => med.MedicineID == MedicineID
  //   );

  //   const oldPrice = choosemedicine[index].Price;
  //   const newPrice = oldPrice * quantity;
  //   console.log(newPrice);
  // };

  // console.log(choosemedicine);

  const handleDescription = (e) => {
    const data = e.target.value;
    setdescription(data);
  };

  const handleOtherserviceDescription = (e) => {
    const data = e.target.value;
    setotherservice(data);
    //  setresultotherservice(JSON.stringify({ name: otherservice, price: price }));
  };

  const handleOtherServicePrice = (e) => {
    const data = e.target.value;
    setprice(data);
    //setresultotherservice({ name: otherservice, price: price });
  };

  const addmed = (id, index) => {
    // const id = e.target.value;
    const data = Object.values(choosemedicine).some(
      (data) => (data.MedicineID = id)
    );
    if (data == true) {
      let items = [...choosemedicine];
      let item = { ...choosemedicine[index] };
      item.quantity = choosemedicine[index].quantity + 1;
      items[index] = item;
      setchoosemedicine(items);
    }
    // setchoosemedicine(choosemedicine);
    // console.log(index);
  };

  const delmed = (id, index) => {
    const data = Object.values(choosemedicine).some(
      (data) => (data.MedicineID = id)
    );
    if (data == true) {
      let items = [...choosemedicine];
      let item = { ...choosemedicine[index] };
      item.quantity = choosemedicine[index].quantity - 1;
      items[index] = item;
      if (items[index].quantity == 0) {
        const arr = choosemedicine.splice(index, 1);
        const array = choosemedicine.filter(
          (x) => x.MedicineID !== arr.MedicineID
        );
        setchoosemedicine(array);
      } else {
        setchoosemedicine(items);
      }
    }
  };
  return (
    <div className="content-body">
      <div className="mt-2">
        <div className="  mx-auto bg-white rounded-md">
          {/* first */}
          <div className="flex flex-col justify-center items-center">
            <p class="text-xl mt-3 font-semibold">อาการคนไข้</p>
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
                <b>ชื่อ-สกุล :</b> {username} <b>เพศ :</b> {sex}{" "}
                {/* <b>วัน/เดือน/ปีเกิด :</b> {displayThaiDate(dateofbirth)} */}
              </p>
            </div>
            {/* <div
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
            </div> */}
            {/* <div
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
                <b>เบอร์โทร :</b> {phone} <b>E-mail :</b> {email}
              </p>
            </div> */}
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
                <b>ข้อมูลทำนัด ณ</b> {displayThaiDate(date)} <b>เวลา</b> {time}
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
              <p className=" text-gray-500 ml-4">
                <b>แพทย์ที่พบ :</b> {doctorname}
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
              <p className=" text-gray-500 ml-4">
                <b>อาการเบื้องต้น:</b> {symtoms}
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
              <p className=" text-gray-500 ml-4">
                <b>ช่องทางการ Video Call :</b>{" "}
                <a href={meetinglink} target="_blank">
                  {meetinglink}
                </a>
              </p>
            </div>

            {/* <div
              className="
          flex
          justify-between
          items-center
          w-full
          py-3
          border-b-2 border-gray-200
        "
            >
              <p className=" text-gray-500 ml-4">
                <b>สถานะการทำนัด:</b> {status}
              </p>
            </div> */}
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
              <p className=" text-black ml-4 font-bold">คำแนะนำจากแพทย์ <h className="text-red-600"> * </h></p>
            </div>
            <textarea
              onChange={handleDescription}
              className="form-control Detail"
              placeholder="กรุณากรอกอาการคนไข้..."
              rows="5"
              cols="50"
            ></textarea>
          </div>
          <br />
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
            <p className=" text-black ml-4 font-bold">จ่ายยา: </p>
          </div>
          <div className=" m-2 text-center">
            <div className="p-2">
              <div className=" inline-flex items-center bg-white  text-black rounded-full p-2 ">
                <span className="postpone-text inline-flex bg-indigo-300 text-white rounded-full h-6 px-3 justify-center items-center">
                  กรุณาเลือกยาที่ต้องการ :
                </span>

                <select
                  required={require}
                  id="position"
                  name="Position"
                  className="inline-flex  px-3 "
                  onChange={handleMedicine}
                >
                  <option disabled selected value>
                    {" "}
                    โปรดเลือกยา
                  </option>
                  {medicine.map((medicine) => (
                    <option
                      className="option"
                      value={JSON.stringify({ medicine })}
                    >
                      {medicine.MedicineName}{" "}
                    </option>
                  ))}
                </select>
                <SearchIcon
                  width="1.5rem"
                  hieght="1.5rem"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
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
                    {choosemedicine.map((medicine, i) => (
                      <tr key={medicine.MedicineName}>
                        <td>
                          <p className="mb-2 ">{medicine.MedicineName}</p>
                        </td>
                        <td className="text-center">
                          <span className="text-sm lg:text-base font-medium">
                            {medicine.Price}
                          </span>
                        </td>
                        <td className="justify-center  md:flex">
                          <div className="w-20 h-10">
                            <div className="relative flex flex-row w-full h-8">
                              <button
                                onClick={() => delmed(medicine.MedicineID, i)}
                                ƒ
                                value={medicine.MedicineID}
                              >
                                -
                              </button>
                              <input
                                // type="number"
                                disabled
                                value={medicine.quantity}
                                className="w-full rounded-md font-semibold text-center h-8 text-gray-700 bg-gray-100 outline-none focus:outline-none hover:text-black focus:text-black"
                              />
                              <button
                                onClick={() => addmed(medicine.MedicineID, i)}
                                value={medicine.MedicineID}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span className="text-sm lg:text-base font-medium">
                          {medicine.Price * medicine.quantity} บาท
                          </span>
                        </td>

                        <td className="text-center">
                          <span
                            onClick={() =>
                              handleDeleteMedicine(medicine.MedicineID)
                            }
                            className="text-sm lg:text-base font-medium"
                          >
                            <Delete {...iconOption} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <p class="text-xl font-semibold text-indigo-400">รายการยา</p>
                <div className="flex justify-center my-6">
                  <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg rounded-md pin-r pin-y md:w-5/6 lg:w-5/6 ">
                    <div className="flex-1">
                      <table
                        className="w-full text-sm lg:text-base"
                        cellSpacing={0}
                      >
                        <thead>
                          <tr className="h-12 ">
                            <th className="hidden text-center md:table-cell">
                              ชื่อยา
                            </th>
                    
                            <th className="lg:text-center text-left pl-5 lg:pl-0">
                              <span className="hidden lg:inline">
                                ราคาต่อหน่วย
                              </span>
                            </th>
                            <th className="hidden text-center md:table-cell"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicine.map((medicine) => (
                            <tr key={medicine.MedicineName}>
                              <td className="text-left">
                                <p className="mb-2 ">{medicine.MedicineName}</p>
                              </td>
                              <td className="text-center">
                                <span className="text-sm lg:text-base font-medium">
                                  {medicine.Price}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <p class="text-xl font-semibold text-indigo-400">
                  รายการยาที่ได้เลือกไว้
                </p>
                <div className="flex justify-center my-6">
                  <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg rounded-md pin-r pin-y md:w-5/6 lg:w-5/6 ">
                    <div className="flex-1">
                      <table
                        className="w-full text-sm lg:text-base"
                        cellSpacing={0}
                      >
                        <thead>
                          <tr className="h-12 ">
                            <th className="hidden text-center md:table-cell">
                              ชื่อยา
                            </th>
                       
                            <th className="lg:text-center text-left pl-5 lg:pl-0">
                              <span className="hidden lg:inline">
                                ราคาต่อหน่วย
                              </span>
                            </th>
                            <th className="hidden text-center md:table-cell"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {medicine.map((medicine) => (
                            <tr key={medicine.MedicineName}>
                              <td className="text-left">
                                <p className="mb-2 ">{medicine.MedicineName}</p>
                              </td>
                              <td className="text-center">
                                <span className="text-sm lg:text-base font-medium">
                                  {medicine.Price}
                                </span>
                              </td>
                              <td className="text-center">
                                <span className="text-sm lg:text-base font-medium">
                                  <Delete {...iconOption} />
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

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
                      <th className="hidden text-center md:table-cell">
                        ราคา (บาท)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          onChange={handleOtherserviceDescription}
                          type="text"
                          placeholder="กรุณากรอกรายละเอียด"
                          className="w-full rounded-md font-semibold text-center h-10 text-gray-700 bg-gray-100 outline-none focus:outline-none hover:text-black focus:text-black"
                        />
                      </td>
                      <td className="justify-center  md:flex">
                        <div className="w-20 h-10">
                          <div className="relative flex flex-row w-full h-8">
                            <input
                              onChange={handleOtherServicePrice}
                              type="text"
                              defaultValue={0}
                              className="w-full rounded-md font-semibold h-10 text-center text-gray-700 bg-gray-100 outline-none focus:outline-none hover:text-black focus:text-black"
                            />
                          </div>
                        </div>
                      </td>
                      {/* <td className="text-center">
                        <span className="text-sm lg:text-base font-medium">
                          <Delete {...iconOption} />
                        </span>
                      </td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 ">
          {/* <Link
            to={{
              pathname: `/usersummary`,
              state: {
                appointmentid: appointmentID,
                userid: userID,
                description: description,
                otherservice: otherservice,
                medicine: choosemedicine,
                date: date,
                time: time,
                doctorname: doctorname,
                symtoms: symtoms,
                price: price,
                choosemedicine: choosemedicine,
                otherservice: otherservice,
                price: price,
              },
            }}
          > */}
          <Button
            onClick={handleToUserSummary}
            variant="primary"
            style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
          >
            ถัดไป
          </Button>
          {/* </Link>{" "} */}{" "}
          <Link to={{ pathname: `/workingdoctor`, state: { id: id } }}>
            <Button
              variant="secondary"
              style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
            >
              ย้อนกลับ
            </Button>
          </Link>{" "}
        </div>
      </div>
      {/* end */}
    </div>
  );
}

export default WorkingDetailDoctorScreen;
