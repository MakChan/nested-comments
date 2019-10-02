const post = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  });

  Post.associate = models => {
    Post.hasMany(models.Comment);
    Post.belongsTo(models.User);
  };

  return Post;
};
export default post;
