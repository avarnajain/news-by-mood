"use-strict";

class TopNews extends React.Component {
    
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
        this.getTopNews();
    }
    
    getTopNews() {
        console.log('getTopNews()')
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
        const statsList = Object.keys(stats).map(key => {
            const dict = stats[key]
            return (
                <div> 
                    <div className="row">
                        <div className="col-12">
                            <h4><a href={dict['url']}>{dict['title']}</a></h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <img src={dict['image_url']} alt="img" className="img-thumbnail"/>
                        </div>
                        <div className="col-6">
                            <h3>{dict['selected_tone_id'].charAt(0).toUpperCase() + dict['selected_tone_id'].slice(1)}</h3>
                            <h5>Score: {dict['selected_score']}</h5>
                            <h5>Source: <a href={`/get-chosen-source/${dict['source']}`}>{dict['source']}</a></h5>
                            <h5>Published: {dict['published']}</h5>
                        </div>
                    </div>
                    <br/>
                </div>

            )
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {statsList}
                    </div>
                </div>
            </div>
        )
    };
}

export default TopNews;
