import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "react-instantsearch-hooks-web";

export default function CustomInfiniteHits(props: UseInfiniteHitsProps) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver>();
  const prevY = useRef(0);
  const { hits, isLastPage, showMore, showPrevious } = useInfiniteHits(props);

  const initObserverForInfinitScroll = () => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        const y = firstEntry.boundingClientRect.y;

        if (prevY.current > y) {
          showMore();
        }
        prevY.current = y;
      },
      { threshold: 0.5 }
    );

    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver!.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver!.unobserve(currentElement);
      }
    };
  };

  useEffect(() => {
    initObserverForInfinitScroll();
  }, [element]);

  return (
    <Fragment>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }}>
        {hits.map((hit: any) => (
          <Grid item xs={6} key={hit.id}>
            <Link href={`/marine-life/${hit.id}`}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={hit["photo.medium_url"]}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      component="div"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {hit.french_common_name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        fontStyle: "italic",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {hit.scientific_name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
        {/* Skeleton loading */}
        {!isLastPage && (
          <Fragment>
            <Grid item ref={setElement} xs={6}>
              <Card>
                <CardActionArea>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Typography component="div">
                      <Skeleton />
                    </Typography>
                    <Typography variant="caption">
                      <Skeleton />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardActionArea>
                  <Skeleton variant="rectangular" height={140} />
                  <CardContent>
                    <Typography component="div">
                      <Skeleton />
                    </Typography>
                    <Typography variant="caption">
                      <Skeleton />
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Fragment>
        )}
      </Grid>
      {isLastPage && (
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            display: "block",
            pt: "1rem",
          }}
        >
          No more sealife available...
        </Typography>
      )}
    </Fragment>
  );
}
