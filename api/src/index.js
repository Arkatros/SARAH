const express = require("express");

const PORT = 3000;
const HOST = "127.0.0.1";

const app = express();





app.listen(PORT, HOST, () => {
    console.log(`Escuchando en http://${HOST}:${PORT}`);
});
