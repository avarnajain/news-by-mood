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
        console.log('handleSubmit()', this.props.post_url)
        fetch(this.props.post_url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            },
            body: JSON.stringify({
                selected_tone: this.state.selected_tone
            })
        })
        .then(() => {
            window.location.href=this.props.redirect
        })
        ;
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
            <option key={tone.tone_id.toString()} value={tone.tone_id}>{tone.tone_name}</option> 
        );
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1> {this.props.header} </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form id='tone-form' onSubmit={this.handleSubmit} method='POST'>
                            <label>
                                <select value='source' onChange={this.handleToneSelection}>
                                    {toneList}
                                </select> <br/>
                            </label>
                            <div className="row">
                                <div className="col">
                                    <input type="submit" value="Submit"/> <br/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}
export default ToneForm;


// render() {

//     const tones = this.state.data;
//     const toneList = tones.map((tone) =>
//         <div key={tone.tone_id.toString()}>
//             <label>   
//                 <input type="radio" name="emotion" value={tone.tone_id} 
//                     checked={this.state.emotion} onChange={this.handleToneSelection}/> {tone.tone_name}
//             </label> <br/>
//         </div>
//     );
//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-8">
//                     <h1> {this.props.header} </h1>
//                 </div>
//             </div>
//             <div className="row">
//                 <div className="col-8">
//                     <form id='tone-form' onSubmit={this.handleSubmit} method='POST'>
//                             {toneList}
//                         <div className="row">
//                             <div className="col-8">
//                                 <input type="submit" /> <br/>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// };