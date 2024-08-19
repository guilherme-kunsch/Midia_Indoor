import React from 'react'
import styles from './styles.module.scss'

import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function GerenciarSenhas(){

    const navigate = useNavigate();
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <FaHome color='white' size={30} style={{margin: '10px', cursor: 'pointer'}} onClick={() => navigate('/')}/>
                <h1>Gerenciar Senhas</h1>
                <h1> </h1>
            </div>

            <div className={styles.senhasAtuais}>
                <label>Normal</label>
                <h4>Senha Atual</h4>
            </div>

            <div className={styles.buttonsSenhas}>
                <h4>Próxima Senha</h4>
                <h4>Chamar Anterior</h4>
                <h4>Senha Manual</h4>
            </div>

            <div className={styles.senhasAtuais}>
                <label>Preferencial</label>
                <h4>Senha Atual</h4>
            </div>

            <div className={styles.buttonsSenhas}>
                <h4>Próxima Senha</h4>
                <h4>Chamar Anterior</h4>
                <h4>Senha Manual</h4>
            </div>
        </div>
    )
}