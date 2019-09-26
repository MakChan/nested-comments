const createUsersWithPostsAndComments = async models => {
  await models.User.create(
    {
      username: "mayank",
      name: "Mayank",
      password: "admin123",
      posts: [
        {
          title: "First Post",
          text: "First Post Text"
        }
      ]
    },
    {
      include: [models.Post]
    }
  );
  await models.User.create({
    username: "mak",
    name: "Mak",
    password: "admin123"
  });
  await models.Post.create(
    {
      title: "Second Post",
      text: "Second Post Text",
      userId: 1,
      comments: [
        {
          text: "First Comment",
          depth: 1,
          userId: 1
        },
        {
          text: "Second Comment",
          depth: 1,
          userId: 2
        }
      ]
    },
    {
      include: [models.Comment]
    }
  );
  await models.Comment.bulkCreate([
    {
      text: "First Nested Comment",
      postId: 2,
      userId: 2,
      parentId: 1,
      depth: 2
    },
    {
      text: "Second Nested Comment",
      postId: 2,
      userId: 2,
      parentId: 2,
      depth: 2
    },
    {
      text: "Third Nested Comment",
      postId: 2,
      userId: 1,
      parentId: 3,
      depth: 3
    }
  ]);
  
};

export { createUsersWithPostsAndComments };
