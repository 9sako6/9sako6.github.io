export const ARCHIVE_PATH = (year: number) => `/archives/${year}`;

export const OG_IMAGE_PATH = ({ slug }: { slug: string }) =>
  `/og-images/${slug}.png`;
