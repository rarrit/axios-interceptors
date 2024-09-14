import { useEffect, useState } from "react";
import TODO_API from "./instance/baseInstacne";

const App = () => {
  const [todo, setTodo] = useState({
    title: "",
  });

  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await TODO_API.get("/todos");
    setTodos(data); 
  };

  const onSubmitHandler = (todo) => {
    TODO_API.post("/todos", todo);
  };

	// 새롭게 추가한 삭제 버튼 이벤트 핸들러 
  const onClickDeleteButtonHandler = (todoId) => {
    TODO_API.delete(`/todos/${todoId}`);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            {todo.title}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;