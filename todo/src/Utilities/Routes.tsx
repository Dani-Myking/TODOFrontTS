const getAllTodo: string = "/";
const getSingleTodoById: string = "/view?id=";
const editTodoById: string = "/edit?id=";
const createTodo: string = "/create";
const createKategori: string = "/create/kategori";

export {getAllTodo as route_getAllTodo, getSingleTodoById as route_getSingleTodoById,
    editTodoById as route_editTodoById, createTodo as route_createTodo,
    createKategori as route_createKategori};