import axios from "axios";

export function getTasks() {
  return axios.get("http://localhost:5000/tasks", {
    headers: { "Access-Control-Allow-Origin": "*" },
    crossorigin: true,
  });
}
