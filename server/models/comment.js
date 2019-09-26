const comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    text: DataTypes.STRING,
    depth: DataTypes.INTEGER
  });

  Comment.associate = models => {
    Comment.hasMany(models.Comment, { foreignKey: "parentId" });
  };

  return Comment;
};
export default comment;
