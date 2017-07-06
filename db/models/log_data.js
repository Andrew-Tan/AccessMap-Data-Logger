module.exports = (sequelize, DataTypes) => {
  return sequelize.define('log_data', {
    user_id: {
      type: DataTypes.INTEGER,
    },
    auth_provider: {
      type: DataTypes.STRING,
    },
    logged_content: {
      type: DataTypes.JSONB,
    },
  }, {
    freezeTableName: true, // Model tableName will be the same as the model name
  });
};
