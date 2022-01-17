import { useState, useEffect } from "react";
import SearchIcon from "../../icons/search-icon";
import { TableController } from "../../components";
import CloseIcon from "../../icons/close-icon";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Edit from "../../icons/edit";
import Delete from "../../icons/delete";
import { server } from "../../constants/constant";
import { Link } from "react-router-dom";
import { Modal, Pagination } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./ManageMedicineScreen.css";
import { regPhoneNumber } from "../../regex";
// import ReactPaginate from "react-paginate";

export default function ManageMedicineScreen() {
  const [medicine, setMedicine] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Type, setType] = useState("");

  const [state, setstate] = useState();
  const [MedicineID, setMedicineID] = useState("");
  const [ReMedicine, setReMedicine] = useState("");
  const [Redescription, setRedescription] = useState("");
  const [RePrice, setRePrice] = useState("");
  const [Retype, setRetype] = useState("");

  const [PostMedicine, setPostMedicine] = useState("");
  const [PostDescription, setPostDescription] = useState("");
  const [PostPrice, setPostPrice] = useState("");
  const [PostType, setPostType] = useState("");

  useEffect(() => {
    getMedicine();
  }, []);

  const getMedicine = () => {
    axios.get(server.MEDICINE).then((res) => {
      setMedicine(res.data);
    });
  };

  //------------------ เพิ่มยา ------------------//
  const handleName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const handlePrice = (e) => {
    const price = e.target.value;
    setPrice(price);
  };

  const handleType = (e) => {
    const type = e.target.value;
    setType(type);
  };

  const handleSubmit = async () => {
    try {
      const med = {
        Name: Name,
        Description: Description,
        Price: Price,
        Type: Type,
      };
      const data = Object.values(med).every((value) => value);
      if (data == false) {
        window.alert("โปรดกรอกข้อมูลให้ครบถ้วน");
      } else if (!regPhoneNumber.test(Price)) {
        window.alert("โปรดกรอกราคาเป็นตัวเลข");
      } else {
        await axios
          .post(server.MANAGE_MEDICINE, {
            MedicineName: Name,
            MedicineDescription: Description,
            Price: Price,
            Type: Type,
          })
          .then((res) => {
            console.log(res);
          });
        window.alert("เพื่มยาสำเร็จ");
        refreshPage();
      }
    } catch (error) {}
  };

  /// ---------- ลบยา ---------- ///
  const handleToConfirmDelete = (MedicineID) => {
    setstate({ MedicineID });
    handleShow();
  };

  const handleDelete = (MedicineID) => {
    try {
      axios.delete(server.MANAGE_MEDICINE, {
        data: { MedicineID: MedicineID },
      });
      handleClose();
      refreshPage();
    } catch (error) {
      console.log(error);
    }
  };

  const iconOption = { className: "icon-link", width: "1rem", height: "1rem" };

  //  Modal delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Modal add
  const [lgShow, setLgShow] = useState(false);
  // Modal Edit
  const [smShow, setSmShow] = useState(false);

  // refresh page
  function refreshPage() {
    window.location.reload();
  }

  const EditMedicine = (MedicineID) => {
    try {
      setSmShow(true);
      axios.get(`${server.MANAGE_MEDICINE}/${MedicineID}`).then((res) => {
        // console.log(res.data);
        const data = res.data;
        setReMedicine(data.MedicineName);
        setRedescription(data.MedicineDescription);
        setRePrice(data.Price);
        setRetype(data.Type);
        setMedicineID(MedicineID);
      });
    } catch (error) {
      return error;
    }
  };

  const handleNewName = (name) => {
    const data = name.target.value;
    setReMedicine(data);
  };

  const handleNewDescription = (description) => {
    const data = description.target.value;
    setRedescription(data);
  };

  const handleNewPrice = (price) => {
    const data = price.target.value;
    setRePrice(data);
  };

  const handleNewType = (type) => {
    const data = type.target.value;
    setRetype(data);
  };

  const handleEdit = () => {
    try {
      const med = {
        Name: ReMedicine,
        Description: Redescription,
        Price: RePrice,
        Type: RePrice,
      };
      const data = Object.values(med).every((value) => value);
      if (data == false) {
        window.alert("โปรดกรอกข้อมูลให้ครบถ้วน");
      } else if (!regPhoneNumber.test(RePrice)) {
        window.alert("โปรดกรอกราคาเป็นตัวเลข");
      } else {
        axios.put(server.MANAGE_MEDICINE, {
          MedicineID: MedicineID,
          Name: ReMedicine,
          Description: Redescription,
          Price: RePrice,
          Type: Retype,
        });
        window.alert("แก้ไขข้อมูลสำเร็จ");
        refreshPage();
      }
    } catch (error) {}
  };

  /// ---------- Filter ----------- ///
  const getSkincare = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const skincare = data.filter((data) => data.Type == "ผลิตภัณฑ์บำรุงผิว");
      setMedicine(skincare);
    });
  };

  const getCleanFace = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const cleanface = data.filter(
        (data) => data.Type == "ผลิตภัณฑ์ทำความสะอาดหน้า"
      );
      setMedicine(cleanface);
    });
  };

  const getHeal = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const heal = data.filter(
        (data) => data.Type == "ผลิตภัณฑ์แก้แพ้ ผื่นคัน"
      );
      setMedicine(heal);
    });
  };

  const getSupply = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const supply = data.filter((data) => data.Type == "ผลิตภัณฑ์เสริมอาหาร");
      setMedicine(supply);
    });
  };

  const getMedi = () => {
    axios.get(server.MEDICINE).then((res) => {
      const data = res.data;
      const medi = data.filter((data) => data.Type == "ยารักษาโรค");
      setMedicine(medi);
    });
  };

  return (
    <div className="content-body">
      <div className="medicine-content">
        <p className="text-xl mt-3 font-semibold">ผลิตภัณฑ์ทั้งหมด</p>
        <div className=" px-2 mt-3 ">
          <Button
            variant="primary"
            onClick={() => setLgShow(true)}
            style={{
              borderColor: "#818CF8",
              backgroundColor: "#818CF8",
              float: "right",
            }}
          >
            เพิ่มยา
          </Button>
          <Modal
            size="md"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                {" "}
                เพิ่มยา
              </Modal.Title>
            </Modal.Header>

            <center>
              <Modal.Body>
                <div className="divide-y divide-gray-200">
                  <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="flex flex-col">
                      <label className="leading-loose">ชื่อยา  <h className="text-red-600"> * </h>
                      </label>
                      <input
                        type="text"
                        className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="กรุณากรอกชื่อยา"
                        onChange={handleName}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="leading-loose">
                        คำอธิบายเกี่ยวกับยา  <h className="text-red-600"> * </h>
                      </label>
                      <textarea
                        type="text"
                        className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="กรุณากรอกคำอธิบาย"
                        onChange={handleDescription}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <label className="leading-loose">ราคา  <h className="text-red-600"> * </h>
                        </label>
                        <div className="relative focus-within:text-gray-600 text-gray-400">
                          <input
                            type="text"
                            className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            placeholder="กรอกราคา"
                            onChange={handlePrice}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose">ประเภท  <h className="text-red-600"> * </h> 
                        </label>
                        <div className="relative focus-within:text-gray-600 text-gray-400">
                          <select
                            type="text"
                            className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                            onChange={handleType}
                          >
                            <option disabled selected value>
                              กรุณาเลือกประเภท
                            </option>
                            <option
                              className="option"
                              value="ผลิตภัณฑ์บำรุงผิว"
                            >
                              {" "}
                              ผลิตภัณฑ์บำรุงผิว{" "}
                            </option>
                            <option
                              className="option"
                              value="ผลิตภัณฑ์ทำความสะอาดหน้า"
                            >
                              ผลิตภัณฑ์ทำความสะอาดหน้า
                            </option>
                            <option
                              className="option"
                              value="ผลิตภัณฑ์แก้แพ้ ผื่นคัน"
                            >
                              ผลิตภัณฑ์แก้แพ้ ผื่นคัน
                            </option>
                            <option
                              className="option"
                              value="ผลิตภัณฑ์เสริมอาหาร"
                            >
                              ผลิตภัณฑ์เสริมอาหาร
                            </option>
                            <option className="option" value="ยารักษาโรค">
                              ยารักษาโรค
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </center>
            <Modal.Footer>
              {/* <Link to="medicine"> */}
              <Button
                variant="primary"
                style={{ borderColor: "#818CF8", backgroundColor: "#818CF8" }}
                onClick={handleSubmit}
              >
                เพิ่มยา
              </Button>
              {/* </Link> */}
            </Modal.Footer>
          </Modal>
          {/* </Link> */}
        </div>
        <div class=" bg-indigo-300  w-full mt-4 main flex border rounded-full overflow-hidden  select-none">
          {/* <div class="title py-3 my-auto px-5 bg-indigo-300 text-white text-sm font-semibold mr-3">Gender</div> */}
          <label
            className=" ml-10 flex radio p-2 cursor-pointer"
            // onClick={getMedicine}
          >
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2  px-2 color-white">ยาและผลิตภัณฑ์</div>
          </label>

          <label
            className=" ml-10 flex radio p-2 cursor-pointer"
            onClick={getSkincare}
          >
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2  px-2 color-white">
              ผลิตภัณฑ์บำรุงผิว
            </div>
          </label>

          <label
            className="flex radio p-2 cursor-pointer"
            onClick={getCleanFace}
          >
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white ">
              ผลิตภัณฑ์ทำความสะอาดผิวหน้า
            </div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getHeal}>
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white">
              ผลิตภัณฑ์แก้แพ้ ผื่นคัน
            </div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getSupply}>
            <input
              className="my-auto transform scale-125"
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white">
              ผลิตภัณ์เสริมอาหาร
            </div>
          </label>

          <label className="flex radio p-2 cursor-pointer" onClick={getMedi}>
            <input
              className="my-auto transform scale-125 "
              type="radio"
              name="sfg"
            />
            <div className="title py-2 px-2 color-white">ยารักษาโรค</div>
          </label>
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}

        <div className="table-content-managemedicine">
          {/* header table */}
          <div className="table-grid-managemedicine  header">
            {/* <p></p> */}
            <p>ชื่อยา</p>
            <p>ราคา</p>
            <p>คำอธิบาย</p>
            <p>ประเภท</p>
            <p>แก้ไข/ลบข้อมูล</p>
          </div>
          {/* end header */}

          <div className="body-table-managemedicine">
            {/* body table */}
            {/* {rowData} */}
            <div>
              {/* {medicine} */}
              {medicine.map((med) => (
                <div className="table-grid-managemedicine content-managemedicine">
                  {/* <p> </p> */}
                  <p>{med.MedicineName}</p>
                  <p className="text-med"> {med.Price}</p>
                  <p>{med.MedicineDescription}</p>
                  <p className="text-med">{med.Type}</p>
                  <div className="menu-row">
                    <Edit
                      {...iconOption}
                      onClick={() => EditMedicine(med.MedicineID)}
                    />

                    <Modal
                      size="md"
                      show={smShow}
                      onHide={() => setSmShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          {" "}
                          แก้ไขยาและผลิตภัณฑ์
                        </Modal.Title>
                      </Modal.Header>

                      <center>
                        <Modal.Body>
                          <div className="divide-y divide-gray-200">
                            <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                              <div className="flex flex-col">
                                <label className="leading-loose">ชื่อยา</label>
                                <input
                                  type="text"
                                  className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                  placeholder={ReMedicine}
                                  value={ReMedicine}
                                  onChange={handleNewName}
                                />
                              </div>
                              <div className="flex flex-col">
                                <label className="leading-loose">
                                  คำอธิบายเกี่ยวกับยา
                                </label>
                                <textarea
                                  type="text"
                                  className="px-4 pl-10 py-4 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                  placeholder={Redescription}
                                  value={Redescription}
                                  onChange={handleNewDescription}
                                />
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="flex flex-col">
                                  <label className="leading-loose">ราคา</label>
                                  <div className="relative focus-within:text-gray-600 text-gray-400">
                                    <input
                                      type="text"
                                      className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                      placeholder={RePrice}
                                      value={RePrice}
                                      onChange={handleNewPrice}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <label className="leading-loose">
                                    ประเภท
                                  </label>
                                  <div className="relative focus-within:text-gray-600 text-gray-400">
                                    <select
                                      type="text"
                                      className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                      onChange={handleNewType}
                                    >
                                      <option disabled selected value>
                                        {Retype}
                                      </option>
                                      <option
                                        className="option"
                                        value="ผลิตภัณฑ์บำรุงผิว"
                                      >
                                        {" "}
                                        ผลิตภัณฑ์บำรุงผิว{" "}
                                      </option>
                                      <option
                                        className="option"
                                        value="ผลิตภัณฑ์ทำความสะอาดหน้า"
                                      >
                                        ผลิตภัณฑ์ทำความสะอาดหน้า
                                      </option>
                                      <option
                                        className="option"
                                        value="ผลิตภัณฑ์แก้แพ้ ผื่นคัน"
                                      >
                                        ผลิตภัณฑ์แก้แพ้ ผื่นคัน
                                      </option>
                                      <option
                                        className="option"
                                        value="ผลิตภัณฑ์เสริมอาหาร"
                                      >
                                        ผลิตภัณฑ์เสริมอาหาร
                                      </option>
                                      <option
                                        className="option"
                                        value="ยารักษาโรค"
                                      >
                                        ยารักษาโรค
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </center>
                      <Modal.Footer>
                        {/* <Link to="medicine"> */}
                        <Button
                          variant="primary"
                          style={{
                            borderColor: "#818CF8",
                            backgroundColor: "#818CF8",
                          }}
                          onClick={handleEdit}
                        >
                          ยืนยันการแก้ไข
                        </Button>
                        {/* </Link> */}
                      </Modal.Footer>
                    </Modal>
                    <Delete
                      {...iconOption}
                      onClick={() => handleToConfirmDelete(med.MedicineID)}
                    />
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>คำเตือน</Modal.Title>
                      </Modal.Header>

                      <center>
                        <Modal.Body>
                          คุณต้องการลบผลิตภัณฑ์ยานี้หรือไม่ ?
                        </Modal.Body>
                      </center>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={handleClose}
                          style={{
                            borderColor: "#bdbdbd",
                            backgroundColor: "#bdbdbd",
                          }}
                        >
                          ย้อนกลับ
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(state.MedicineID)}
                        >
                          ตกลง
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              ))}
            </div>
            {/* end body table */}
          </div>
        </div>

        <div className="px-2 mt-3 ">
          <Link to="/homescreenAdmin">
            <Button
              variant="secondary"
              style={{ borderColor: "#bdbdbd", backgroundColor: "#bdbdbd" }}
            >
              กลับสู่หน้าหลัก
            </Button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
