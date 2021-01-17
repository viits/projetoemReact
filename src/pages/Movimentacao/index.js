import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../service/api'

export default function Movimentacao() {
    const [movimentacao, setMovimentacao] = useState([])
    const [nameNavio, setNameNavio] = useState("");
    const [tipoMovimentacao, setTipoMovimentacao] = useState(0);
    const [inicio, setDataInicio] = useState("");
    const [fim, setDataFim] = useState("");

    const history = useHistory();

    useEffect(() => {
        api.get("/movimentacoes")
            .then(res => {
                setMovimentacao(res.data);
            });
    }, [])


    async function insert(e) {
        e.preventDefault();
        setDataInicio(FormatStringData(inicio));
        setDataFim(FormatStringData(fim));
        console.log(inicio);
        const data = {
            nameNavio,
            tipoMovimentacao,
            inicio,
            fim,
        }
        try {
            const response = await api.post('/movimentacoes', data);
            console.log(response);
            alert(`Cadastrado com sucesso! ${response.data.id}`);
            history.push('/movimentacao');
        } catch (e) {
            alert(e);
        }

    }

    function FormatStringData(data) {
        let dia = data.split("/")[0];
        let mes = data.split("/")[1];
        let ano = data.split("/")[2];
        return ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    }


    return (
        <div className="container">
            <div className="d-flex justify-content-between mt-3">
                <Link style={{ textDecoration: 'none' }} to="/">Home</Link>

                <Link style={{ textDecoration: 'none' }} to="/conteiners">Conteiner</Link>

                <Link style={{ textDecoration: 'none' }} to="/movimentacao">Movimentações</Link>

                <Link style={{ textDecoration: 'none' }} to="/relatorios">Gerar Relatório</Link>
            </div>

            <div className="row">

                <div className="col-lg-6 mt-5">

                    <table className="border table table-striped">
                        <thead className="table-light">
                            <th scope="col">#</th>
                            <th scope="col">Navio</th>
                            <th scope="col">Tipo Movimentacao</th>
                            <th scope="col">Inicio</th>
                            <th scope="col">Fim</th>
                        </thead>
                        {movimentacao.map(m => (
                            <tr>
                                <td>{m.id}</td>
                                <td>{m.nameNavio}</td>
                                <td>{m.tipoMovimentacao}</td>
                                <td>{m.inicio}</td>
                                <td>{m.fim}</td>
                            </tr>
                        ))}
                    </table>
                </div>

                <div className="col-lg-6 mt-5">
                    <form onSubmit={insert}>
                        <input type="text" placeholder="Nome do Navio" className="form-control mb-2" value={nameNavio} onChange={e => setNameNavio(e.target.value)} />
                        <div className="mt-3 mb-3">

                            <select name="tipoMovimentacao" onChange={e => setTipoMovimentacao(e.target.value)} id="tipoMovimentacao" className="form-control">
                                <option value="EMBARQUE">Embarque</option>
                                <option value="DESCARGA">Descarga</option>
                                <option value="GATEIN">GateIn</option>
                                <option value="GATEOUT">GateOut</option>
                                <option value="POSICIONAMENTO">Posicionamento</option>
                                <option value="PILHA">Pilha</option>
                                <option value="PESAGEM">Pesagem</option>
                                <option value="SCANNER">Scanner</option>
                            </select>


                        </div>
                        <input type="date" placeholder="Data de Inicio" className="form-control mb-2" value={inicio} onChange={e => setDataInicio(e.target.value)} />
                        <input type="date" placeholder="Data do Fim" className="form-control mb-2" value={fim} onChange={e => setDataFim(e.target.value)} />

                        <input type="submit" value="Cadastrar" className="btn btn-success" />
                    </form>
                </div>

            </div>

        </div>
    );
}