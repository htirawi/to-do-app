import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "../../../recoil/atoms/todoAtom";
import userAuth from "@/utils/userAuth";
import { useRouter } from "next/router";

// services
import UserTodoServices from "@/services/UserTodoServices";

// styles
import styles from "./UserList.module.css";
import {
  IconButton,
  FormControl,
  TextField,
  Avatar,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import CloseRounded from "@mui/icons-material/CloseRounded";

// constants
import { LOGIN, SELECT_USER, PASSWORD } from "../../../constants";

// custom hooks
import useAxios from "../../../hooks/useAxios";

const UsersList = () => {
  const router = useRouter();
  const [_, setTodoList] = useRecoilState(todoListAtom);

  const { setCookie } = userAuth();
  const [response, , loading, axiosFetch] = useAxios();

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState({
    username: "",
    password: "",
  });
  const [isPending, setIsPending] = useState(false);

  const action = useRef(null);
  const passwordRef = useRef(null);

  const { getTodoService } = UserTodoServices();

  const fetchUsers = async () => {
    await axiosFetch({
      method: "get",
      url: "http://localhost:4000/users",
    });
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUsers(response);
  }, [response]);

  if (loading) return <div>Loading...</div>;

  // user login function
  const login = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const avatar = users.find(
      (user) => user.username === selectedUser.username
    ).avatar;

    const selectedUserObj = {
      username: selectedUser.username,
      avatar,
    };
    const stringifiedObj = JSON.stringify(selectedUserObj);
    localStorage.setItem("userInfo", stringifiedObj);

    try {
      const token = btoa(`${selectedUser.username}:${selectedUser.password}`);
      setCookie("token", token, 1);
      const res = await getTodoService(token);
      if (res && res.length > 0) {
        setError(false);
        setTodoList(res);

        setIsPending(false);
        router.push("/dashboard");
      } else {
        setErrorMsg(res.message);
        setError(true);
      }
    } catch (e) {
      setError(true);
      throw e;
    }
  };

  const clickHandler = (type) => {
    setIsPending({ ...isPending, [type]: true });
    setTimeout(() => setIsPending({ ...isPending, [type]: false }), 2000);
  };

  return (
    <form onSubmit={login}>
      <FormControl fullWidth>
        <Select
          action={action}
          value={selectedUser.username}
          placeholder={SELECT_USER}
          required
          size="lg"
          id="selectUser"
          onChange={(e, newValue) =>
            setSelectedUser({ username: newValue, password: "" })
          }
          {...(selectedUser.username && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setSelectedUser({ username: "", password: "" });
                  action.current?.focusVisible();
                }}
              >
                <CloseRounded />
              </IconButton>
            ),
            indicator: null,
          })}
        >
          {users.map((user) => (
            <Option key={user.username} value={user.username} label={user.name}>
              <Avatar
                size="sm"
                alt={user.name}
                src={user.avatar}
                loading="lazy"
              />

              {user.name}
            </Option>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label={PASSWORD}
        inputRef={passwordRef}
        onChange={(e) => {
          setSelectedUser({
            ...selectedUser,
            password: e.target.value,
          });
        }}
        type="password"
        id="password"
      />
      {error && <Alert severity="error">{errorMsg}</Alert>}

      <Button
        type="submit"
        fullWidth
        mt="md"
        radius="md"
        className={styles.button}
        onClick={() => clickHandler("button")}
        endIcon={isPending.button ? <CircularProgress size={20} /> : null}
        sx={{ mt: 3, mb: 2 }}
      >
        {LOGIN}
      </Button>
    </form>
  );
};

export default UsersList;
