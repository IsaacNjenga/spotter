import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function UseLogs() {
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      setLogsLoading(true);
      try {
        const res = await axios.post("get-all-logs");
        if (res.data.success) {
          console.log("fetched");
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An Unexpected error occured. Please try again later";
        Swal.fire({ icon: "warning", title: "Error", text: errorMessage });
      } finally {
        setLogsLoading(true);
      }
    };
    fetchLogs();
  }, [refreshKey]);

  return {
    logs,
    logsLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseLogs;
