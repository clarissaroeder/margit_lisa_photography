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

/**
 * GET /api/portfolio/collections/:collectionID
 * Fetches all images within a specific collection (folder) from Cloudinary.
 */
export async function GET(
  req: Request,
  { params }: { params: { collection: string } }
) {
  const collection = (await params).collection;

  if (!collection) {
    return NextResponse.json(
      { error: 'Collection ID is required.' },
      { status: 400 }
    );
  }

  try {
    const { resources } = await cloudinary.search
    .expression(`folder:${collection}/*`)
    .execute();

    if (resources.length === 0) {
      return NextResponse.json(
        { error: 'No images found in this collection.' },
        { status: 404 }
      );
    }

    const images = resources.map((resource: CloudinaryResource) => ({
      public_id: resource.public_id,
      secure_url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
    }));

    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images from Cloudinary.' },
      { status: 500 }
    );
  }
}
