import { ImageList, ImageListItem, Typography } from "@mui/material";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getMarineLife } from "../../firebase/marine-life.firestore";

const MarineLife: NextPage<{ marineLifeData: any }> = ({ marineLifeData }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading marine life...</div>;
  }

  return (
    <>
      {/* <BackButton />
      <FavoriteButton /> */}
      <Typography component="h1">
        {marineLifeData.french_common_name}
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontStyle: "italic" }}
      >
        {marineLifeData.scientific_name}
      </Typography>
      <Link
        href={marineLifeData.wikipedia_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Wikipedia
      </Link>

      <ImageList cols={3} rowHeight={164}>
        {marineLifeData.photos.map((photo: any) => (
          <ImageListItem key={photo.id}>
            <Image
              loader={() => photo.medium_url}
              src="/loading-fish.webp" // not working ?
              layout="fill"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const marineLifeData = await getMarineLife(id!.toString());

  if (marineLifeData) {
    return { props: { marineLifeData } };
  } else {
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // get all life ids...
  return {
    paths: [],
    fallback: true,
  };
};

export default MarineLife;
