import { useState } from "react";
import { useRecoilState } from "recoil";
import { todoListAtom } from "@/recoil/atoms/todoAtom";

// constants
import { DELETE } from "@/constants";

import UserTodoServices from "@/services/UserTodoServices";

import { Delete } from "@mui/icons-material";
import { Button, Checkbox, Stack, TableCell, TableRow } from "@mui/material";

const Todo = (props) => {
  const { id, task, completed } = props;

  const { putTodoService, deleteTodoService, getTodoService } =
    UserTodoServices();

  const [, setTodoListVals] = useRecoilState(todoListAtom);
  const [isTodoCompleted, setIsTodoCompleted] = useState(completed);

  const handleDeleteSubmit = async (id) => {
    try {
      const res = await deleteTodoService(id);
    } catch (error) {
      throw new Error(error);
    }
    const updatedListValues = await getTodoService();
    setTodoListVals([...updatedListValues]);
  };

  const handleCompletedCheck = async (id) => {
    try {
      const res = await putTodoService(id);
      const updatedListValues = await getTodoService();
      setTodoListVals([...updatedListValues]);
      setIsTodoCompleted(res.completed);
    } catch (error) {
      throw new Error(error);
    }
  };

  const StrikethroughText = ({ children }) => {
    return (
      <span style={{ textDecoration: "line-through", letterSpacing: "2px" }}>
        {children}
      </span>
    );
  };

  return (
    <>
      <TableRow>
        <TableCell
          padding="none"
          width="100%"
          sx={{
            padding: "5px 10px ",
            marginBottom: "10px",
          }}
        >
          {isTodoCompleted ? (
            <StrikethroughText>{task}</StrikethroughText>
          ) : (
            task
          )}
        </TableCell>

        <TableCell padding="none">
          <Stack direction="row" spacing={1}>
            {/* edit todo */}
            <TableCell padding="none">
              <Checkbox
                checked={isTodoCompleted}
                onChange={() => handleCompletedCheck(id)}
              />
            </TableCell>

            {/* delete todo */}
            <Button
              startIcon={<Delete />}
              variant="contained"
              color="error"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={() => handleDeleteSubmit(id)}
            >
              {DELETE}
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Todo;
