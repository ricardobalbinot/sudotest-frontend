import React, { useState, useEffect } from 'react';
import Prova from '../components/Prova/Prova';
import TelaConfirmacao from '../components/TelaConfirmacao/TelaConfirmacao';
import TelaEspera from '../components/TelaEspera/TelaEspera';

export default function ControllerProva(props) {
    const [emExecucao, setExecucao] = useState(true),
        [prova, setProva] = useState(JSON.parse(localStorage.getItem('prova'))),
        [acao, setAcao] = useState(props.acaoEscolhida), 
        [questoesProva, setQuestoes] = useState();

    console.log(prova.id);

    useEffect(() => {
        setAcao(props.acaoEscolhida);
    }, [props.acaoEscolhida]);

    const encerrarSessao = () => {
        localStorage.setItem('Usuario', 'user');
        props.history.push('/home');
    }

    const cancelar = () => {
        setAcao('prova');
    }
    const mensagemSaida = "Você tem certeza que deseja encerrar a prova?";


    if (acao === 'sair')
        return <TelaConfirmacao funcaoConfirmacao={encerrarSessao}
            funcaoCancelar={cancelar}
            mensagem={mensagemSaida} />

    if(acao === 'espera') return <TelaEspera />

    return <Prova />;
}