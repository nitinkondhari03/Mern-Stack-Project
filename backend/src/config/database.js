const mongoose = require("mongoose");

const connetDatabase = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log(`monodb connet with server ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { connetDatabase };
