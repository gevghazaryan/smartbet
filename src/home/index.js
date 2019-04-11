import React from 'react';

import Training from '../training';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {countries: ['Hayastan'],mode: ''};
        this.handleClick = this.handleClick.bind(this);
        this.goHomePage = this.goHomePage.bind(this);
        this.getCountries = this.getCountries.bind(this);
    }
    componentDidMount() {
        this.getCountries()
    }
    handleClick(value) {
        if(value === 'yes') {
            this.setState({mode: 'training'})
        } else {
            this.setState({mode: ''})
        }
    }
    getCountries() {
        const http = new XMLHttpRequest();
        http.open('GET','http://localhost:5000/homePage?data=countries')
        http.send();
        http.onreadystatechange = () => {
            console.log('ready state',http.readyState)
            if(http.readyState == 4) {
                console.log('res',http.responseText)
                this.setState({countries: JSON.parse(http.responseText)})
            }
        }
    }
    goHomePage() {
        this.setState({mode: ''})
    }
    render() {
        return (
            <div>
                <nav>
                    <a className='logo'>Smartbet!!!</a>

                    <ul className='horizontal'>
                        {this.state.countries.map(item => <li key={item}><a href='#'>{item}</a></li>)}
                    </ul>
                </nav>
                {this.state.mode === ''
                ?   <p>Do you want to train?
                        <br />
                        <button onClick={() => this.handleClick('yes')}>Yes</button>
                        <button onClick={() => this.handleClick('no')}>No</button>
                    </p>
                :   <Training 
                        goHomePage={this.goHomePage}
                        countries={this.state.countries}
                    />
                }
            </div>
        )
    }
}




export default HomePage