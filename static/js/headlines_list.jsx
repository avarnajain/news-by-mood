"use-strict";

class News extends React.Component {
    
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
        this.getNews();
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

    render() {

        const news = this.state.data;
        const newsList = news.map((article) =>
            <div key={article.article_id.toString()}>
                <h4>
                    <a href={article.url}>{article.title}</a>
                </h4>
                <li>Source: {article.source} </li>
                <li>Published: {article.published}</li>
                <li>Tone: {article.selected_tone_id} </li>
                <li>Score: {article.selected_score} </li>
            </div>
        );
        return (
            <div>
                {newsList}
            </div>
        )
    };
}
