import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const apiKey = process.env.GEOCODE_API_KEY;

const reverseGeocode = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    console.log("Received coordinates:", lat, lng);

    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude and Longitude are required" });
    }

    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lng}&key=${apiKey}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching geocode data:",
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: "Error fetching geocode data", details: error.message });
  }
};

export { reverseGeocode };
