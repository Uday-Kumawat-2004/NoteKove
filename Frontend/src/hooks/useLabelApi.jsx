import { useEffect, useState, useCallback } from "react";
import { getLabels } from "../services/labelService";

export function useGetLabels() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLabels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getLabels();

      setData(
        res.data.labels ||
        res.data.data ||
        []
      );

    } catch (err) {

      setError(err);

    } finally {

      setLoading(false);

    }
  }, []);

  useEffect(() => {
    fetchLabels();
  }, [fetchLabels]);

  return {
    data,
    loading,
    error,
    refetch: fetchLabels,
  };
}