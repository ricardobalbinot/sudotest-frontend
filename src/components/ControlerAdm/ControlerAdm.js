import React from 'react';
import logo from '../../assets/logo.png';
import CadastroQuestoes from '../CadastroQuestoes/CadastroQuestoes';
import './ControleAdm.css';

export default function ControlerAdm(props){

    if(props.atividade === 'cadastrar-questao'){
        return (
            <CadastroQuestoes />
        );
    }


    return (
        <div className="dashboard-container">
            <div>
                <img src={logo} alt="Sudotec Logo" />
            </div>
            <div className="text-container">
                <h1 id="sudo">Sudo </h1>
                <h1 id="test">Test</h1>
            </div>
            <div className="container-text-painel">
                <h1 id="painel">Painel do administrador</h1>
            </div>
        </div>
    );
}