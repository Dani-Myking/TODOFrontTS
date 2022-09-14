import React, { ReactElement, useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { api_createKategori, api_getAllKategori } from '../Utilities/API';
import {route_getAllTodo} from "../Utilities/Routes"
import {Kategori, kategoriDefault} from "../Utilities/Utilities"
import HomePageButton from './HomePageButton';

//interface Kategori {
//  tittel: string;
//}

const CreateKategori: React.FC = () => {

  const [kategori, setKategori] = useState<Kategori>(kategoriDefault);
  const navigate = useNavigate();

  const createKategori = (e: React.FormEvent) => {

    e.preventDefault();

    const submitData = async () => {

      await fetch(api_createKategori, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(kategori)
      });

    }

    submitData();
    navigate(route_getAllTodo);

  }

  return (
  
    <>
    <div className="container d-flex justify-content-center">

    <div className="col-sm-12 col-md-8 col-lg-6 p-3 m-3 bg-dark bg-opacity-10 rounded-4 border-5 ">
    <form onSubmit={e => createKategori(e)} id="todoForm">

    <div className="row p-2">
      <label >Tittel
        <input type="text" value={kategori.tittel} placeholder="Legg til tittel" onChange={e => setKategori({...kategori, tittel: e.target.value})} className="form-control" />
      </label>
    </div>

    <div className="row p-3">
      <input type="submit" value="Lagre" className="btn btn-success" />
    </div>

    </form>
    </div>
    </div>
    <HomePageButton />
    </>
  );
}

export default CreateKategori;
