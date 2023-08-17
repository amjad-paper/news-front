import { INews } from "@/types";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { formatDistanceToNow } from "date-fns";
import { CircularIndeterminate } from "@/components/CircularIndeterminate/CircularIndeterminate";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function Datail() {
  const { query } = useRouter();
  const { isLoading, data: news } = useQuery<INews>(
    "Datail",
    async () => {
      const res = await fetch(process.env.apiUrl + "/new-pages/" + query?.id);
      return res?.json();
    },
    {
      enabled: !!query?.id,
      refetchOnMount: "always",
    }
  );
  const { t } = useTranslation();

  const noResultsMessage = useMemo(() => t("noResultsMessage"), [t]);
  return (
    <Grid className="flex justify-center w-full mx-5 ml-2">
      {isLoading ? (
        <CircularIndeterminate />
      ) : (
        <Grid container spacing={2} className="flex justify-center max-w-[1200px] px-4 bg-white h-full" pt={10}>
          {news?.id && news?.isTsted ? (
            <div>
              <h1 className="capitalize text-xl lg:text-[24px] font-medium text-black mt-4 lg:mt-10">{news?.title}</h1>
              <div className="flex items-center mb-4 lg:pb-4 mt-2 lg:mt-5">
                <div className="capitalize h-[20px] w-[5px] bg-red-600"></div>{" "}
                <span className="capitalize text-xs ml-2">
                  {news?.country} {formatDistanceToNow(new Date(news?.created_at), { addSuffix: true })}
                </span>
              </div>
              <div>
                {news?.containers?.map((des, index) => (
                  <div key={index + news?.id} dangerouslySetInnerHTML={{ __html: des?.description }} />
                ))}
              </div>
            </div>
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
