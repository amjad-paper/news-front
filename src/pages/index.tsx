import { INews } from "@/types";
import { Grid, Typography } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery } from "react-query";
import { formatDistanceToNow } from "date-fns";
import { CircularIndeterminate } from "@/components/CircularIndeterminate/CircularIndeterminate";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const router = useRouter();
  const {
    isLoading,
    data: news,
    refetch,
  } = useQuery<INews[]>(
    "new-pages",
    async () => {
      const res = await fetch(
        process.env.apiUrl + `/new-pages?categories.id=${router.query?.category ?? 1}&language=${router?.locale}`
      );
      return res?.json();
    },
    {
      enabled: !!router.query?.category || !!router?.locale,
    }
  );

  const handleButtonClick = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    refetch();
  }, [router.query?.category, router?.locale, refetch]);

  const { t } = useTranslation();

  const noResultsMessage = useMemo(() => t("noResultsMessage"), [t]);

  return (
    <Grid
      className={`flex justify-center w-full ml-2 ${
        (news?.length ?? 0) < 3 ? "h-full" : (news?.length ?? 0) < 10 ? "lg:h-full" : ""
      }`}
    >
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <Grid
          container
          spacing={2}
          pt={10}
          justifyContent="space-around"
          px={3}
          className="max-w-[1200px] bg-white h-full"
        >
          {news?.length ? (
            news?.map((item, index) => {
              return (
                <Grid item md={4} sm={5} sx={{ display: "flex", justifyContent: "center" }} key={item?.id + index}>
                  {item?.isTsted && (
                    <div
                      className="w-full p-3 cursor-pointer"
                      onClick={() => handleButtonClick(`/detail?id=${item?.id}&news-world-${item?.country}`)}
                    >
                      <img
                        className="w-full h-[150px]"
                        src={
                          item?.coverImageLink
                            ? item?.coverImageLink
                            : item?.CoverImage?.url
                            ? item?.CoverImage?.url
                            : "/assets/images/coverImage.png"
                        }
                      />
                      <h1 className="capitalize text-[18px] font-medium text-black break-all">{item?.title}</h1>
                      <div className="mt-4 flex items-center">
                        <div className="capitalize h-[20px] w-[5px] bg-red-600"></div>{" "}
                        <span className="capitalize text-xs  ml-2">
                          {item?.country} {formatDistanceToNow(new Date(item?.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  )}
                </Grid>
              );
            })
          ) : (
            <Typography className="text-red-600 mt-40">{noResultsMessage}</Typography>
          )}
        </Grid>
      )}
    </Grid>
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
