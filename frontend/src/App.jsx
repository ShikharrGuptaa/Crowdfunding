import "./index.css";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import { Route, Routes } from "react-router-dom";
import EventList from "./components/Events/EventList";
import CreateEvent from "./components/Events/CreateEvent";
import EventDetail from "./components/Events/EventDetail";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<EventList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="create-event" element={<CreateEvent />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
    </Routes>
    </>
  );
}

export default App;
