import React, { Component } from 'react';
import './App.css';

import Particles from './components/Particles/Particles';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Clarifai, { FACE_DETECT_MODEL } from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'c846681a4ece4eb4b4d24347feb9d69b'
});



class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict(
        FACE_DETECT_MODEL,
        this.state.input)
      .then(
        function (response) {
          console.log(response);
        },
        function (err) {

        }
      );
  }

  render() {
    return (
      <div className="App">
        <Particles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
