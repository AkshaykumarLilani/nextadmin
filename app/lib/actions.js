"use server"
import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectDb } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {

    const { username, email, phone, isAdmin, password, address, isActive } = Object.fromEntries(formData);

    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        connectDb();
        const newUser = new User({
            username,
            email,
            phone,
            isAdmin,
            password: hashedPassword,
            address,
            isActive
        });

        await newUser.save();
    } catch (err) {
        console.error(err);
        throw new Error();
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}

export const addProduct = async (formData) => {

    const { title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectDb();
        const newProduct = new Product({ title, desc, price, stock, color, size });
        await newProduct.save();
    } catch (err) {
        console.error(err);
        throw new Error();
    }

    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
}

export const deleteProduct = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectDb();
        await Product.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        throw new Error();
    }

    revalidatePath("/dashboard/products");
}

export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData);

    try {
        connectDb();
        await User.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
        throw new Error();
    }

    revalidatePath("/dashboard/users");
}

export const fetchProduct = async (id) => {

    try {
        connectDb();
        const product = await Product.findById(id);
        return product;
    } catch (err) {
        console.error(err);
        throw new Error();
    }
}

export const fetchUser = async (id) => {

    try {
        connectDb();
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.error(err);
        throw new Error();
    }
}

export const updateUser = async (formData) => {
    const { id, username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectDb();

        const updateUser = await User.findById(id);

        if (!updateUser) {
            throw new Error("Invalid Id");
        }

        const updatedData = {
            username,
            email,
            phone,
            address,
            isAdmin,
            isActive
        }

        console.log(updatedData);

        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 8);
            updatedData["password"] = hashedPassword;
        }

        await User.findByIdAndUpdate(id, updatedData);

    } catch (err) {
        console.error(err);
        throw new Error("");
    }

    redirect("/dashboard/users");
}

export const updateProduct = async (formData) => {
    const { id, title, desc, price, stock, color, size } = Object.fromEntries(formData);

    try {
        connectDb();

        const productToUpdate = await Product.findById(id);

        if (!productToUpdate) {
            throw new Error("Invalid Id");
        }

        const updatedData = {
            title, desc, price, stock, color, size
        }

        console.log(updatedData);

        await Product.findByIdAndUpdate(id, updatedData);

    } catch (err) {
        console.error(err);
        throw new Error("");
    }

    redirect("/dashboard/products")
}

export const authenticate = async (formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        const s = await signIn("credentials", { username, password });
        console.log(s);
        return true;
    } catch (err) {
        console.log(err);
        // throw err;
        // return {error: "Wrong Credentials"}
        return {error: "Wrong Credentials"}
    }
}