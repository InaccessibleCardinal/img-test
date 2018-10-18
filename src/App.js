import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {image: null, otherImage: null};
  }

  componentWillMount() {
    let img1Url = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
    let img2Url = 'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350';
    
    axios.get(img1Url, {responseType: 'arraybuffer'})
      .then((response) => {

        // console.log('headers: ', response.headers)
        let u = btoa(
          new Uint8Array(response.data)
            .reduce(function(data, byte) {
              return data + String.fromCharCode(byte)
            }, ''
          )
        );
        
        this.setState(
          {image: `data:image/png;base64,${u}`}, 
          () => console.log('state: ', this.state)
        );

      })
      .catch((e) => console.log(e));

      axios.get(img2Url, {responseType: 'blob'})
        .then((response) => {

          let _this = this;
          let reader = new FileReader();
          reader.readAsDataURL(response.data);

          reader.onload = function() {
            let result = reader.result;
            _this.setState({otherImage: result});
          }
        })
        .catch((e) => console.log(e));
  }
  render() {
    let {image, otherImage} = this.state;
    return (
      <div className="App">
        {image && <img src={image} width="200" alt="yourmom" />}
        {otherImage && <img src={otherImage} width="200" alt="yourmom" />}
      </div>
    );
  }
}

export default App;
