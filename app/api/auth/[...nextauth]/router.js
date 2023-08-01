import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import User from '@models/user';

import { connectToDB } from '@utils/database';

const prisma = new PrismaClient();

const handle = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {
    const sessionUser = await User.findOne({
      email: session.user.email,
    });

    session.user.id = sessionUser._id.toString();
    return session;
  },
  async signIn({ profile }) {
    try {
      await connectToDB();

      // check if a  user already exists
      const userExists = await User.findOne({
        email: profile.email,
      });
      // if not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.trim().toLowerCase(),
          image: profile.picture,
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
});

export { handle as GET, handle as POST };