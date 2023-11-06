import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const axiosFetch = async (configObj) => {
    try {
      setLoading(true);
      setError("");
      setResponse([]);

      const { method, url, headers = null, body = null } = configObj;

      const res = await axios[method.toLowerCase()](url, body, headers);
      setResponse(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return [response, error, loading, axiosFetch];
};

export default useAxios;
