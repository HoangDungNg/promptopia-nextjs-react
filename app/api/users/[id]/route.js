import { connectToDB } from '@utils/database';
import User from '@models/user';

export const GET = async (_req, { params }) => {
  try {
    await connectToDB();

    const profile = await User.findById(params.id);
    return new Response(JSON.stringify(profile), {
      status: 200,
    });
  } catch (err) {
    return new Response('Failed to fetch this profile', {
      status: 500,
    });
  }
};
