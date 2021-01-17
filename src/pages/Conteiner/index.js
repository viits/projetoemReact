import { useEffect, useState } from 'react';
import { Link ,useHistory} from 'react-router-dom';
import api from '../../service/api';

export default function Conteiner() {

    const [conteiner, setConteiner] = useState([]);
    const [pegaMovimentacao, setPegaMovimentacao] = useState([]);
    const [nomeCliente,setNomeCliente] = useState("");
    const [numeroCntr, setNumeroCntr] = useState("");
    const [tipo,setTipo] = useState(0);
    const [status,setStatus] = useState("");
    const [categoria,setCategoria] = useState("");
    const[movimentacao,setMovimentacao] = useState([]);

   const history = useHistory();

    useEffect(() => {
        api.get('/conteiners').then(res => {
            setConteiner(res.data);
        });
    }, []);

    useEffect(() => {
        api.get('/movimentacoes').then(res => {
            setPegaMovimentacao(res.data);
        });
    }, []);

    function verificaObjeto(e) {
        pegaMovimentacao.map(m=>{
            if(e == m.id){
                setMovimentacao(m);
            }
        })
    }

    async function insert(e) {
        e.preventDefault();
        const data = {
            nomeCliente,
            numeroCntr,
            tipo,
            status,
            categoria,
            movimentacao
        }

        try{
            console.log(movimentacao);
            const response = await api.post('/conteiners',data);
            console.log(response);
            console.log(response.data.tipo);
            alert(`Cadastrado com sucesso! ${response.data.id}`);
            history.push('/conteiners');
        }catch(e){
            alert(e);
            console.log(e);
        }
        
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
                            <th scope="col">Cliente</th>
                            <th scope="col">CNTR</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Status</th>
                            <th scope="col">Categoria</th>
                        </thead>
                        {conteiner.map(c => (
                            <tr>
                                <td>{c.id}</td>
                                <td>{c.nomeCliente}</td>
                                <td>{c.numeroCntr}</td>
                                <td>{c.tipo}</td>
                                <td>{c.status}</td>
                                <td>{c.categoria}</td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="col-lg-6 mt-5">
                    <form onSubmit={insert}>
                        <input type="text" placeholder="Cliente" className="form-control mb-2" value={nomeCliente} onChange={e=>setNomeCliente(e.target.value)} />
                        <input type="text" placeholder="CNTR" className="form-control " value={numeroCntr} onChange={e=>setNumeroCntr(e.target.value)} />
                        <div className="mt-3">
                            <label className="form-label">Tipo do Conteiner: </label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={20} onChange={e=>setTipo(e.target.value)} name="tipo" id="20" /> 20 Metros
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={40} onChange={e=>setTipo(e.target.value)} name="tipo" id="40" /> 40 Metros
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Status: </label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"CHEIO"} onChange={e=>setStatus(e.target.value)} name="status"  /> Cheio
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"VAZIO"} onChange={e=>setStatus(e.target.value)} name="status"  /> Vazio
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Categoria: </label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"IMPORTACAO"} onChange={e=>setCategoria(e.target.value)} name="categoria" id="0" /> Importação
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"EXPORTACAO"} onChange={e=>setCategoria(e.target.value)} name="categoria" id="1" /> Exportaçãos
                            </div>
                        </div>

                        <div className="mt-3 mb-3">
                            <select className="form-control" onChange={e => verificaObjeto(e.target.value)} name="movimentacao" id="movimentacao">
                                {pegaMovimentacao.map(m => (
                                    
                                    <option key={m.id} value={m.id}> {m.nameNavio}</option>
                                ))}
                            </select>
                        </div>

                        <input type="submit" value="Cadastrar" className="btn btn-success" />

                    </form>

                </div>
            </div>
        </div>
    );
}