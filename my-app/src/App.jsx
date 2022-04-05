import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Login from "./views/Login/Login";
import AddInvited from "./views/AddInvited/AddInvited";

function App() {
  const getInvitados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "invitados"));
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    } catch (e) {
      console.log("Error al traer los invitados", e);
    }
  };

  useEffect(() => {
    getInvitados();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/addinvited" element={<AddInvited />} />
      </Routes>
    </div>
  );
}

export default App;
