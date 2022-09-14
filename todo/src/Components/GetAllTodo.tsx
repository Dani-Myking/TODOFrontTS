import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {api_string, api_getAllTodo, api_createTodo, api_getAllKategori, api_editTodo, api_deleteTodoById, api_getTodoById} from "../Utilities/API"
import {route_getAllTodo, route_getSingleTodoById, route_createKategori, route_createTodo} from "../Utilities/Routes"
import {Todo, TodoI} from  "../Utilities/Utilities";

const GetAllTodo: React.FC = () => {

    const [todoList, setTodoList] = useState<Todo[]>([]);
    const navigate = useNavigate();

    useEffect( ()=>{
      
      const fetchData = async () => {

        await fetch(api_getAllTodo)
          .then(response => response.json())
          .then(data => setTodoList(data));

      }

      fetchData();

    } , []);
  
    const viewTodo = (e: React.MouseEvent, id: number) => {
      
      navigate(route_getSingleTodoById + id);
    }

    const deleteTodo = (e: React.FormEvent, id: number) =>  {

      e.stopPropagation();

      if(window.confirm("Bekreftelse")) {
  
        const deleteData = async() => {

          await fetch(api_deleteTodoById + id, {
            method: "DELETE",}
          );

          setTodoList(todoList.filter(t => t.id !== id));

          //await fetch(api_getAllTodo)
          //  .then(response => response.json())
          //  .then(data => setTodo(data)
          //);

        }
      
        deleteData(); 
      }
  
    }

    return (
      
      <>
      <div className="container p-3">
        <CreateTodoButton />
        <br />
        <CreateKategoriButton />
      </div>
  
    <div className="container">
    <div className="row p-3 m-3 bg-dark bg-opacity-10 rounded-4">
      <Banner />
    </div>
      {
        todoList.map((t) =>
        
          <div key={"todo_" + t.id} onClick={(e) => viewTodo(e, t.id)}>
            <GetSingleTodoRow todo={t}>
              <button type="submit" value="Delete" className="btn btn-danger" onClickCapture={e => deleteTodo(e, t.id)} >Slett</button>
            </GetSingleTodoRow>
          </div>

        )
      }
    
      </div>
      </>
  
    );
  }

  const CreateTodoButton: React.FC = () => {

    const navigate = useNavigate();

    return (
      
      <div className="row text-center">
        <div className="col">
          <button onClick={() => navigate(route_createTodo)} className="btn btn-success btn-lg">Lag TODO</button>
        </div>
      </div>
      
    );
  }

  const CreateKategoriButton: React.FC = () => {

    const navigate = useNavigate();

    return (
      
      <div className="row text-center">
        <div className="col">
          <button onClick={() => navigate(route_createKategori)} className="btn btn-success btn-lg">Lag Kategori</button>
        </div>
      </div>
      
    );
  }

  const Banner: React.FC = () => {

    return (
      <>
      <div className="col-lg-2 col-md-3 col-sm-8 fw-semibold"><p>Tittel:</p></div>
      <div className="col-lg-2 col-md-3 d-none d-md-block fw-semibold"><p>Kategori:</p></div>
      <div className="col-lg-2 col-md-3 d-none d-md-block fw-semibold"><p>Opprettet:</p></div>
      <div className="col-lg-2 d-none d-lg-block fw-semibold"><p>Frist:</p></div>
      <div className="col-lg-2 d-none d-lg-block fw-semibold"><p>Utført:</p></div>
      </>
    );
  }

  const GetSingleTodoRow: React.FC<TodoI> = ({todo, children}) => {

    return (
  
      <div className="row p-3 m-3 bg-dark bg-opacity-10 rounded-4" >
        <div className="col-8 col-lg-2 col-md-3 col-sm-9 text-truncate">{todo?.tittel}</div>
        <div className="col-lg-2 col-md-3 d-none d-md-block">{todo?.kategori.tittel}</div>
        <div className="col-lg-2 col-md-3 d-none d-md-block">{todo ? new Date(todo.opprettelse).toLocaleDateString() : ""}</div>
        <div className="col-lg-2 d-none d-lg-block">{todo ? new Date(todo.frist).toLocaleDateString() : ""}</div>
        <div className="col-lg-2 d-none d-lg-block">{todo?.utfort ? "Ja" : "Nei"}</div>
  
        <div className="col-2">
          {children}
        </div>
      </div>
      
    );
  }

  export default GetAllTodo;