import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

function UseLogs() {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const id = user;

  useEffect(() => {
    const fetchLogs = async () => {
      setLogsLoading(true);
      if (!id) {
        console.warn("No user ID found, skipping request.");
        return;
      }

      try {
        const res = await axios.get(`get-all-logs?id=${id}`);
        if (res.data.success) {
          setLogs(res.data.logs);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An Unexpected error occured. Please try again later";
        Swal.fire({ icon: "warning", title: "Error", text: errorMessage });
      } finally {
        setLogsLoading(false);
      }
    };
    fetchLogs();
  }, [id, refreshKey]);

  return {
    logs,
    logsLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseLogs;
