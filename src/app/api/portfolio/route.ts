import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { CloudinaryResource, ImageData, TitleImageResult, CloudinaryFolder } from '@/types';

export async function GET() {
  console.time('API Route Total Time');
  try {
    // Step 1: Fetch all folders
    const result = await cloudinary.api.root_folders();
    const folders = result.folders;

    console.log('folders:', folders); // Debugging

    if (!folders || folders.length === 0) {
      console.timeEnd('API Route Total Time');
      return NextResponse.json(
        { error: 'No collections found.' },
        { status: 404 }
      );
    }

    // Step 2: For each folder, fetch the title image
    const titleImagePromises = folders.map(async (folder: CloudinaryFolder) => {
      const searchExpression = `folder:${folder.name} AND tags:title`;

      const searchResult = await cloudinary.search
        .expression(searchExpression)
        .max_results(1)
        .execute();

      const resources: CloudinaryResource[] = searchResult.resources;

      // No title image found
      if (!resources || resources.length === 0) {
        return null;
      }

      // Get the title image (the first and only image)
      const resource = resources[0];
      const image: ImageData = {
        public_id: resource.public_id,
        src: cloudinary.url(resource.secure_url, {
          fetch_format: 'auto',
          quality: 'auto',
        }),
        width: resource.width,
        height: resource.height,
        format: resource.format,
        alt: resource.display_name || `${folder.name} Title Image`,
        title: resource.display_name || `${folder.name} Title Image`,
      };

      return {
        name: folder.name,
        titleImage: image,
      };
    });

    // Await all promises
    const collectionResults: Array<TitleImageResult | null> = await Promise.all(titleImagePromises);

    // Filter out any null results (folders without a title image)
    const collections: TitleImageResult[] = collectionResults.filter(
      (result): result is TitleImageResult => result !== null
    );

    console.timeEnd('API Route Total Time');
    return NextResponse.json({ collections }, { status: 200 });
  } catch (error) {
    console.error('Error fetching title images:', error);
    console.timeEnd('API Route Total Time');
    return NextResponse.json(
      { error: 'Failed to fetch title images.' },
      { status: 500 }
    );
  }
}
