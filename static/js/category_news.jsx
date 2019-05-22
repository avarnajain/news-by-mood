"use-strict";

class CatNews extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
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

    render() {
        const news = this.state.data;
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
                            {article.all_scores}
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

export default CatNews;
