import Request from "./index";

export const apiLogin = (data) => Request.post("/login", data);
