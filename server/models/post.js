const post = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: DataTypes.STRING,
    text: DataTypes.STRING
  });

  Post.associate = models => {
    Post.hasMany(models.Comment);
  };

  return Post;
};
export default post;
