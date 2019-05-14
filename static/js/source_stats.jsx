"use-strict";
class Source extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    componentDidMount() {
        this.getSource();
    }
    getSource() {
        console.log('getSource()');
        fetch(this.props.fetch_url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
        });
    }
    render() {
        const source = this.state.data;
        return (
            <div>
                <h1> {source} </h1>
            </div>
        )
    }
}

class Stats extends React.Component {
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleToneSelection = this.handleToneSelection.bind(this)
    }
    //this executes when the page is loaded
    componentDidMount() {
        this.getStats();
    }   
    getStats() {
        console.log('getStats()')
        //.then() handles the response from the ajax call
        fetch(this.props.fetch_url)
        //tells it to handle response like a json object
        .then(response => response.json())
        //
        .then(data => {
            //console.log(data);
            this.setState({
                data: data
            })
        });
    }
    render() {
        const stats = this.state.data;
        console.log('this.state.data', this.state.data)
        const total = stats['total'];

        const statsList = Object.keys(stats).map(key => {
            console.log('Key', {key});
            if ({key} === "total") { 
                console.log('INSIDE TOTAL', {key});
                return <li key={key}> {key}: total </li>
            } else {
                return <li key={key}> {key}: {stats[key].length}</li>

            }
        });  

        return (
            <div>
            <h4> {this.props.heading} </h4>
                <div> {statsList} </div>
            </div>
        )
    };
}
