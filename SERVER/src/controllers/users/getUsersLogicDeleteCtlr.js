let { User } = require("../../db.js");
const { Op } = require("sequelize");

let getUsersLogicDeleteCtlr = async () => {
  let allUsersDelete = await User.findAll({
    where: {
      deletedAt: {
        [Op.ne]: null, // Op es el operador de Sequelize
      },
    },
    paranoid: false,
  });
  if (allUsersDelete.length === 0) {
    throw new Error("No hay ningún usuario Borrados en la base de datos!");
  }

  return allUsersDelete;
};

module.exports = getUsersLogicDeleteCtlr;
