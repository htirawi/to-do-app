import styles from "./Login.module.css";

import { GET_STARTED } from "../../../constants";

import UsersList from "../Users/UsersList";

function LoginForm() {
  return (
    <section className={styles.login}>
      <h1>{GET_STARTED}</h1>
      <UsersList />
    </section>
  );
}

export default LoginForm;
