import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
});

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export async function GET() {
  console.time('API Route Total Time');
  try {
    const tag = 'slideshow';

    console.time('Cloudinary Search Time');
    const result = await cloudinary.search
    .expression(`tags:${tag}`)
    .sort_by('public_id', 'asc')
    .execute();
    console.timeEnd('Cloudinary Search Time');

    const resources = result.resources;

    if (!resources || resources.length === 0) {
      console.timeEnd('API Route Total Time');
      return NextResponse.json(
        { error: 'No slideshow images found.' },
        { status: 404 }
      );
    }

    const images = resources.map((resource: CloudinaryResource) => ({
      public_id: resource.public_id,
      secure_url: cloudinary.url(resource.secure_url, {
        fetch_format: 'auto',
        quality: 'auto',
      }),
      width: resource.width,
      height: resource.height,
      format: resource.format,
    }));

    console.timeEnd('API Route Total Time');
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error('Error fetching slideshow images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch slideshow images.' },
      { status: 500 }
    );
  }
}