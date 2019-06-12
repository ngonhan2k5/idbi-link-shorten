import React from "react";
// import { directive } from "@babel/types";
import styles from './../com/CoolInput/CoolInput.css'

class App extends React.Component {
    constructor(){
        super()
        this.error = window.__ERROR__
    }

    handleClickBack = () => {
        window.location.href = '/'
    }

    render() {
        return (
        <div>
            
            <div id={styles.namer}>
                
                <div id={styles['namer-input']}>
                    <input ref={this.setTextInputRef} type="text" name="url" onFocus={this.setFocus}  value={this.error} readOnly onKeyUp={this.handleKeyUpBack}/>
                </div>
                <div className={styles["namer-controls"] + " " + styles.active} >
                    <div><span onClick={this.handleClickBack}>Back</span></div>
                </div>
            </div>
            
        </div>
    );
  }
}
export default App