const axios = require("axios");
require("dotenv").config();

const getFormattedFields = (fields) => {
  let results = "";

  for (let i = 0; i < fields.length; i++) {
    if (i > 0) {
      results += "%2C" + fields[i];
    } else {
      results += fields[i];
    }
  }
  return results;
};

exports.getPlaceDetails = async (req, res) => {
  try {
    const placeId = req.params.placeId;

    const fields = getFormattedFields([
      "name",
      "rating",
      "formatted_address",
      "vicinity",
      //   "address_components",
    ]);

    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        // console.log(JSON.stringify(response.data));
        res.send(response.data.result);
      })
      .catch(function (error) {
        console.error(error);
        res.sendStatus(502);
      });

    // res.end();
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
