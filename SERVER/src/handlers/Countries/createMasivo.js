const fs = require("fs/promises");
require("dotenv").config();
const { URL_BASE } = process.env;
const {
  pathMasivo,
  pathMasivoUsers,
  pathMasivoClients,
  pathMasivoHistories,
} = require("../../utils/utils.js");

const {
  Country,
  Destiny,
  User,
  Client,
  HistoryClient,
} = require("../../db.js");

const {
  createCountries,
} = require("../../controllers/Countries/createCountriesCtlr.js");

const createCountriesMasivo = async (req, res) => {
  let rutaUsers = "/opt/render/project/src/src/utils/users.json";
  let rutaCountries = "/opt/render/project/src/src/utils/data.json";
  let rutaClients = "/opt/render/project/src/src/utils/clientsRevisado.json";
  let rutaHistories = "/opt/render/project/src/src/utils/Histories.json";

  try {
    if (URL_BASE === "http://localhost:3001") {
      rutaUsers = pathMasivoUsers();
      rutaCountries = pathMasivo();
      rutaClients = pathMasivoClients();
      rutaHistories = pathMasivoHistories();
    }

    //USERS
    const responseUsers = await fs.readFile(rutaUsers);
    const datausers = JSON.parse(responseUsers);

    const newUsers = await User.bulkCreate(datausers);
    console.log("Users OK");

    //COUNTRIES
    const response = await fs.readFile(rutaCountries);
    const data = JSON.parse(response);

    data.forEach(async (pais) => {
      const { name, image, description, experiences, continent, destinies } =
        pais;

      const newCreatepais = await createCountries(
        name,
        image,
        description,
        experiences,
        continent,
        destinies
      );
    });

    const countries = await Country.findAll();

    //CLIENTS
    const responseClients = await fs.readFile(rutaClients);
    const dataClients = JSON.parse(responseClients);

    const newClients = await Client.bulkCreate(dataClients);
    console.log("newClients");

    //HISTORIES
    const responseHistories = await fs.readFile(rutaHistories);

    const dataHistories = JSON.parse(responseHistories);

    const newHistories = await HistoryClient.bulkCreate(dataHistories);

    res.status(201).json(newClients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createCountriesMasivo;
