import "./App.css";
import { TopBar } from "./components";
import {
  HomeScreenStaff,
  HomeScreenDoctor,
  AppointmentScreen,
  ScheduleScreen,
  AddOfficerScreen,
  EditOfficerScreen,
  WorkingScreen,
  WorkingDetailScreen,
  MedicineScreen,
  SummaryTreatmentScreen,
  OfficerListScreen,
  CalendarScreen,
  PostponeScreen,
  SummaryPostponeScreen,
  ConfirmCancelScreen,
  UserScreen,
  UserDetailScreen,
  UserSummaryScreen,
  ConfirmAddOfficer,
  GiveMedicineScreen,
  HomeScreenAdmin,
  ManageMedicineScreen,
  WorkingDetailDoctorScreen,
  ConfirmEditOfficerScreen,
  ProfileScreen,
  SelectWorkingScreen,
  WorkingDoctorScreen,
  SelectUserScreen,
  ConfirmUserSummaryScreen,
  PushSummaryScreen,
  PushVDO,
  WorkingDetailSummaryScreen,
  SummaryDoctorScreen,
  UserHistoryScreen,
  UserHistoryDetailScreen
} from "./screens";
import { Switch, Route, HashRouter, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth";
import LogIn from "./screens/LoginScreen/index";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <TopBar />
          <div className="content">
            {/* Screen Routing */}
            <Switch>
              <Route exact path="/" component={LogIn} />
              <Route path="/working">
                <WorkingScreen />
              </Route>
              <Route path="/workingdetail">
                <WorkingDetailScreen />
              </Route>
              <Route path="/medicine">
                <MedicineScreen />
              </Route>
              <Route path="/summarytreatment">
                <SummaryTreatmentScreen />
              </Route>
              <Route path="/officerlistscreen">
                <OfficerListScreen />
              </Route>
              <Route path="/addofficer">
                <AddOfficerScreen />
              </Route>
              <Route path="/editofficer">
                <EditOfficerScreen />
              </Route>
              <Route path="/appointment">
                <AppointmentScreen />
              </Route>
              <Route path="/schedule">
                <ScheduleScreen />
              </Route>
              <Route path="/homescreenstaff">
                <HomeScreenStaff />
              </Route>
              <Route path="/homescreendoctor">
                <HomeScreenDoctor />
              </Route>
              <Route path="/calendar">
                <CalendarScreen />
              </Route>
              <Route path="/postpone">
                <PostponeScreen />
              </Route>
              <Route path="/summarypostpone">
                <SummaryPostponeScreen />
              </Route>
              <Route path="/confirmcancel">
                <ConfirmCancelScreen />
              </Route>
              <Route path="/user">
                <UserScreen />
              </Route>
              <Route path="/userdetail">
                <UserDetailScreen />
              </Route>
              <Route path="/usersummary">
                <UserSummaryScreen />
              </Route>
              <Route path="/confirmaddofficer">
                <ConfirmAddOfficer />
              </Route>
              <Route path="/givemedicine">
                <GiveMedicineScreen />
              </Route>
              <Route path="/homescreenadmin">
                <HomeScreenAdmin />
              </Route>
              <Route path="/managemedicine">
                <ManageMedicineScreen />
              </Route>
              <Route path="/workingdetaildoctor">
                <WorkingDetailDoctorScreen />
              </Route>
              <Route path="/confirmeditofficer">
                <ConfirmEditOfficerScreen />
              </Route>
              <Route path="/profile">
                <ProfileScreen />
              </Route>
              <Route path="/selectworking">
                <SelectWorkingScreen />
              </Route>
              <Route path="/workingdoctor">
                <WorkingDoctorScreen />
              </Route>
              <Route path="/selectuser">
                <SelectUserScreen />
              </Route>
              <Route path="/confirmusersummary">
                <ConfirmUserSummaryScreen />
              </Route>
              <Route path="/pushsummary">
                <PushSummaryScreen />
              </Route>
              <Route path="/pushvdo">
                <PushVDO />
              </Route>
              <Route path="/workingdetailsummary">
                <WorkingDetailSummaryScreen />
              </Route>
              <Route path="/summarydoctor">
                <SummaryDoctorScreen />
              </Route>
              <Route path="/userhistory">
                <UserHistoryScreen/>
              </Route>
              <Route path="/userhistorydetail">
                <UserHistoryDetailScreen/>
              </Route>

              
              
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
