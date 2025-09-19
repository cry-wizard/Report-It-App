import { useCallback } from "react";

export const useFormattedDate = () => {
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    // Format: Month Day, Year (e.g., September 19, 2025)
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }, []);

  return { formatDate };
};
