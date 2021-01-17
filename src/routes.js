import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Conteiner from './pages/Conteiner';
import Movimentacao from './pages/Movimentacao';
import Relatorio from './pages/Relatorio';
import Home from './pages/Home';

import Update from './pages/Conteiner/update';
import UpdateM from './pages/Movimentacao/update';
export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/conteiners" component={Conteiner}/>
                <Route path="/updateConteiners/:id" component={Update}/>
                <Route path="/movimentacao" component={Movimentacao}/>
                <Route path="/updateMovimentacao/:id" component={UpdateM}/>
                <Route path="/relatorios" component={Relatorio}/>

            </Switch>
        </BrowserRouter>

    );
}
