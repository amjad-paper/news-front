import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { useQuery } from "react-query";
import { CircularIndeterminate } from "../CircularIndeterminate/CircularIndeterminate";
import { ICategor } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FormControl, Select } from "@mui/material";
import { languages } from "@/constants";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";

export function SearchAppBar() {
  const [open, setOpen] = React.useState(false);
  const { push, query, asPath, locale } = useRouter();
  const {
    isLoading,
    data: categories,
    refetch,
  } = useQuery<ICategor[]>(
    "categories",
    async () => {
      const res = await fetch(process.env.apiUrl + "/categories?language=" + locale);
      return res?.json();
    },
    {
      enabled: !!locale,
      staleTime: 0,
    }
  );
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [valueSelect, setValueSelect] = useState<string>(locale ?? "en");

  const changeLanguage = async (language: string) => {
    setValueSelect(language ?? "");
    i18n?.changeLanguage(language);
    push({ query }, asPath, { locale: language });
  };

  const handleButtonClick = (categoryId: number) => {
    router.push("/?category=" + categoryId);
    setOpen(false);
  };

  useEffect(() => {
    if (locale) refetch();
  }, [locale]);

  useEffect(() => {
    handleButtonClick(categories?.length ? categories[0]?.id : 1);
  }, [categories]);

  const title = useMemo(() => t("title"), [t]);

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", top: "0px" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpen(!open)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => handleButtonClick(categories?.length ? categories[0]?.id : 1)}
            className="select-none"
          >
            {title}
          </Typography>
          {categories?.length && (
            <div className="hidden sm:flex overflow-x-auto ">
              {categories?.map((item) => (
                <h4
                  onClick={() => handleButtonClick(item.id)}
                  key={item?.index + "sdkhaksoakm,m,m,m,,"}
                  className="cursor-pointer ml-3"
                >
                  {item?.title}
                </h4>
              ))}
            </div>
          )}
          {!asPath?.includes("detail") && (
            <FormControl sx={{ m: 1 }} size="small">
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={valueSelect}
                onChange={(e) => changeLanguage(e.target.value ?? "")}
                label=""
                sx={{ paddingBottom: "0px", color: "white" }}
              >
                {languages?.map((item) => (
                  <MenuItem key={item.label} value={item.value} className="select-none">
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Toolbar>
      </AppBar>
      {categories?.length && open && (
        <div
          className={` bg-[#1976d2] text-white ${
            open ? "block" : "hidden"
          }absolute top-15 min-h-[200px] h-full w-full z-50 px-20 py-10`}
        >
          {categories?.map((item) => (
            <h4 onClick={() => handleButtonClick(item.id)} className="cursor-pointer" key={item.id + "jhdahgd"}>
              {item?.title}
            </h4>
          ))}
        </div>
      )}
    </Box>
  );
}
