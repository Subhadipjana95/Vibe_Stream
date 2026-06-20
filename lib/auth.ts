import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "./db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email) throw new Error("Email required")
                if (!credentials?.password) throw new Error("Password required")

                try {
                    await connectDB();
                    const user = await UserModel.findOne({ email: credentials.email })
                    if (!user) throw new Error("User not found")

                    const isValid = await bcrypt.compare(credentials.password, user.password)
                    if (!isValid) throw new Error("Incorrect password")

                    return {
                        id: user._id.toString(),
                        email: user.email
                    }
                } catch (error) {
                    throw error
                }
            }
        }),
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session, token}) {
            if(session){
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30*24*60*60, // 30 Days
        updateAge: 24*60*60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET
}