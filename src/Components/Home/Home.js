import React, { useState } from "react";
import useFetch from "../../Hooks/useFetch";
import CardBody from "../CardBody/CardBody";

const Home = () => {
  const [Reload, setReload] = useState(false);
  const [users] = useFetch(Reload);

  return (
    <div className="p-5">
      <h1 className="my-3 text-center">Total Users: {users.length}</h1>
      <div className="d-flex justify-content-center flex-wrap">
        {users.map((user) => (
          <CardBody
            user={user}
            Reload={Reload}
            setReload={setReload}
          ></CardBody>
        ))}
      </div>
    </div>
  );
};

export default Home;
