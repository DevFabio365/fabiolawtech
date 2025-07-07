export interface Intimacao {
  id: string;
  numero: string;
  resumo: string;
  objeto: string;
  providencia: string;
  advogado: string;
  revisor: string;
  prazoInterno: string;
  prazoFatal: string;
  nota: string;
}

export interface IntimacaoAdvogado {
  id: number;
  nome: string;
}

export const advogadosMock: IntimacaoAdvogado[] = [
  { id: 1, nome: 'Dr. João Silva' },
  { id: 2, nome: 'Dra. Maria Oliveira' },
  { id: 3, nome: 'Dr. Pedro Souza' },
  { id: 4, nome: 'Dra. Ana Lima' },
  { id: 5, nome: 'Dr. Carlos Mendes' },
];