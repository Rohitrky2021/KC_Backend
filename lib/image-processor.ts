import sharp from "sharp";

export async function downloadImage(url: string): Promise<number> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();

    const metadata = await sharp(Buffer.from(buffer)).metadata();

    const height = metadata.height || 0;
    const width = metadata.width || 0;
    const perimeter = 2 * (height + width);

    return perimeter;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}
