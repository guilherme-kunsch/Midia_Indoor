import React from "react";
import styles from './styles.module.scss'
import { useNavigate } from "react-router-dom";

export default function Home(){

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <h1>Menu</h1>

                <div className={styles.options}>
                    <h4>Playlist</h4>
                    <h4>Gerenciamento</h4>
                    <h4 onClick={() => navigate('/ImportarMidias')}>Importação de Mídia</h4>
                    <h4>Dispositivos</h4>
                    <h4 onClick={() => navigate('/GerenciarSenhas')}>Gerenciar Senhas</h4>
                    <h4>Senhas</h4>
                </div>

            </div>
        </div>
    )
}