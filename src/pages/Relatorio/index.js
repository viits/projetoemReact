import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../service/api';

export default function Relatorio() {

    const [conteiner, setConteiner] = useState([]);

    const [importacao, setImportacao] = useState(0);
    const [exportacao, setExportacao] = useState(0);
    let importacaoA = 0;
    let exportacaoA = 0;
    useEffect(() => {
        api.get('/conteiners').then(res => {
            setConteiner(res.data);     
            console.log(res.data);
        });

    }, []);

    useEffect(()=>{
        conteiner.map(c => {
            console.log(c.categoria);
            if (c.categoria == "IMPORTACAO") {
                setImportacao(importacaoA += 1);
            } else if(c.categoria == "EXPORTACAO") {
                setExportacao(exportacaoA += 1);
            }
        })
    });


    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-3">
                <Link style={{ textDecoration: 'none' }} to="/">Home</Link>

                <Link style={{ textDecoration: 'none' }} to="/conteiners">Conteiner</Link>

                <Link style={{ textDecoration: 'none' }} to="/movimentacao">Movimentações</Link>

                <Link style={{ textDecoration: 'none' }} to="/relatorios">Gerar Relatório</Link>
            </div>
            <div className="row mt-5">
                <h2>Total Importações: {importacao} </h2>
                <h2>Total Exportação: {exportacao} </h2>
            </div>
            <div className="row mt-5">

                {conteiner.map(c => (
                    <div className="col-lg-6">
                        <div className="card mt-4" style={{ width: 500 }}>
                            <div className="card-body">
                                <h4><b>Cliente: </b> {c.nomeCliente} </h4>
                                <h4><b>Tipo Movimentação: </b> {c.movimentacao.tipoMovimentacao}</h4>
                                <h4><b>Categoria: </b>{c.categoria}</h4>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}