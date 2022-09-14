import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {api_string, api_createTodo, api_getAllKategori, api_editTodo, api_deleteTodoById, api_getTodoById} from "../Utilities/API"
import {route_getAllTodo} from "../Utilities/Routes"
import {Todo, TodoValidation, Kategori, todoDefault} from "../Utilities/Utilities"
import HomePageButton from './HomePageButton';
import { randomInt } from 'crypto';

const CreateTodo: React.FC = () => {

    const [todo, setTodo] = useState<Todo>(todoDefault);
    const [kategoriList, setKategoriList] = useState<Kategori[]>([]);
    const [errorList, setErrorList] = useState<TodoValidation>({tittel: "", frist: "", kategori: ""});
    const [currentdate, setCurrentdate] = useState<Date>(new Date());
    const navigate = useNavigate();
  
    useEffect( ()=> {

      const fetchData = async () => {

        await fetch(api_getAllKategori)
        .then(response => response.json())
        .then(data => setKategoriList(data));

      }

      fetchData();
  
    }, []);
  
    const createTodo = (e: React.FormEvent) => {
  
      e.preventDefault();
  
      if(Object.keys(errorList).length === 0) {

        const sendData = async () => {

          await fetch(api_createTodo, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
          })
          .finally(() => navigate(route_getAllTodo));

        }

        sendData();
      }
  
    }
  
    const validateTittel = (t: string) => {
  
      if(t.length >= 80 || t.length == 0) {
        setErrorList(errors => ({...errors, tittel: "Tittel må være mellom 1 og 80 tegn"}));
      }else{
        setErrorList(errors => {
          const {tittel, ...e} = errors;
          return e;
        });
      }
  
      setTodo({...todo, tittel: t});
    }
  
    const validateFrist = (f: string) => {
  
      if(new Date(f) < currentdate) {
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
  
    return (
      
      <>
      <div className="container d-flex justify-content-center">
  
      <div className="col-12 col-sm-12 col-md-8 col-lg-6 p-3 m-3 bg-dark bg-opacity-10 rounded-4 border-5 ">
      <form onSubmit={e => createTodo(e)} id="todoForm">
  
      <div className="row p-2">
        <label >Tittel
          <input type="text" value={todo.tittel} placeholder="Legg til tittel" onChange={e => validateTittel(e.target.value)} className={"form-control " + (!errorList.tittel ? "border-success" : "border-danger")} />
          <p className="text-danger">{errorList.tittel ? errorList.tittel : ""}</p>
        </label>
      </div>
  
      <div className="row p-2">
        <label>Frist
          <input type="datetime-local" value={todo.frist} onChange={e => validateFrist(e.target.value)} className={"form-control " + (!errorList.frist ? "border-success" : "border-danger")} />
          <p className="text-danger">{errorList.frist ? errorList.frist : ""}</p>
        </label>
      </div>
      
      <div className="row p-3">
        <select className="form-select" onChange={(e) => validateKategori(e.target.value)}>
        <option value="-1">Velg en kategori</option>
        {
          kategoriList.
          sort((k1, k2) => k1.tittel.localeCompare(k2.tittel))
          .map( k =>
            <option key={"kategori_" + k.id} value={k.id}>{k.tittel}</option>
          )
        }
        </select>
        <p className="text-danger">{errorList.kategori ? errorList.kategori : ""}</p>
      </div>
      
      <div className="row p-3">
        <input type="submit" value="Lagre" className="btn btn-success" disabled={Object.keys(errorList).length !== 0} />
      </div>
  
      </form>
      </div>
      </div>
      <HomePageButton />
      </>
    );
  }

  export default CreateTodo;