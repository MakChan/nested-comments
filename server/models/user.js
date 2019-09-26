import bcrypt from "bcryptjs";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      name: DataTypes.STRING,
      password: {
        type: DataTypes.STRING
      }
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] }
      }
    }
  );

  User.associate = models => {
    User.hasMany(models.Post);
    User.hasMany(models.Comment);
  };

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: { username: login }
    });
    return user;
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
export default user;
