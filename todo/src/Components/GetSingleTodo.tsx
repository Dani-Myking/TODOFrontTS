import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {api_deleteTodoById, api_getTodoById} from "../Utilities/API"
import {route_getAllTodo, route_editTodoById} from "../Utilities/Routes"
import {Todo, TodoI, todoDefault} from "../Utilities/Utilities"
import HomePageButton from "./HomePageButton";

const GetSingleTodo: React.FC = () => {
  const [todo, setTodo] = useState<Todo>(todoDefault);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect( () => {

    const fetchData = async () => {

      await fetch( api_getTodoById + searchParams.get("id") )
      .then(response => response.json())
      .then(data => setTodo(data));

    }
    
    fetchData();

  }, []);

  const deleteTodo = (e: React.FormEvent) =>  {

    e.preventDefault();

    if(window.confirm("Bekreftelse")) {

      const deleteData = async () => {

        await fetch(api_deleteTodoById + todo.id, {
          method: "DELETE",
        })
        .finally(() => navigate(route_getAllTodo));

      }

      deleteData();
      
    }

  }

  return (
    <>

    <div className="container d-flex justify-content-center">
    <div className="col-10 col-sm-10 col-md-8 col-lg-6 p-3 m-3 bg-dark bg-opacity-10 rounded-4 border-5" >
    <TodoRows todo={todo}/>

    <div className="row p-3">
    <div className="col-10 offset-1 btn-group" role="group">

        <button onClick={() => navigate(route_editTodoById + todo.id)} className="col-8 btn-group btn btn-primary">Rediger</button>
        <button onClick={e => deleteTodo(e)} className="col-4 btn-group btn btn-danger">Slett</button>

    </div>
    </div>

    </div>
    </div>

    <HomePageButton />
    </>
  );
}

const TodoRows: React.FC<TodoI> = ({todo}) => {

  return (

    <>
    <div className="row"><div className="col-3 fw-semibold">Tittel:</div> <div className="col-6 text-break text-wrap text-center">{todo.tittel}</div></div>
    <div className="row"><div className="col-3 fw-semibold">Kategori:</div> <div className="col-6 text-center">{todo.kategori.tittel}</div></div>
    <div className="row"><div className="col-3 fw-semibold">Opprettet:</div> <div className="col-6 text-center">{todo ? new Date(todo.opprettelse).toLocaleString() : ""}</div></div>
    <div className={"row " + (new Date(todo?.frist!) < new Date() ? "text-danger" : "")}><div className="col-3 fw-semibold">Frist:</div> <div className="col-6 text-center">{todo ? new Date(todo.frist).toLocaleString() : ""}</div></div>
    {new Date(todo.frist) < new Date() ? <div className="row"><div className="col-6 offset-3 text-center text-danger fw-semibold">Frist utløpt</div></div> : ""}
    <div className="row"><div className="col-3 fw-semibold">Utført:</div> <div className="col-6 text-center">{todo.utfort ? "Ja" : "Nei"}</div></div>
    </>
  );

}

export default GetSingleTodo;