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
                <h2> Tone Profile </h2>
            </div>
        )
    }
}

class Total extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    componentDidMount() {
        this.getTotal();
    }
    getTotal() {
        console.log('getTotal()');
        fetch(this.props.fetch_url)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
        });
    }
    render() {
        const total = this.state.data;
        console.log('total', total)
        return (
            <div>
                <h4>{this.props.heading}: {total}</h4>
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
        // let fetchUrl = '/all.json?filter=' + this.props.filterVal;

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
        // debugger;
        console.log('this.state.data', this.state.data)
        const statsList = Object.keys(stats).map(key => {
            if (key != 'total') {
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

