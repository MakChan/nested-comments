function requiresLogin(req, res, next) {
  if (!req.context.me) {
    const err = new Error("Not authorized");
    next(err);
  }
  return next();
}

function findWhere(array, key, value) {
  let t = 0;
  while (t < array.length && array[t][key] !== value) {
    t++;
  }

  if (t < array.length) {
    return array[t];
  } else {
    return false;
  }
}

function arrangeIntoTree(comments) {
  let tree = [];

  for (let i = 0; i < comments.length; i++) {
    let path = comments[i].path;
    let currentLevel = tree;
    for (let j = 0; j < path.length; j++) {
      let part = path[j];

      let existingPath = findWhere(currentLevel, "id", part);

      if (existingPath) {
        currentLevel = existingPath.children;
      } else {
        let newPart = {
          id: part,
          ...comments[i],
          children: []
        };

        currentLevel.push(newPart);
        currentLevel = newPart.children;
      }
    }
  }
  return tree;
}

export { requiresLogin, arrangeIntoTree };
