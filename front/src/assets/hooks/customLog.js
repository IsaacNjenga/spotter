import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function UseCustomLog() {
  const [customLogs, setCustomLogs] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  const fetchLogs = async (date, id) => {
    if (!date || !id) {
      console.log("no date or id");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [date]: true }));

    try {
      const formattedDate =
        new Date(date).toISOString().split("T")[0] + "T00:00:00.000Z";

      console.log(formattedDate);
      const res = await axios.get(
        `get-custom-log?id=${id}&date=${formattedDate}`
      );

      if (res.data.success) {
        setCustomLogs((prev) => ({ ...prev, [date]: res.data.log }));
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "An error occurred while fetching logs.",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [date]: false }));
    }
  };

  return { customLogs, loadingStates, fetchLogs };
}

export default UseCustomLog;
