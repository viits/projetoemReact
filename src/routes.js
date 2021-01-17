import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Conteiner from './pages/Conteiner';
import Movimentacao from './pages/Movimentacao';
import Relatorio from './pages/Relatorio';
import Home from './pages/Home';
export default function Routes(){
    return (

        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/conteiners" component={Conteiner}/>
                <Route path="/movimentacao"  component={Movimentacao}/>
                <Route path="/relatorios" component={Relatorio}/>
            </Switch>
        </BrowserRouter>

    );
}
