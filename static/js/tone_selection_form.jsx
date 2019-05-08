"use-strict";

class ToneForm extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: null};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleToneSelection = this.handleToneSelection.bind(this)
    }

    //this executes when the page is loaded
    componentDidMount() {
        this.getTones();
    }

    handleToneSelection(evt) {
        this.setState({selected_tone: evt.target.value});
        console.log(this.state.selected_tone)
    }

    handleSubmit(evt){
 
        //prevents from posting with flask request
        //evt.preventDefault();
        fetch(this.props.post_url, {
            method: 'GET',
            body: JSON.stringify({
                selected_tone: this.state.selected_tone
            }),
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        });
    }

    getTones() {
        console.log(this.props)
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
        return (
            this.state.data &&
            (
            <form id='emotion-form' onSubmit={this.handleSubmit} method='POST'>
                <div id='emotional_news'>
                    I want news that invokes the following emotion: <br/>
                    <input type="radio" name="emotion" value={this.state.data[0].tone_id} 
                        onClick={this.handleToneSelection}/> {this.state.data[0].tone_name} <br/>
                    <input type="submit" /> <br/>
                </div>
            </form>
        ))
    }
}

