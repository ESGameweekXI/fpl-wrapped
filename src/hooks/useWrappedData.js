import { useState, useEffect } from "react";

/**
 * Fetches and returns the full WrappedData for a given teamId.
 *
 * @param {string|number} teamId
 * @returns {{ data: object|null, loading: boolean, error: string|null }}
 */
export default function useWrappedData(teamId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teamId) return;

    let cancelled = false;

    setLoading(true);
    setError(null);

    fetch(`/api/test/${teamId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load data (${res.status})`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [teamId]);

  return { data, loading, error };
}
