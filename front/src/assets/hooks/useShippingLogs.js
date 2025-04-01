import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";
import axios from "axios";

function UseShippingLogs() {
  const { user } = useContext(UserContext);
  const [shippingLog, setShippingLog] = useState([]);
  const [shippingLoading, setShippingLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const id = user;

  useEffect(() => {
    const fetchLog = async () => {
      setShippingLoading(true);
      if (!id) {
        console.warn("No user ID found, skipping request.");
        return;
      }

      try {
        const res = await axios.get(`/get-shipping-log?id=${id}`);
        if (res.data.success) {
          setShippingLog(res.data.shippingLog);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An Unexpected error occured. Please try again later";
        Swal.fire({ icon: "warning", title: "Error", text: errorMessage });
      } finally {
        setShippingLoading(false);
      }
    };
    fetchLog();
  }, [id, refreshKey]);

  return {
    shippingLog,
    shippingLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseShippingLogs;
