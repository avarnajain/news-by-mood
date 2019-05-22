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
        // this.getTone();
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
    // getTone() {
    //     console.log('getTone()')
    //     //.then() handles the response from the ajax call
    //     fetch(this.props.fetch_tone)
    //     //tells it to handle response like a json object
    //     .then(response => response.json())
    //     //
    //     .then(tone => {
    //         //console.log(data);
    //         this.setState({
    //             tone: tone
    //         })
    //     });
    // }
    render() {

        const news = this.state.data;
        // const tone = this.state.tone;
        // console.log(tone);
        const newsList = news.map((article) => 
            <div key={article.article_id.toString()}>
                <div className="row">
                    <div className="col-12">
                        <h4>
                            <a href={article.url}>{article.title}</a>
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <img src={article.image_url} alt="img" className="img-thumbnail"/>
                    </div>
                    <div className="col-6">
                        <h5>
                            <b>
                                {article.filter_id.charAt(0).toUpperCase() + article.filter_id.slice(1) + ' '}
                            </b>
                             index: {article.filter_score} 
                        </h5>
                        <h5>Source: <a href={`/get-chosen-source/${article.source}`}>{article.source}</a></h5>
                        <h5>Published: {article.published}</h5>
                        
                    </div>
                </div>
                <br/>
            </div>
        );
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {newsList}
                    </div>
                </div>
            </div>
        )
    };
}

export default News;
