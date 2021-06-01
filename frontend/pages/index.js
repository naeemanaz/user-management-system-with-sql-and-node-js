import { useEffect, useState } from "react";
import axios from "axios";
import Hedder from "../component/Hedder";
import Table from "../component/Table";
export default function Home() {
  const [showElament, setshowElament] = useState("Home");
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/user").then((response) => {
      setUser(response.data);

    });
  }, []);
  return (
    <div>
      <Hedder setState={setshowElament} state={showElament} />
      <Table
        setState={setshowElament}
        state={showElament}
        user={user}
        setUser={setUser}
      />
    </div>
  );
}
