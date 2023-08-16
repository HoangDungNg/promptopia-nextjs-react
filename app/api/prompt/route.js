import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req) => {
  try {
    await connectToDB();
    const searchKeyword = req.nextUrl.searchParams.get('keyword');
    const searchType = req.nextUrl.searchParams.get('searchType');
    if (searchKeyword) {
      if (searchType === 'SEARCH_TAG') {
        const promptsFilteredByTag = await Prompt.find({
          tag: { $regex: searchKeyword, $options: 'i' },
        }).populate('creator');
        return new Response(JSON.stringify(promptsFilteredByTag), {
          status: 200,
        });
      } else {
        const promptsFilteredByKeyword = await Prompt.aggregate([
          {
            $lookup: {
              from: 'users',
              localField: 'creator',
              foreignField: '_id',
              as: 'creator',
            },
          },
          { $unwind: { path: '$creator' } },
          {
            $match: {
              $or: [
                {
                  'creator.username': { $regex: searchKeyword, $options: 'i' },
                },
                {
                  prompt: { $regex: searchKeyword, $options: 'i' },
                },
              ],
            },
          },
        ]);
        return new Response(JSON.stringify(promptsFilteredByKeyword), {
          status: 200,
        });
      }
    }
    const allPrompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(allPrompts), {
      status: 200,
    });
  } catch (err) {
    return new Response('Failed to fetch prompts', {
      status: 500,
    });
  }
};
