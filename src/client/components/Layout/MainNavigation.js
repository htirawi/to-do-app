import { useEffect, useState } from "react";

// routes
import Link from "next/link";
import { useRouter } from "next/router";

import userAuth from "@/utils/userAuth";

// styles
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { purple } from "@mui/material/colors";

import styles from "./MainNavigation.module.css";

// constants
import { LOGIN, DASHBOARD, LOGOUT, TODO } from "../../../constants";

const MainNavigation = () => {
  const { getCookie, deleteCookie } = userAuth();
  const [user, setUser] = useState({});
  const router = useRouter();

  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    // Perform localStorage action
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [router.pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookie("token");
      setIsCookie(token);
    }
  }, [router.pathname]);

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>{TODO}</div>
        </Link>
        <nav>
          <ul>
            {!isCookie && (
              <li>
                <Link href="/login">{LOGIN}</Link>
              </li>
            )}
            {isCookie && (
              <li>
                <Link href="/dashboard">{DASHBOARD}</Link>
              </li>
            )}
            {isCookie && (
              <Card
                sx={{
                  maxWidth: 345,
                  backgroundColor: "#38015c",
                  display: "flex",
                  alignSelf: "center",
                  border: "none",
                  boxShadow: "none",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={user.username}
                      src={user.avatar}
                      aria-label="avatar"
                      sx={{ bgcolor: purple[500] }}
                    ></Avatar>
                  }
                  className={styles.title}
                  title={`Welcome ${user.username}`}
                />
              </Card>
            )}

            {isCookie && (
              <li>
                <Button
                  variant="outline"
                  onClick={() => {
                    deleteCookie("token");
                    localStorage.clear();
                    router.push("/login");
                  }}
                >
                  {LOGOUT}
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainNavigation;
