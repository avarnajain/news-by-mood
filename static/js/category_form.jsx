"use-strict";

class CategoryForm extends React.Component {
    
    //import state property from React Component class, 
    //set state as empty
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCategorySelection = this.handleCategorySelection.bind(this)
    }

    //this executes when the page is loaded
    componentDidMount() {
        this.getCategories();
    }

    handleCategorySelection(evt) {
        // this.setState({selected_tone: evt.target.value});

        const selected_category = event.target.value;
        console.log('handleCategorySelection() value:', selected_category)

        this.setState({
            ['selected_category']: selected_category
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
                selected_category: this.state.selected_category
            })
        })
        .then(() => {
            window.location.href=this.props.redirect
        })
        ;
    }

    getCategories() {

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

        const categories = this.state.data;
        const categoryList = categories.map((category) => 
            <option key={category.category_id.toString()} value={category.category_id}>{category.category_id}</option>   
        );
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <form id='category-form' onSubmit={this.handleSubmit} method='POST'>
                            <label>
                                <select onChange={this.handleCategorySelection}>
                                    {categoryList}
                                </select> <br/>
                            </label>
                            <div className="row">
                                <div className="col-8">
                                    <input type="submit" value="Submit"/><br/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}
export default CategoryForm;
