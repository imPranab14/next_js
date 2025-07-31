import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: 'Ov23liqG6sv3sbwV5MoO',
      clientSecret:'560bd4f6ec2c4a2e37397ce1bfc8d53c499d3e19',
    }),
  ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
