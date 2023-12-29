import { Product, User } from "./models";
import { connectDb } from "./utils";

export const ITEMS_PER_PAGE = 10;
export const fetchUsers = async (q, page) => {
    const regexp = new RegExp(q, "i");

    try {
        connectDb();
        const count = await User.find({ username: { $regex: regexp } }).count();
        const users = await User.find({ username: { $regex: regexp } })
            .limit(ITEMS_PER_PAGE)
            .skip(ITEMS_PER_PAGE * (page - 1));
        return { count, users };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch users");
    }
}

export const fetchProducts = async (q, page) => {
    const regexp = new RegExp(q, "i");
    try {
        connectDb();
        const count = await Product.find({ title: { $regex: regexp } }).count();
        const products = await Product.find({ title: { $regex: regexp } })
            .limit(ITEMS_PER_PAGE)
            .skip(ITEMS_PER_PAGE * (page - 1));
        return { count, products };
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch products");
    }
}