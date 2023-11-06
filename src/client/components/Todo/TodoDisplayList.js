// ** Third Party Imports

import { useRecoilValue } from "recoil";
import { todoListAtom } from "@/recoil/atoms/todoAtom";

import { Table, TableBody } from "@mui/material";

import Todo from "./Todo";

const TodoDisplayList = () => {
  const todosArr = useRecoilValue(todoListAtom);

  return (
    <Table sx={{ marginTop: "10px" }}>
      <TableBody>
        {todosArr.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            completed={todo.completed}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default TodoDisplayList;
