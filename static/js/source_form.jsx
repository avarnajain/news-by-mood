"use-strict";

class SourceForm extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSourceSelection = this.handleSourceSelection.bind(this)
    }

    //this executes when the page is loaded
    componentDidMount() {
        this.getSources();
    }

    handleSourceSelection(evt) {
        const selected_source = evt.target.value;
        console.log('handleSourceSelection(), value:', selected_source)

        this.setState({
            ['selected_source']: selected_source
        });
    }

    handleSubmit(evt){
 
        //prevents from posting with flask request
        evt.preventDefault();
        console.log('handleSubmit()', this.props.post_url)
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_source: this.state.selected_source
            })
        })
        .then(() => {
            window.location.href=`/source-stats/${this.state.selected_source}`
        })
        ;
    }

    getSources() {

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

        const sources = this.state.data;
        const sourceList = sources.map((source) =>
            <option key={source.source.toString()} value={source.source}>{source.source}</option> 
        );
        return (
            <div>
                <form id='source-form' onSubmit={this.handleSubmit} method='POST'>
                    <label>{this.props.question} <br/>
                        <select value='source' onChange={this.handleSourceSelection}>
                            {sourceList}
                        </select> <br/>
                    </label>
                    <input type="submit" value="Submit"/> <br/>
                </form>
            </div>
        )
    };
}
