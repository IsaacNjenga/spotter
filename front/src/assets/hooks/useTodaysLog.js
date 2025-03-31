import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../../App";

function UseTodaysLog() {
  const { user } = useContext(UserContext);
  const [log, setLog] = useState([]);
  const [logLoading, setLogLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const id = user;

  useEffect(() => {
    const fetchLog = async () => {
      setLogLoading(true);
      if (!id) {
        console.warn("No user ID found, skipping request.");
        return;
      }

      try {
        const res = await axios.get(`get-log?id=${id}`);
        if (res.data.success) {
          setLog(res.data.log);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An Unexpected error occured. Please try again later";
        Swal.fire({ icon: "warning", title: "Error", text: errorMessage });
      } finally {
        setLogLoading(false);
      }
    };
    fetchLog();
  }, [id, refreshKey]);

  return {
    log,
    logLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseTodaysLog;
