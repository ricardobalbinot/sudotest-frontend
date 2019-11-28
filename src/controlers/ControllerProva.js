import React, { useState, useEffect } from 'react';
import Prova from '../components/Prova/Prova';
import TelaConfirmacao from '../components/TelaConfirmacao/TelaConfirmacao';
import TelaEspera from '../components/TelaEspera/TelaEspera';
import api from '../services/api';
import { preencherListaComRespostasVazias } from '../helpers/MonitorQuestoesProva';
import Feedback from '../components/Feedback/Feedback';

let listaRespostasVazias = [];

export default function ControllerProva(props) {
    const [emExecucao, setExecucao] = useState(''),
        [prova, setProva] = useState(JSON.parse(localStorage.getItem('prova'))),
        [acao, setAcao] = useState(props.acaoEscolhida),
        [espera, setEspera] = useState(true),
        [questoesProva, setQuestoes] = useState('');

    useEffect(() => {
        setAcao(props.acaoEscolhida);
    }, [props.acaoEscolhida]);


    async function buscarQuestoes(e) {
        const response = await api.get('/buscaProvasQuestoes', {
            params: {
                idProva: prova.id
            }
        })
        setQuestoes(response.data);
        if (response) {
            const idAluno = localStorage.getItem('idUsuario');
            response.data.map( questao => {
                preencherListaComRespostasVazias(idAluno, prova.id, questao.id, listaRespostasVazias)
            });
        }else{
            //validar quando questões não são retornadas
            setExecucao('feedback');
            console.log(response, ' deu problema');
        }
        
        setEspera(false);
    }

    if (questoesProva === '') buscarQuestoes();

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

    if (espera) return <TelaEspera />
        
    if(emExecucao === 'feedback') return <Feedback />
    
    return (
        <Prova  questao={questoesProva} 
                horaTermino={prova.horaTermino} 
                history={props.history} 
                listaRespostas={listaRespostasVazias} 
                idProva={prova.id}/>
    );
}