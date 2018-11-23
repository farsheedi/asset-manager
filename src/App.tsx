import * as React from 'react';
import './App.css';
import Inputs from './components/inputs';
// import Table from './components/table';
import logo from './logocontoso.png';

const synth = window.speechSynthesis;

interface IState {
  currentAsset: any,
  assets: any[],
  net_worth:any,
  asset_size:any
}



class App extends React.Component<{},IState> {

  constructor(props: any) {
    super(props)
    this.state = {
      currentAsset: { "id": 0, "user": null, "asset": "", "assetType": "", "value": "" },
      assets: [],
      net_worth:0,
      asset_size:0
    }
  }

  // getAssets = async (e: any) => {

  //   e.preventDefault();

  //   const url = 'https://farsheedbankapi.azurewebsites.net/api/Bank';

  //   fetch(url, {
  //     method: 'GET'
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       let currentAsset = json[0]
  //       if (currentAsset=== undefined) {
  //         currentAsset = { "id": 0, "user": null, "asset": "", "assetType": "", "value": "" }
  //       }
  //       this.setState({
  //         currentAsset,
  //         assets: json
  //       })
  //     });
      
  // }

  getAssets = async (e: any) => {

    e.preventDefault();

    const api_call = await fetch('https://farsheedbankapi.azurewebsites.net/api/Bank');
    const data = await api_call.json();
    var net_worth = 0
    for(let i = 0; i < data.length; i++){
      net_worth += Number(data[i].value);
    }
    var msg = "Your net worth is" +  net_worth + "dollars.";
    console.log("net worth is "+net_worth);
    var speak = new SpeechSynthesisUtterance(msg);
    synth.speak(speak);


    this.setState({
      net_worth: net_worth as any,
      asset_size: data.length
    })
  }


  postAssets = async (e: any) => {

    e.preventDefault();

    const url = 'https://farsheedbankapi.azurewebsites.net/api/Bank'
    const asset = e.target.elements.asset.value;
    const assetType = e.target.elements.assetType.value;
    const value = e.target.elements.value.value;

    const toJSON = {
      id: 0,
      user: null,
      asset: asset,
      assetType: assetType,
      value: value
    }

    await fetch(url, {
      body: JSON.stringify(toJSON),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'

      },
      method: 'POST'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          this.getAssets(e);
          
          //location.reload()
        }
      })

    //this.getAssets(e);
  }

/*                                      unable to implement
  clearAssets= async (e: any) => {

    e.preventDefault();
    for (let i = 0; i < this.state.asset_size; i++) {
      const url = "https://farsheedbankapi.azurewebsites.net/api/Bank/" + i

      fetch(url, {
        method: 'DELETE'
      })
        .then((response: any) => {
          if (!response.ok) {
            // Error Response
            alert(response.statusText)
          }
          else {
            console.log("else")
          }
        })
    }
  }
*/

  public render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">contoso assets</h1>
          </header>
          <p className="App-intro">
            Enter the name of your asset and its value!
        </p>
        </div>
        <div id="centreText">
          <Inputs
            // @ts-ignore
            postAssets={this.postAssets} 
            />




      </div>
      <div className = "net-worth">
      Your net worth is: ${this.state.net_worth}
      </div>
      </div>
    );
  }
}

export default App;
