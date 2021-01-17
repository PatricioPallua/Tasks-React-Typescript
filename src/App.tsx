import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  title: string;
  content: string;
  done: boolean;
}

function App(): JSX.Element {

  const [newTitle, setNewTitle] = useState<string>("")
  const [newContent, setNewContent] = useState<string>("")
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(newTitle, newContent);
    setNewTitle("");
    setNewContent("");
    taskInput.current?.focus();
  }

  const addTask = (title: string, content: string): void => {
    const newTasks = [...tasks, {title, content, done: false}]
    setTasks(newTasks);
  }
 
  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  }

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3"> 
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <label className="col-12"> Titulo:
                  <input 
                    className="form-control" 
                    type="text" 
                    onChange={e => setNewTitle(e.target.value)} 
                    value={newTitle} 
                    ref={taskInput}
                    placeholder="Titulo de la tarea"
                    autoFocus
                  />                 
                </label>
                <label className="col-12"> Descripcion:
                  <input 
                    className="form-control" 
                    type="text" 
                    onChange={e => setNewContent(e.target.value)} 
                    value={newContent} 
                    ref={taskInput}
                    placeholder="Descripcion de la tarea"
                    autoFocus
                  />                  
                </label>
                <button className="btn btn-success btn-block mt-2">
                  Guardar
                </button>
              </form>
            </div>  
          </div>
          {
            tasks.map((el: ITask, i: number ) => (
              <div  key={i} className="card card-body mt-2">
                <h2 style={{textDecoration: el.done? "line-through" : ""}}> {el.title} </h2>
                <h4 style={{textDecoration: el.done? "line-through" : ""}}> {el.content} </h4>
                <div>
                  <button className="btn btn-secondary" onClick={() => toggleDoneTask(i)}>
                    {el.done ? "✓" : "✗"}
                  </button>
                  <button className="btn btn-danger btn-secondary" onClick={() => removeTask(i)} >
                    🗑
                  </button>
                </div>  
              </div> 
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

