import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import styles from "./Footer.module.css";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/htirawi"
        rel="noopener noreferrer"
        target="_blank"
      >
        Hussein Tirawi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Footer = () => (
  <footer className={styles.footer}>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </footer>
);

export default Footer;
