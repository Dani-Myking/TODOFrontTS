import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Navigate, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {api_string, api_createTodo, api_getAllKategori, api_editTodo, api_deleteTodoById, api_getTodoById} from "../Utilities/API"
import {route_getAllTodo} from "../Utilities/Routes"
import {Todo, TodoValidation, Kategori, todoDefault} from "../Utilities/Utilities"
import HomePageButton from './HomePageButton';

const EditTodo: React.FC = () => {

  const [todo, setTodo] = useState<Todo>(todoDefault);
  const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorList, setErrorList] = useState<TodoValidation>({});
  const navigate = useNavigate();

  useEffect( ()=> {

    const fetchData = async () => {
      await fetch(api_getTodoById + searchParams.get("id"))
      .then(response => response.json())
      .then(data => setTodo(data));

      await fetch(api_getAllKategori)
      .then(response => response.json())
      .then(data => setKategoriList(data));

  };

    fetchData();

  }, []);

  const validateTittel = (t: string) => {
   
    if(t.length >= 80 || t.length == 0) {
      setErrorList(errors => ({...errors, tittel: "Tittel må være mellom 1 og 80 tegn"}));
    }else {
      setErrorList(errors => {
        const {tittel, ...e} = errors;
        return e;
      });
    }

    setTodo({...todo, tittel: t});

  }

  const validateFrist = (f: string) => {

    if(new Date(f) < (new Date())) {
      setErrorList(errors => ({...errors, frist: "Frist kan ikke være tilbake i tid"}));
    }else {
      setErrorList(errors => {
        const {frist, ...e} = errors;
        return e;
      });
    }

    setTodo({...todo, frist: f});
  }

  const validateKategori = (k: string) => {

    const k_id: number = parseInt(k);

    if(k_id == -1) {
      setErrorList(errors => ({...errors, kategori: "Må velge en kategori"}));
    }else {
      setErrorList(errors => {
        const {kategori, ...e} = errors;
        return e;
      });
    }

    setTodo({...todo, kategori: {...todo.kategori, id: k_id}})
    
  }

  const editTodo = (e: React.FormEvent) => {

    e.preventDefault();

    const editData = async () => {

      await fetch(api_editTodo, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
      })
      .finally(() => navigate(route_getAllTodo));

    }

    editData();
    //navigate("../../view?id=" + todo.id);
    

  }

  const deleteTodo = () =>  {

    if(window.confirm("Bekreftelse")) {

      const deleteData = async() => {

        await fetch(api_deleteTodoById + todo.id, {
          method: "DELETE",}
        )
        .finally(() => navigate(route_getAllTodo));

      }
    
      deleteData();

    }

  }


  return (

    <>
    <div className="container d-flex justify-content-center">

    <div className="col-12 col-lg-6 col-md-8 col-sm-12 p-3 m-3 bg-dark bg-opacity-10 rounded-4 border-5">

    <form onSubmit={(e) => editTodo(e)} id="todoForm">
    <div className="row p-2">
      <label >Tittel:
        <input type="text" value={todo.tittel} onChange={e => validateTittel(e.target.value)} className={"form-control " + (!errorList.tittel ? "border-success" : "border-danger")}/>
        <p className="text-danger">{errorList.tittel ? errorList.tittel : ""}</p>
      </label>
    </div>

    <div className="row p-2">
      <label >Frist:
        <input type="datetime-local" value={todo.frist} onChange={e => validateFrist(e.target.value)} className={"form-control " + (!errorList.frist ? "border-success" : "border-danger")}/>
        <p className="text-danger">{errorList.frist ? errorList.frist : ""}</p>
      </label>
    </div>
    
    <div className="row p-3">
    <select className="form-select" value={todo.kategori.id} onChange={e => validateKategori(e.target.value)}>
      <option value="-1">Velg en kategori</option>
      {
        kategoriList.
        sort((k1, k2) => k1.tittel.localeCompare(k2.tittel)).
        map( k =>
          <option key={"kategori_" + k.id} value={k.id}>{k.tittel}</option>
        )
      }
    </select>
    <p className="text-danger">{errorList.kategori ? errorList.kategori : ""}</p>
    </div>

    <div className="row p-3">
    <div className="form-check form-switch">
      <label className="form-check-label">Utført
        <input className="form-check-input" type="checkbox" role="switch" checked={todo.utfort} onChange={e => setTodo({...todo, utfort: !todo.utfort})} style={{width: "50px"}}/>
      </label>
    </div>
    </div>


    <div className="row p-2">
    <div className="btn-group">
      <input type="submit" value="Lagre" className="col-8 btn btn-success btn-group" disabled={Object.keys(errorList).length !== 0}/>
      <input type="button" value="Slett" className="col-4 btn btn-danger btn-group" onClick={() => deleteTodo()}/>
    </div>
    </div>

    </form>

    </div>
    </div>
    <HomePageButton />
    </>
  );
}

export default EditTodo;
