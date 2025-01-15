import { NextResponse } from 'next/server';
import { ResourceApiResponse } from 'cloudinary';
import cloudinary from '@/lib/cloudinary';
import { CloudinaryResource, ImageData } from '@/types';

/**
 * GET /api/portfolio/collections/:collectionID
 * Fetches all images within a specific collection (folder) from Cloudinary.
 */
export async function GET(
  req: Request,
  { params }: { params: { collection: string } }
) {
  console.time('API Route Total Time');
  const { collection } = await params;

  if (!collection) {
    return NextResponse.json(
      { error: 'Collection ID is required.' },
      { status: 400 }
    );
  }

  try {
    console.time('Cloudinary Search Time');
    const result: ResourceApiResponse = await cloudinary.api.resources_by_asset_folder(collection);
    console.timeEnd('Cloudinary Search Time');

    const resources: CloudinaryResource[] = result.resources;

    if (!resources) {
      console.timeEnd('API Route Total Time');
      return NextResponse.json(
        { error: 'No images found in this collection.' },
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
      description: resource.display_name,
    }));

    console.timeEnd('API Route Total Time');
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary.' },
      { status: 500 }
    );
  }
}
