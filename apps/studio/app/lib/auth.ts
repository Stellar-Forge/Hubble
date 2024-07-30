import prisma from "@repo/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { signinSchema } from "../../../../packages/zod-schema/userAuthSchema";

interface SigninParams {
  username: string,
  password: string
}

function inputValidation({username, password} : SigninParams ) {
  const res = signinSchema.safeParse({username, password})
  return res.success
}

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Username", type: "text", placeholder: "Username" },
            password: { label: "Password", type: "password", placeholder: "Password" }
          },
          // TODO: User credentials type from next-aut
          async authorize(credentials: any) {

            const res = inputValidation({
              username: credentials.username,
              password: credentials.password
            })
            
            if (!res) {
              return null
            }
            
            const existingUser = await prisma.user.findFirst({
                where: {
                    username: credentials.username
                }
            });

            if (existingUser) {
                console.log("Existing user")
                console.log(credentials.password)
                console.log(existingUser.password)
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    console.log("Pass valid")

                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.username,
                        email: existingUser.email
                    }
                }
                console.log("Pass Invalid")

                return null;
            }
            return null
          },
        }),
        
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
          })
        
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // TODO: fix the type here
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        },
        async redirect({ url, baseUrl }: {url: any, baseUrl: any}) {
            console.log(url)
            console.log(baseUrl)

            // Allows relative callback URLs
            // if (url.startsWith("/")) return `${baseUrl}${url}`
            // // Allows callback URLs on the same origin
            // else if (new URL(url).origin === baseUrl) return url
            return "http://localhost:3000/"
          }
    }
  }
 