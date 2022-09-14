const host : string = "https://localhost"
const port : string = "7293"
const api : string = host + ":" + port + "/";
const getAllTodo: string = api + "todo";
const getTodoById: string = api + "todo/view/?id=";
const createTodo: string = api + "todo/create";
//const editTodo: string = "edit";
const editTodo: string = api + "todo/edit";
const deleteTodoById: string = api + "todo/delete?id=";

const getAllKategori: string = api + "kategori";
const createKategori: string = api + "kategori/create";

export {api as api_string, getAllTodo as api_getAllTodo,
    getTodoById as api_getTodoById, createTodo as api_createTodo,
    editTodo as api_editTodo, deleteTodoById as api_deleteTodoById,
    getAllKategori as api_getAllKategori, createKategori as api_createKategori}