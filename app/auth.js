import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from "./authconfig"
import { connectDb } from "./lib/utils"
import { User } from "./lib/models"
import bcrypt from "bcrypt";

const login = async (credentials) => {
    try {
        connectDb();
        const user = await User.findOne({username: credentials.username});
        console.log({user});
        if (!user) throw new Error("Wrong Credentials");

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        console.log({isPasswordCorrect});
        if (!isPasswordCorrect) throw new Error("Wrong Credentials");
        
        return user;

    } catch (err) {
        console.error(err);
        throw new Error();
    }
}

export const {signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (err) {
                    console.error(err);
                    return null;
                }
            },
        }),
    ],
    callbacks:{
        async jwt({token, user}) {
            if (user) {
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        }
    }
})