import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetNotes(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNotes() {
        try{
            const res = await axios.get(url, {
            withCredentials: true,
        });
        setData(res.data.notes);
        }
        catch(err){
            setError(err);
        }
        finally{
            setLoading(false);
        }
    }
    getNotes();
  }, [url]);
    return{data, error, loading}
}
