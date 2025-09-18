import { useEffect, useState } from "react";

export default function useSearchNotes(query) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === "") {
      setData([]);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:4000/api/notes/search?q=${encodeURIComponent(query)}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [query]);

  return { data, loading, error };
}
