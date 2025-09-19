import { useCallback } from "react"
import { useState } from "react"

const API_URL = "http://10.0.2.2:5000/api";
export const useReport = (email) => { 
  const [issue, setIssue] = useState([]);

  const fetchIssue = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/report/email/${email}`);
      const data = await response.json();
      setIssue(data);
    } catch (error) {
      console.log(error);
    }
  }, [email]);

  return { issue, fetchIssue };  // ✅ return fetchIssue
};