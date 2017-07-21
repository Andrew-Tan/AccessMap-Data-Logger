module.exports = (sequelize, DataTypes) => {
  return sequelize.define('log_data', {
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });
};
