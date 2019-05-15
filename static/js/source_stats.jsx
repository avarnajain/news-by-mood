"use-strict";

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
        const filter_ = this.props.filter_by
        const statsList = Object.keys(stats).map(key => {
            if (stats[key]['filter'] == filter_ && filter_ != 'None' && filter_ != 'total') {
                const dict = stats[key]['data']
                return Object.keys(dict).map(tone => {
                    return <li key={tone}> {tone.charAt(0).toUpperCase() + tone.slice(1)}: {dict[tone].length}</li>
                })
            }
            if (filter_ == 'None' && stats[key]['filter'] == 'None') {
                return (
                    <div key='None'>
                        <h4> Number of articles with <i>no dominant tones</i> detected: {stats[key]['data']['None'].length} </h4>
                    </div>
                )
            }
            if (filter_ == 'total' && stats[key]['filter'] == 'total') {
                return (
                    <div key='total'>
                        <h4> Total number of articles for source: {stats[key]['data']['total']} </h4>
                    </div>
                )
            }
            if (filter_ == 'source_name' && key == 0) {
                return (
                    <div key='source'>
                        <h1> {stats[key]['source']} </h1>
                        <h2> Tone Profile </h2>
                    </div>
                )
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

