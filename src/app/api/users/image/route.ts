import { prismadb } from '@/libs/prismadb';
import serverAuth from '@/libs/serverAuth';

export async function PUT(request: Request) {
  try {
    const {
      currentUser: { id: userId },
    } = await serverAuth();

    const data: { image?: string } = await request.json();

    if (!data?.image || data.image.length === 0) {
      throw new Error('Invalid image');
    }

    const existingUserImage = await prismadb.userImage.findFirst();

    if (existingUserImage) {
      await prismadb.userImage.update({
        where: { id: existingUserImage.id },
        data: {
          image: data.image,
          userId,
        },
      });
      return new Response('userImageUpdated', {
        statusText: 'User image updated.',
      });
    }

    await prismadb.userImage.create({
      data: {
        image: data.image,
        userId,
      },
    });
    return new Response('userImageCreated', {
      statusText: 'User image created.',
    });
  } catch (error) {
    return new Response(`Something went wrong: ${error}`, {
      status: 500,
    });
  }
}
