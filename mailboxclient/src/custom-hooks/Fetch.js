// custom-hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, type = "get", params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      //   debugger;
      setLoading(true);
      let response;
      if (type.toLowerCase() === "post") {
        response = await axios.post(url, params);
        console.log(response);
      } else if (type.toLowerCase() === "get") {
        response = await axios.get(url, { params });
      }
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, type, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;
