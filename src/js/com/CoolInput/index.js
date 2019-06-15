import React from "react";
// import '../../../css/cool-input.css'
import axios from 'axios'

import styles from './CoolInput.css'


class CoolInput extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        console.log(process.env.NODE_ENV)
        this.url = 'http://idbi.me'
        this.state = {validUrl:true, phase:"input"}
        this.shortedUrl = ""
    }

    componentDidMount() {

    }
    handleClick = () => {
        console.log("post: "+ this.url)
        let that = this
        axios.post('/api/shorter', {
            url: this.url,
            lastName: 'Flintstone'
          })
          .then(function (response) {
                that.shortedUrl = response.data.shortedUrl
                that.setState(Object.assign({}, that.state, {phase:"output"}))
                console.log(response.data.shortedUrl, that);
                that.textInput.select()
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    handleChange = (event)=>{
        this.url = event.target.value
        let validUrl =/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(this.url)
        this.setState(Object.assign({}, this.state, {validUrl: validUrl}))
    }
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            this.handleClick()
          }
    }
    handleClickBack = () => {
        this.setState(Object.assign({}, this.state, {phase:"input"}))
        this.textInput.focus()
        this.textInput.select()
    }
    handleKeyUpBack = (e) => {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            this.handleClickBack()
          }
    }
    setTextInputRef = e => {
        this.textInput = e
    }
    setFocus(e){
        e.target.select();
    }
    render() {
        if (this.state.phase == "input")

            return (
                <div id={styles.namer}>
                    
                    <div id={styles['namer-input']}>
                        <input type="text" autoCapitalize="none" autoFocus onFocus={this.setFocus} name="url" value={this.url} placeholder="Input url to shorten" onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
                    </div>
                    <div className={this.state.validUrl?(styles["namer-controls"] + " " + styles.active) :styles["namer-controls"]} >
                        <div><span onClick={this.state.validUrl?this.handleClick:null}>Shorten</span></div>
                    </div>
                </div>
            )
        else
            return (
                <div id={styles.namer}>
                    
                    <div id={styles['namer-input']}>
                        <input ref={this.setTextInputRef} type="text" name="url" onFocus={this.setFocus}  value={this.shortedUrl} readOnly onKeyUp={this.handleKeyUpBack}/>
                    </div>
                    <div className={styles["namer-controls"] + " " + styles.active} >
                        <div><span onClick={this.handleClickBack}>Back</span></div>
                        <div><span onClick={this.handleClickTest}><a className={styles.linkButton}  href={this.shortedUrl} target="_blank">Test</a></span></div>
                    </div>
                </div>
            )    
    }
}

export default CoolInput