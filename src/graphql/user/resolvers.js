import User from "../../models/user.model.js";
import { generateHash } from "../../utils/bcrypt.js";

const userResolvers = {
  Query: {
    user: async (parent, { id }) => {
      try {
        const user = await User.findByPk(id);
        return user;
      } catch (error) {
        throw new Error(`Failed to fetch user: ${error}`);
      }
    },

    users: async () => {
      try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        throw new Error(`Failed to fetch users: ${error}`);
      }
    },
  },

  Mutation: {
    createUser: async (root, { username, email, password }) => {
      try {
        const checkedUsername = await User.findOne({ where: { username } });
        if (checkedUsername) {
          throw new Error(`Username is already exist`);
        }
        const checkedEmail = await User.findOne({ where: { email } });
        if (checkedEmail) {
          throw new Error(`Email is already exist`);
        }

        const hashPassword = await generateHash(password);
        const user = await User.create({
          username,
          email,
          password: hashPassword,
        });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    updateUser: async (root, data) => {
      try {
        const user = await User.findByPk(data.id);
        if (!user) {
          throw new Error("User not found");
        }
        const checkedEmail = await User.findOne({
          where: { email: data.email },
        });
        if (checkedEmail) {
          throw new Error(`Email is already exist`);
        }
        user.set(data);
        await user.save();
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    deleteUser: async (root, { id }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        await user.destroy();
        return { message: "SUCCESS" };
        return;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

export default userResolvers;
