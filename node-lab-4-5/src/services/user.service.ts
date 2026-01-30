import User from "../models/users";
import { IUser } from "../types";
import APIError from "../utils/APIError";

class UserService {

    static async getAllUsers() {
        const users = await User.find({}, { password: 0 });
        return users;
    }

    static async createUser(user: IUser) {
        const { name, email, password, age } = user;
        console.log(name, email, password, age);
        const newUser = await User.create({ name, email, password, age });
        return newUser;
    }

    static async getUserById(id: string) {
        console.log("id", id);
        const user = await User.findOne({ _id: id }, { password: 0 });
        return user;
    }

    static async updateUser(id: string, user: IUser) {
        const { name, email, age } = user;
        const updatedUser = await User.findOneAndUpdate({ _id: id }, { name, email, age }, { new: true });
        return updatedUser;
    }

    static async deleteUser(id: string) {
        const deletedUser = await User.findOneAndDelete({ _id: id });
        return deletedUser;
    }

}

export default UserService;