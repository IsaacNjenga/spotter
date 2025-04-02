import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Swal from "sweetalert2";
import axios from "axios";

function UseAllShippingLogs() {
  const { user } = useContext(UserContext);
  const [shippingLogs, setShippingLogs] = useState([]);
  const [shippingsLoading, setShippingsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const id = user;

  useEffect(() => {
    const fetchLog = async () => {
        setShippingsLoading(true);
      if (!id) {
        console.warn("No user ID found, skipping request.");
        return;
      }

      try {
        const res = await axios.get(`/get-all-shipping-logs?id=${id}`);
        if (res.data.success) {
          setShippingLogs(res.data.shippingLogs);
        }
      } catch (error) {
        console.log(error);
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "An Unexpected error occured. Please try again later";
        Swal.fire({ icon: "warning", title: "Error", text: errorMessage });
      } finally {
        setShippingsLoading(false);
      }
    };
    fetchLog();
  }, [id, refreshKey]);

  return {
    shippingLogs,
    shippingsLoading,
    refreshKey: () => setRefreshKey((prev) => prev + 1),
  };
}

export default UseAllShippingLogs;
