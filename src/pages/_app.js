import { RecoilRoot } from "recoil";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import userAuth from "@/utils/userAuth";

import Layout from "../client/components/Layout/Layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { getCookie } = userAuth();
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");
      setIsCookie(token);
    }
  }, [router.pathname]);

  if (!isCookie && router.pathname !== "/login") {
    return (
      <RecoilRoot>
        <Layout>
          <Box sx={{ width: "100%" }}>
            <Typography mb={2} variant="h1" component="h2">
              Please Login...
            </Typography>
            <CircularProgress />
          </Box>
        </Layout>
      </RecoilRoot>
    );
  }

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
