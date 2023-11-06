import userAuth from "../utils/userAuth";
import { useState, useEffect } from "react";

const UserTodoServices = () => {
  const { getCookieByName } = userAuth();
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getCookieByName("token");
      setIsCookie(token);
    }
  }, [getCookieByName]);

  const getTodoService = async (token = null) => {
    try {
      const res = await fetch("http://localhost:4000/todos", {
        headers: {
          Authorization: "Basic " + (token || isCookie),
          "Content-Type": "application/json",
        },
      });

      return res.json();
    } catch (e) {
      throw e;
    }
  };

  const postTodoService = async (todo) => {
    const { task } = todo;
    try {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: {
          Authorization: "Basic " + isCookie,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
        }),
      });

      return res.json();
    } catch (e) {
      throw e;
    }
  };

  const putTodoService = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: "Basic " + isCookie,
          "Content-Type": "application/json",
        },
      });

      return res.json();
    } catch (e) {
      throw e;
    }
  };

  const deleteTodoService = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Basic " + isCookie,
          "Content-Type": "application/json",
        },
      });

      return res.json();
    } catch (e) {
      throw e;
    }
  };

  return {
    getTodoService,
    postTodoService,
    putTodoService,
    deleteTodoService,
  };
};

export default UserTodoServices;
