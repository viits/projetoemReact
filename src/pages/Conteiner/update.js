import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import api from '../../service/api';

export default function Update() {

    const history = useHistory();

    let { id } = useParams();

    const [conteiner, setConteiner] = useState([]);
    const [pegaMovimentacao, setPegaMovimentacao] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [numeroCntr, setNumeroCntr] = useState("");
    const [tipo, setTipo] = useState(0);
    const [status, setStatus] = useState("");
    const [categoria, setCategoria] = useState("");
    const [movimentacao, setMovimentacao] = useState([]);

    useEffect(() => {
        api.get(`/conteiners/${id}`).then(res => {
            setConteiner(res.data);
            console.log(res.data);
            console.log(conteiner);
        });
    }, []);

    function verificaCntr() {

        if (numeroCntr.length < 11 || numeroCntr > 11) {
            alert("Numero CNTR inválido");
            console.log(numeroCntr);
            return false;
        }

        let numeros = numeroCntr.split("").filter(n => (Number(n) || n == 0)).join("");

        if (numeros.length > 7 || numeros.length < 7) {
            alert("Numero CNTR inválido");
            console.log(numeroCntr);
            return false;
        }
        else {
            console.log(numeroCntr);
            return true;
        }

    }

    function isValid() {
        console.log(movimentacao.id);
        if (nomeCliente == "" || numeroCntr == "" || tipo == 0 || status == "" || categoria == "" || movimentacao.id == undefined) {
            alert("Preencha todos os Campos");
            return false
        } else {
            if (verificaCntr()) {
                return true;
            } else {

                return false;
            }
        }

    }



    async function update(e) {
        e.preventDefault();
        if (isValid()) {


            const data = {
                nomeCliente,
                numeroCntr,
                tipo,
                status,
                categoria,
                movimentacao
            }

            try {

                const response = await api.put(`/conteiners/${id}`, data);
                console.log(response);
                console.log(response.data.tipo);
                alert(`Cadastrado com sucesso! ${response.data.id}`);
                history.push('/conteiners');
            } catch (e) {
                alert(e);
                console.log(e);
            }
        }
    }


    useEffect(() => {
        api.get('/movimentacoes').then(res => {
            setPegaMovimentacao(res.data);
        });
    }, []);

    function verificaObjeto(e) {
        pegaMovimentacao.map(m => {
            if (e == m.id) {
                setMovimentacao(m);
            }
        })
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
                <div className="col-lg-12 mt-5">
                    <form onSubmit={update}>
                        <input type="text" placeholder={conteiner.nomeCliente} className="form-control mb-2" value={nomeCliente} onChange={e => setNomeCliente(e.target.value)} />
                        <input type="text" placeholder={conteiner.numeroCntr} className="form-control " value={numeroCntr} onChange={e => setNumeroCntr(e.target.value)} />
                        <div className="mt-3">
                            <label className="form-label">Tipo do Conteiner: </label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={20} onChange={e => setTipo(e.target.value)} name="tipo" id="20" /> 20 Metros
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={40} onChange={e => setTipo(e.target.value)} name="tipo" id="40" /> 40 Metros
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Status: </label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"CHEIO"} onChange={e => setStatus(e.target.value)} name="status" /> Cheio
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"VAZIO"} onChange={e => setStatus(e.target.value)} name="status" /> Vazio
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="form-label">Categoria: </label>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"IMPORTACAO"} onChange={e => setCategoria(e.target.value)} name="categoria" id="0" /> Importação
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" value={"EXPORTACAO"} onChange={e => setCategoria(e.target.value)} name="categoria" id="1" /> Exportaçãos
                            </div>
                        </div>

                        <div className="mt-3 mb-3">
                            <select className="form-control" onChange={e => verificaObjeto(e.target.value)} name="movimentacao" id="movimentacao">
                                <option value="0">Selecione</option>
                                {pegaMovimentacao.map(m => (
                                    <option key={m.id} value={m.id}> {m.nameNavio}</option>
                                ))}
                            </select>
                        </div>

                        <input type="submit" value="Atualizar" className="btn btn-warning" />

                    </form>
                </div>
            </div>
        </div>
    );
}