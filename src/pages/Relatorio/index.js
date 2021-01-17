import { Link } from 'react-router-dom';
export default function Relatorio() {
    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-3">
                <Link style={{textDecoration:'none'}} to="/">Home</Link>

                <Link style={{textDecoration:'none'}} to="/conteiners">Conteiner</Link>

                <Link style={{textDecoration:'none'}} to="/movimentacao">Movimentações</Link>

                <Link style={{textDecoration:'none'}} to="/relatorios">Gerar Relatório</Link>
            </div>
            <div className="row mt-5">
                <div className="col-lg-12">
                    <div className="card" style={{width:400 }}>
                        <div className="card-body">
                            <h4><b>Cliente: Giovana Nápoli</b></h4>
                            <h4><b>Movimentação:</b></h4>
                            <h4><b>Total:</b></h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}