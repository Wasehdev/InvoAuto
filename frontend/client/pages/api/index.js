// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export function getTasks() {
  return axios.get("http://localhost:5000/tasks", {
    headers: { "Access-Control-Allow-Origin": "*" },
    crossorigin: true,
  });
}

export function getInvoices() {
  return axios.get("http://localhost:5000/invoices", {
    headers: { "Access-Control-Allow-Origin": "*" },
    crossorigin: true,
  });
}
