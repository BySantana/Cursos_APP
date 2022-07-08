import { Categoria } from "./Categoria";
import { User } from "./identity/User";

export class Curso {
    cursoId: number;
    cursoNome: string;
    descricao: string;
    dataInicio: Date;
    dataTermino: Date;
    qtdAlunos: number;
    status: boolean;
    categoriaId: number;
    categoria: Categoria;
    userId: number;
    user: User;
}
