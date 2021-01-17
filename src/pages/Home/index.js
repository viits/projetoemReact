import { Link } from 'react-router-dom';
export default function Home() {
    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <h1 className="text-center">CRUD T2S</h1> <br />
                <h3 className="text-center">Feito por Esdras Victor</h3>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <Link style={{textDecoration:'none'}} to="/">Home</Link>

                <Link style={{textDecoration:'none'}} to="/conteiners">Conteiner</Link>

                <Link style={{textDecoration:'none'}} to="/movimentacao">Movimentações</Link>

                <Link style={{textDecoration:'none'}} to="/relatorios">Gerar Relatório</Link>
            </div>
          

        </div>
    );
}