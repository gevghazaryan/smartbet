import React from 'react';
import TrainingBox from './TrainingBox';

class Training extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleLeagueClick = this.handleLeagueClick.bind(this);        
        this.handleYearClick = this.handleYearClick.bind(this);        
        this.startTraining = this.startTraining.bind(this);        
        this.state = {
            trainingCountry: '',
            trainingLeague: '',
            years: [],
            trainingCountryLeagues: [],
            trainingYear: '',
        };

    }
    componentDidMount() {
        this.setState({years: new Array(9).fill(2010).map((item,index) => item + index)})
    }
    startTraining() {

    }    
    handleClick(event,value) {
        event.preventDefault();
        console.log(value)
        const http = new XMLHttpRequest();
        http.open('GET',`http://localhost:5000/training?data=${value}`);
        http.send();
        http.onreadystatechange = () => {
            console.log('ready state',http.readyState)
            if(http.readyState == 4) {
                console.log('res',http.responseText)
                this.setState({trainingCountryLeagues: JSON.parse(http.responseText),trainingCountry: value})
            }
        }
    }
    handleLeagueClick(event,value) {
        event.preventDefault();
        this.setState({trainingLeague: value})
    }
    handleYearClick(even,value) {
        even.preventDefault();
        this.setState({trainingYear: value})        
    }
    render() {
        return(
            <div>
                <button onClick={this.props.goHomePage}>Back</button>
                <ul className='horizontal'>
                    {this.props.countries.map(item => 
                        <li key={item}>
                            <a href='#' onClick={(event) => this.handleClick(event,item)}>{item}</a>
                        </li>)
                    }
                </ul>
                {this.state.trainingCountry !== ''
                ?   (<div>
                        <ul className='horizontal'>
                            {this.state.trainingCountryLeagues.map(item =>
                                <li key={item}>
                                     <a href='#' onClick={(event) => this.handleLeagueClick(event,item)}>{item}</a>
                                </li>
                            )}
                        </ul>
                        <ul className='horizontal'>
                            {this.state.years.map(item =>
                                <li key={item}>
                                     <a href='#' onClick={(event) => this.handleYearClick(event,item)}>{item}</a>
                                </li>)}
                        </ul>
                    </div>)
                    
                : (<p>Choose Parameters for training</p>)
                }
                {this.state.trainingCountry && this.state.trainingLeague && this.state.trainingYear &&
                    <TrainingBox
                        trainingCountry={this.state.trainingCountry}
                        trainingYear={this.state.trainingYear}
                        trainingLeague={this.state.trainingLeague}
                    />
                }

            </div>
            )
    }
}

export default Training