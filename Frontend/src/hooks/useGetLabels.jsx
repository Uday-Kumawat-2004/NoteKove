import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetLabels(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLabels() {
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setData(res.data.labels);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (url) getLabels();
  }, [url]);
  return { data, error, loading };
}
