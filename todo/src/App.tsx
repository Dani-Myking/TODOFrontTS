import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GetAllTodo from './Components/GetAllTodo';
import GetSingleTodo from './Components/GetSingleTodo';
import CreateTodo from './Components/CreateTodo';
import EditTodo from './Components/EditTodo';
import CreateKategori from './Components/CreateKategori';
import {api_string, api_getAllTodo} from "./Utilities/API"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import {} from "./Utilities/Routes"

interface Todo {
  id: number
  tittel: string,
  opprettelse: string,
  frist: string,
  kategori: Kategori
  utfort: boolean
}

interface Kategori {
  id?: number,
  tittel?: string
}

interface Todos {
  todo?: Todo[]
}

function App() {

  const [todos, setTodo] = useState<Todo[]>();

  const getTodos = () => {

    fetch(api_getAllTodo)
    .then(response => response.json())
    .then(data => setTodo(data));

  }

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<GetAllTodo />} />
        <Route path="view">
          <Route index element={<GetSingleTodo />} />
        </Route>
        <Route path="edit">
          <Route index element={<EditTodo />} />
        </Route>
        <Route path="create">
          <Route index element={<CreateTodo />} />
          <Route path="kategori">
            <Route index element={<CreateKategori />} />
          </Route>
        </Route>
        <Route path="*" element={<p>123</p>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
