import { useEffect, useState } from "react";
import { searchNotes } from "../services/noteService";

export default function useSearchNotes(query) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  useEffect(() => {
    if (!query || query.trim() === "") {
      setData([]);
      setLoading(false);
      return;
    }


    async function fetchSearch() {
      try {
        setLoading(true);

        setError(null);

        const res = await searchNotes(
          query.trim()
        );


        setData(
          res.data.notes ||
          res.data.data ||
          []
        );

      } catch (err) {

        setError(err);

      } finally {

        setLoading(false);

      }
    }


    fetchSearch();

  }, [query]);


  return {
    data,
    loading,
    error,
  };
}