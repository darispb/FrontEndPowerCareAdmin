import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddUserIcon from "../../icons/add-user";
import CalendarInlineIcon from "../../icons/calendar-inline";

const HomeScreenAdmin= () => {

  return (

    <div className="content-body">
    <div class="mt-10 text-center">
      <h1 class="text-4xl font-bold text-gray-800">PowerCare Clinic</h1>
      <p class="text-lg mt-3 font-semibold">สำหรับผู้ดูแลระบบ</p>
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
        <div className="home-screen bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-300 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-indigo-300  flex h-20  items-center justify-center">
         <AddUserIcon width="50%" height="50%" />
          </div>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
            บุคลากร
          </p>    
          <div className="flex justify-center px-5 mb-2 text-sm ">
          <Link to="/officerlistscreen">
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
        <div className="bg-white max-w-xs shadow-lg   mx-auto border-b-4 border-indigo-300 rounded-2xl overflow-hidden  hover:shadow-2xl transition duration-500 transform hover:scale-105 cursor-pointer">
          <div className="bg-indigo-300  flex h-20  items-center justify-center">
         <CalendarInlineIcon width="50%" height="50%" />
          </div>
          <p className="py-6 px-6 text-lg tracking-wide text-center">
          จัดการยา
          </p>
          {/* <hr > */}          
          <div className="flex justify-center px-5 mb-2 text-sm ">
          <Link to="/managemedicine">
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
export default HomeScreenAdmin;
