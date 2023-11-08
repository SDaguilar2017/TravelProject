const getUsersLogicDeleteCtlr = require("../../controllers/users/getUsersLogicDeleteCtlr");

let getUsersLogigDelete = async (req, res) => {
  try {
    let allUsersDeleteLogic = await getUsersLogicDeleteCtlr();
    res.status(200).json(allUsersDeleteLogic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getUsersLogigDelete;
