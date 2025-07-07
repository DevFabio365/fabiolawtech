import { apiFetch } from "./api";
import { Intimacao } from "../types/Intimacao";

const BASE_URL = "http://localhost:3000";

export const getIntimacoes = async (): Promise<Intimacao[]> => {
  return apiFetch<Intimacao[]>(`${BASE_URL}/Intimacao/`);
};