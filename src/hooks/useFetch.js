import { useState, useEffect, useCallback } from "react";
import axios from '../utils/axios';

function useFetch(query, page, url) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const [dataList, setDataList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.put(url, {});
      await setList((prev) => [
        ...new Set([...prev, ...res.data.records.map((d) => d.id)])
      ]);
      await setDataList((prev) => [
        ...[...prev, ...res.data.records]
      ]);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list, dataList };
}

export default useFetch;
