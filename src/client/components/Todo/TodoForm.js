import { useState } from "react";

// recoil state
import { useRecoilState } from "recoil";
import { todoListAtom } from "../../../recoil/atoms/todoAtom";

// constants
import {
  KEEP_GOING,
  COMPLETED,
  CREATE_TODO_PLACEHOLDER,
  ADD_TODO,
} from "@/constants";

// styles
import { Container, TextField, Button, Stack, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import styles from "./TodoForm.module.css";

import UserTodoServices from "@/services/UserTodoServices";

const TodoForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { postTodoService, getTodoService } = UserTodoServices();
  const [todoListVals, setTodoListVals] = useRecoilState(todoListAtom);

  const completedTodos = todoListVals.filter((t) => t.completed === true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postTodoService({
      task: inputValue,
    });
    setInputValue("");

    const updatedListValues = await getTodoService();
    setTodoListVals([...updatedListValues]);
  };

  return (
    <div className={styles.todoContainer}>
      <Container maxWidth="sm">
        <Stack
          marginBottom="8px"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">{KEEP_GOING}</Typography>
          <p>
            {COMPLETED} {completedTodos.length} / {todoListVals.length}
          </p>
        </Stack>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack direction="row" spacing={1}>
            <TextField
              placeholder={CREATE_TODO_PLACEHOLDER}
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
              sx={{ width: "100%" }}
              size="small"
            />
            <Button
              sx={{ textTransform: "none", width: "30%" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<Add />}
            >
              {ADD_TODO}
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
};

export default TodoForm;
