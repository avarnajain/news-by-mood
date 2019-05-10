"use-strict";

class ToneForm extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleToneSelection = this.handleToneSelection.bind(this)
    }

    //this executes when the page is loaded
    componentDidMount() {
        this.getTones();
    }

    handleToneSelection(evt) {
        // this.setState({selected_tone: evt.target.value});

        const selected_tone = event.target.value;
        console.log('handleToneSelection() value:', selected_tone)

        this.setState({
            ['selected_tone']: selected_tone
        });
    }

    handleSubmit(evt){
 
        //prevents from posting with flask request
        evt.preventDefault();
        console.log('handleSubmit()')
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_tone: this.state.selected_tone
            })
        });
    }

    getTones() {

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

        const tones = this.state.data;
        const toneList = tones.map((tone) =>
            <div>
                <label> 
                    <input type="radio" name="emotion" value={tone.tone_id} 
                        checked={this.state.emotion} onChange={this.handleToneSelection}/>
                    {tone.tone_name}
                </label> <br/>
            </div>
        );
        return (
            <div>
                <form id='tone-form' onSubmit={this.handleSubmit} method='POST'>
                    <label>{this.props.question}
                        {toneList}
                    </label>
                    <input type="submit" /> <br/>
                </form>
            </div>
        )
    };
}
