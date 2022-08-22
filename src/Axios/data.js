import Request from "./index";

export const apiFetchIG = (params) => Request.get("/api/ig", { params });
export const apiCreateIG = (data) => Request.post("/api/ig", data);
export const apiUpdateIG = (id, data) => Request.put(`api/ig/${id}`, data);
export const apiDeleteIG = (id) => Request.delete(`api/ig/${id}`);
