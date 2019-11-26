import React from 'react';
import './Dashboards.css';

export default function Dashboards(props) {

    const mudaAtividade = (e) => {
        props.mudarAtividade(e);
        const elementoMarcado = document.getElementsByClassName('atual');
        if (elementoMarcado[0] !== undefined) {
            elementoMarcado[0].classList.remove('atual');
        }
        const elemento = document.getElementById(e);
        elemento.classList.add('atual');
    }

    return (
        <div className="container-dash">
            <ul>
                {props.acoesUsuario.map((e) => <li id={e.acao} onClick={() => mudaAtividade(e.acao)}>{e.texto}</li>)}
            </ul>
        </div>
    );
}