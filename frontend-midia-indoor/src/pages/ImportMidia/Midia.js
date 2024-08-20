import React from 'react';
import styles from './styles.module.scss';
export function Midia(){
  return(
   <>
  <div className={styles.container}>
  <label htmlFor="file-input" className={styles.fileinput}>
      <div className={styles.dropzone} id='drop-zone'>
        <p><b>Selecione um arquivo</b> ou solte aqui.</p>
      </div>
      <input type="file" id='file' />
    </label>
  </div>
   
   
   
   </>
  )
}