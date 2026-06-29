import { useState, useEffect } from 'react';

function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, dependencies);

  return { data, isLoading, error };
}

export default useFetch;
