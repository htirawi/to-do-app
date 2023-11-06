import { Container } from "@mui/material";
import TodoForm from "./TodoForm";
import TodoDisplayList from "./TodoDisplayList";

const TodoMain = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        borderRadius: "6px",
      }}
    >
      <TodoForm />
      <TodoDisplayList />
    </Container>
  );
};

export default TodoMain;
