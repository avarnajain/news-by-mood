"use-strict";

class News extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: [], tone:[]};
        // this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleToneSelection = this.handleToneSelection.bind(this)
    }

    //this executes when the page is loaded
    componentDidMount() {
        this.getNews();
        this.getTone();
    }
    
    getNews() {
        console.log('getNews()')
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
    getTone() {
        console.log('getTone()')
        //.then() handles the response from the ajax call
        fetch(this.props.fetch_tone)
        //tells it to handle response like a json object
        .then(response => response.json())
        //
        .then(tone => {
            //console.log(data);
            this.setState({
                tone: tone
            })
        });
    }
    render() {

        const news = this.state.data;
        const tone = this.state.tone;
        const newsList = news.map((article) => 
            <div key={article.article_id.toString()}>
                <div class="row">
                    <div class="col-12">
                        <p>
                            <a href={article.url}>{article.title}</a>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <img src={article.image_url} alt="img" class="img-thumbnail"/>
                    </div>
                    <div class="col-6">
                        <li>Source: <a href={`/get-chosen-source/${article.source}`}>{article.source}</a></li>
                        <li>Published: {article.published}</li>
                        <li>Tone: {article.selected_tone_id} </li>
                        <li>Score: {article.selected_score} </li>
                    </div>
                </div>
                <br/>
            </div>
        );
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <h1> {tone} </h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        {newsList}
                    </div>
                </div>
            </div>
        )
    };
}
