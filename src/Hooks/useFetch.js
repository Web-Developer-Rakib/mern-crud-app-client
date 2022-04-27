import { useEffect, useState } from "react";

const useFetch = (isReload) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [isReload]);
  return [users, setUsers];
};

export default useFetch;
