import React from "react";
import '../../css/cool-input.css'
import axios from 'axios'

class CoolInput extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        this.url = ''
        this.state = {validUrl:false}
    }

    componentDidMount() {

    }
    handleClick = () => {
        console.log("post: "+ this.url)
        axios.post('/api/shorter', {
            url: this.url,
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    handleChange = (event)=>{
        this.url = event.target.value
        let validUrl =/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(this.url)
        this.setState(Object.assign({}, {validUrl: validUrl}))
    }
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            this.handleClick()
          }
    }
    render() {
        return (
            <div id="namer">
                <div id="namer-input">
                    <input type="text" name="url" placeholder="Input url to shorten" onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
                </div>
                <div className={this.state.validUrl?"namer-controls active":"namer-controls"} >
                    <div><span onClick={this.state.validUrl?this.handleClick:null}>Shorten</span></div>
                </div>
            </div>
        )
    }
}


export default CoolInput



window.onload = function () {


}
