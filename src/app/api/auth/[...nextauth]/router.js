import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: 'Ov23liqG6sv3sbwV5MoO',
      clientSecret:'560bd4f6ec2c4a2e37397ce1bfc8d53c499d3e19',
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)