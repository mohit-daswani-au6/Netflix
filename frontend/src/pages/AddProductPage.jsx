import React, { Component } from "react";
import { connect } from "react-redux";
import { addMovie } from "../redux/actions/adminAction";
import { withRouter, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
class AddProductPage extends Component {
  state = {
    response: false,
    MovieName: "",
    title: "",
    description: "",
    language: "",
    posterImage: "",
    backgroundImage: "",
    country: "",
    isReleased: false,
    isPaid: false,
    rating: "",
    releasedDate: "",
    movie: "",
    isAdult: false,
    runTime: "",
    Action: false,
    Adventure: false,
    Comedy: false,
    Drama: false,
    Horror: false,
    Thriller: false,
    status: "",
  };
  handleChange = async (e) => {
    if (e.target.type === "file") {
      await this.setState({ [e.target.name]: [...e.target.files][0] });
    } else if (e.target.type === "checkbox") {
      await this.setState({ [e.target.name]: e.target.checked });
    } else {
      await this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleSubmit = async () => {
    const genre = {
      Action: this.state.Action,
      Adventure: this.state.Adventure,
      Comedy: this.state.Comedy,
      Drama: this.state.Drama,
      Horror: this.state.Horror,
      Thriller: this.state.Thriller,
    };
    const fd = new FormData();
    fd.append("MovieName", this.state.MovieName);
    fd.append("title", this.state.title);
    fd.append("description", this.state.description);
    fd.append("language", this.state.language);
    fd.append("posterImage", this.state.posterImage);
    fd.append("backgroundImage", this.state.backgroundImage);
    fd.append("isReleased", this.state.isReleased);
    fd.append("releasedDate", this.state.releasedDate);
    fd.append("movie", this.state.movie);
    fd.append("country", this.state.country);
    fd.append("isAdult", this.state.isAdult);
    fd.append("isPaid", this.state.isPaid);
    fd.append("runTime", this.state.runTime);
    fd.append("rating", this.state.rating);
    fd.append("genre", await JSON.stringify(genre));
    console.log(fd, this.props.addMovie);

    const response = await this.props.addMovie(fd);
    console.log(response);
if(response){
  if(response.statusCode===201){
    this.setState({status:"uploaded"})
    setTimeout(() => {
      window.location.reload(false)
    }, 1000);
  }
}
  };

  render() {
    const style={
      background:"black",
      height:"70px"
    }
    const admin = localStorage.getItem("admin");
    return (
      <>
    {admin?
    <>
        <NavBar extrastyle={style} />

        {this.state.status!=="uploaded" ? (
          <div style={{ margin: "60px", color: "white" }}>
            <h2>Name</h2>
            <input 
              onChange={this.handleChange}
              value={this.state.MovieName}
              type="text"
              name="MovieName"
              // required
            />
            <h2>Title</h2>
            <input 
              onChange={this.handleChange}
              value={this.state.title}
              type="text"
              name="title"
              // required
            />
            <h2>description</h2>
            <textarea
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              // required
              rows="4"
              cols="50"
            ></textarea>
            <br />
            <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
              languages
            </label>
            <select
              onChange={this.handleChange}
              value={this.state.language}
              className="custom-select mr-sm-2"
              name="language"
              // required
              id="inlineFormCustomSelect"
            >
              <option defaultValue>Choose...</option>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="chhattisgarhi">Chhattisgarhi</option>
            </select>
            <h2>poster image</h2>
            <input style={{height:"25px"}}
              onChange={this.handleChange}
              // value={this.state.posterImage}
              type="file"
              // required
              // type="text"
              name="posterImage"
            />
            <h2>background image</h2>
            <input style={{height:"25px"}}
              onChange={this.handleChange}
              
              // value={this.state.posterImage}
              type="file"
              // required
              // type="text"
              name="backgroundImage"
            />
            <div>
              <input 
                onChange={this.handleChange}
                value={this.state.isReleased}
                type="checkbox"
                name="isReleased"
              />
              <label htmlFor="isReleased">isReleased</label>
            </div>
            <h2>movie</h2>
            <input style={{height:"25px"}}
              onChange={this.handleChange}
              // value={this.state.movie}
              type="file"
              // type="text"
              // required
              name="movie"
            />
            <h2>date</h2>
            <input 
              onChange={this.handleChange}
              value={this.state.releasedDate}
              type="date"
              id="start"
              // required
              name="releasedDate"
              min="2018-01-01"
              max="2021-12-31"
            />
            <div>
              <input 
                onChange={this.handleChange}
                value={this.state.isAdult}
                type="checkbox"
                name="isAdult"
              />
              <label htmlFor="isAdult">isAdult</label>
            </div>
            <div>
              <input 
                onChange={this.handleChange}
                value={this.state.isPaid}
                type="checkbox"
                name="isPaid"
              />
              <label htmlFor="isPaid">isPaid</label>
            </div>
            <h2>rating</h2>
            <input 
              onChange={this.handleChange}
              value={this.state.rating}
              type="number"
              // required
              name="rating"
              // required
            />
            <h2>runTime</h2>
            <input 
              onChange={this.handleChange}
              value={this.state.runTime}
              type="number"
              name="runTime"
              // required
            />
            <h2>country</h2>
            <input 
              onChange={this.handleChange}
              value={this.state.country}
              type="text"
              name="country"
              // required
            />
            <br />
            <div style={{ display: "flex" }}>
              <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
                genre
              </label>
              <div>
                <input 
                  onChange={this.handleChange}
                  value={this.state.Action}
                  type="checkbox"
                  name="Action"
                />
                <label htmlFor="Action">Action</label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange}
                  value={this.state.Adventure}
                  type="checkbox"
                  name="Adventure"
                />
                <label htmlFor="Adventure">Adventure</label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange}
                  value={this.state.Comedy}
                  type="checkbox"
                  name="Comedy"
                />
                <label htmlFor="Comedy">Comedy</label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange}
                  value={this.state.Drama}
                  type="checkbox"
                  name="Drama"
                />
                <label htmlFor="Drama">Drama</label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange}
                  value={this.state.Horror}
                  type="checkbox"
                  name="Horror"
                />
                <label htmlFor="Horror">Horror</label>
              </div>
              <div>
                <input 
                  onChange={this.handleChange}
                  value={this.state.Thriller}
                  type="checkbox"
                  name="Thriller"
                />
                <label htmlFor="Thriller">Thriller</label>
              </div>
            </div>
            <input  type="submit" onClick={this.handleSubmit} value="submit" />
          </div>):<h1>uploaded...</h1>}
</>
        : (
          <Redirect to="/admin/login" />
        )}
      </>
    );
  }
}

export default connect(null, { addMovie })(withRouter(AddProductPage));
