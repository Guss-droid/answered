import axios from "axios";
import { parseCookies } from "nookies";

const { "answered:token": token } = parseCookies()

export const apiAuth = axios.create({
  baseURL: "http://localhost:3333/",
  headers: { "Authorization": `Bearer ${token}` }
})

export const apiQuestions = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Authorization": `Bearer ${token}` }
})