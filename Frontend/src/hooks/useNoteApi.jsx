import axios from "axios";
import { useEffect, useState } from "react";

export function useGetNotes(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNotes() {
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setData(res.data.notes);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getNotes();
  }, [url]);
  return { data, error, loading };
}

export function useUpdateNote(){
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function updateNote(noteId, updateFeilds){
        setLoading(true);
        setError(null);
        try{
            await axios.put(`http://localhost:4000/api/notes/${noteId}`, updateFeilds, {
                withCredentials: true,
            });
        }
        catch(err){
            setError(err);
        }
        finally{
            setLoading(false);
        }
    };
    return{updateNote, error, loading};
}
