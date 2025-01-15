import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { CloudinaryResource, ImageData } from '@/types';

export async function GET() {
  console.time('API Route Total Time');
  try {
    const tag = 'slideshow';

    console.time('Cloudinary Search Time');
    const result = await cloudinary.api.resources_by_tag(tag);
    console.timeEnd('Cloudinary Search Time');

    const resources: CloudinaryResource[] = result.resources;

    if (!resources || resources.length === 0) {
      console.timeEnd('API Route Total Time');
      return NextResponse.json(
        { error: 'No slideshow images found.' },
        { status: 404 }
      );
    }

    const images: ImageData[] = resources.map(resource => ({
      public_id: resource.public_id,
      src: cloudinary.url(resource.secure_url, {
        fetch_format: 'auto',
        quality: 'auto',
      }),
      width: resource.width,
      height: resource.height,
      format: resource.format,
      alt: resource.display_name,
      title: resource.display_name,
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