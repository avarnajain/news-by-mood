"use-strict";
import "../css/source_stats.css";
import '../css/pie.css';
import PieChart from './piechart.jsx';

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
                // console.log('dict', dict);
                return dict && (
                    <PieChart data={dict} 
                            heading={this.props.heading}
                            post_url='/get-source-news'
                    />
                )
            }
            if (filter_ == 'None' && stats[key]['filter'] == 'None') {
                return (
                    <div key='None'> <br/>
                        <p> Number of articles with <b><i>no dominant tones</i></b> detected: {stats[key]['data']['None'].length} </p>
                    </div>
                )
            }
            if (filter_ == 'total' && stats[key]['filter'] == 'total') {
                return (
                    <div key='total'>
                        <p> Total number of articles for source: {stats[key]['data']['total']} </p>
                    </div>
                )
            }
            if (filter_ == 'source_name' && key == 0) {
                return (
                    <div key='source'>
                        <h1> <b>{stats[key]['source']}</b> </h1> <br/>
                    </div>
                )
            }
        });  
        return (
            <div className="stats">
                <div> {statsList} </div>
            </div>
        )
    };
}

export default Stats;
