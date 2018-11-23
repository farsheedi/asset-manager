import * as React from 'react';
import '../App.css';

interface IProps {
    postAssets: any,
    //clearAssets: any
}

export default class Inputs extends React.Component<IProps> {



    public render() {
        return (
            <div>
                <form onSubmit={this.props.postAssets}>
                    <input type="text" name="asset" placeholder="Asset..." />
                    <div className="paddingContainer">
                        <select name="assetType" className="styled-select slate">
                            <option value="vehicle">Vehicle</option>
                            <option value="property">Property</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <input type="text" name="value" placeholder="Value..." />
                    <div>
                        <div id="buttons">
                            <button id="addBtn" >add</button>
                        </div>
                        <div id="buttons">
                        <button name="clear" id="clearBtn" >clear</button>
                    </div>
                    </div>
                </form>
                {/* <form onSubmit={this.props.clearAssets}> */}
                   
                {/* </form> */}
            </div>

        );
    }
}
