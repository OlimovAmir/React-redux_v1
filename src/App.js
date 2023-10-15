import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const addTodo = () => {
    if (text.trim().length > 0) {
      setTodos([
        ...todos,
        {
          id: new Date().toISOString(),
          text: text,
        }
      ]);
      setText('');
    }
  }

  const removeTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  const toggleTodoComplete = (todoId)=>{
    setTodos(
      todos.map(
        todo=>{
          if(todo.id !== todoId) return todo;
          return{
            ...todo,
            completed: !todo.completed,
          }
        }
      )
    )
  }

  return (
    <Container className='m-4'>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={text}
          onChange={handleInputChange}
        />
        <Button onClick={addTodo} variant="outline-secondary" id="button-addon2">
          Add Todo
        </Button>
      </InputGroup>
      <ul>
        {
          todos.map(todo => <li key={todo.id}>
            <div className="todo-item">
              <Form.Check className='m-2'
                checked={todo.completed}
                onChange={() => toggleTodoComplete(todo.id)}
              />
              <span>{todo.text}</span>
              <span className='ms-2'>
                <Button onClick={() => removeTodo(todo.id)} variant="danger">
                  <span >&times;</span>
                </Button>
              </span>
            </div>
          </li>)
        }
      </ul>
    </Container>
  );
}

export default App;