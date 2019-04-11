import React,{Component} from 'react';


class TrainingBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            gamesTotal: 0,
            gamesGuessed: 0,
            trainingStarted: false,
            games: []
        };
        this.startTraining = this.startTraining.bind(this);
    }
    startTraining() {
        const {trainingStarted} = this.state
        if(!trainingStarted) {

            let year = this.props.trainingYear;
            let country = this.props.trainingCountry;
            let league = this.props.trainingLeague;
            const http = new XMLHttpRequest();
            http.open('GET',`http://localhost:5000/trainingBox?year=${year}&country=${country}&league=${league}`);
            http.send();
            http.onreadystatechange = () => {
                console.log('ready state',http.readyState)
                if(http.readyState == 4) {
                    console.log('res',http.responseText)
                    this.setState({games: JSON.parse(http.responseText)})
                }
            }        
        }
    }
    render() {

        return(
            <div>
                <div>
                    <h2>Training Parameters are: {this.props.trainingCountry} {this.props.trainingLeague} {this.props.trainingYear}</h2>
                    <button className='standart' onClick={this.startTraining}>Start Training</button>
                </div>
                <div>
                    <ul>
                        {/* {this.state.games.map(game => 
                            <li>
                                <a href='#'>{
                                    Object.keys(game).map(d => <span>|{game[d]}|</span>)
                                    }</a>
                            </li>
                        )} */}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TrainingBox