import { useEffect, useState, useCallback } from "react";

import {
  getNotes,
  updateNote as updateNoteService,
} from "../services/noteService";


export function useGetNotes(params = {}) {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);


  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const res = await getNotes(params);

      setData(
        res.data.notes ||
        res.data.data?.notes ||
        []
      );

    } catch (err) {

      setError(err);

    } finally {

      setLoading(false);

    }
  }, [params]);


  useEffect(() => {

    fetchNotes();

  }, [fetchNotes]);


  return {
    data,
    error,
    loading,
    refetch: fetchNotes,
  };
}


export function useUpdateNote() {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);


  async function updateNote(id, data) {
    try {
      setLoading(true);

      setError(null);


      const res = await updateNoteService(
        id,
        data
      );


      return (
        res.data.note ||
        res.data.data ||
        res.data
      );

    } catch (err) {

      setError(err);

      throw err;

    } finally {

      setLoading(false);

    }
  }


  return {
    updateNote,
    error,
    loading,
  };
}