import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { addMovie } from "../redux/actions/adminAction";
import fileExtension from "file-extension";
class AdminPage extends Component {
  state = {
    MovieName: "",
    title: "",
    description: "",
    language: "",
    posterImage: "",
    isReleased: false,
    releasedDate: "",
    video: "",
    isAdult: false,
    runTime: "",
    Action: false,
    Adventure: false,
    Comedy: false,
    Drama: false,
    Horror: false,
    Thriller: false,
  };
  handleChange = async (e) => {
    if (e.target.type === "file") {

      const obj = {
        name: e.target.files[0].name,
        type: e.target.files[0].type,
        size: e.target.files[0].size,
        purpose: e.target.name,
        body: e.target.files[0],
        extension: fileExtension(e.target.files[0].name),
      };
      await this.setState({ [e.target.name]: [...e.target.files][0] });
    } else if (e.target.type === "checkbox") {
      await this.setState({ [e.target.name]: e.target.checked });
    } else {
      await this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleSubmit = async () => {
    const genre= {
      Action: this.state.Action,
      Adventure: this.state.Adventure,
      Comedy: this.state.Comedy,
      Drama: this.state.Drama,
      Horror: this.state.Horror,
      Thriller: this.state.Thriller,
    }
    const fd = new FormData()
    fd.append("MovieName",this.state.MovieName)
    fd.append("title",this.state.title)
    fd.append("description",this.state.description)
    fd.append("language",this.state.language)
    fd.append("posterImage",this.state.posterImage)
    fd.append("isReleased",this.state.isReleased)
    fd.append("releasedDate",this.state.releasedDate)
    fd.append("video",this.state.video)
    fd.append("isAdult",this.state.isAdult)
    fd.append("runTime",this.state.runTime)
    fd.append("runTime",this.state.runTime)
    fd.append("genre",genre)
   
    // const obj = {
    //   MovieName: this.state.MovieName,
    //   title: this.state.title,
    //   description: this.state.description,
    //   language: this.state.language,
    //   posterImage: this.state.posterImage,
    //   isReleased: this.state.isReleased,
    //   releasedDate: this.state.releasedDate,
    //   video: this.state.video,
    //   isAdult: this.state.isAdult,
    //   runTime: this.state.runTime,
    //   genre: {
    //     Action: this.state.Action,
    //     Adventure: this.state.Adventure,
    //     Comedy: this.state.Comedy,
    //     Drama: this.state.Drama,
    //     Horror: this.state.Horror,
    //     Thriller: this.state.Thriller,
    //   },
    // };
    console.log(fd);
    const response = await this.props.addMovie(fd);
    console.log(response);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">
        <h2>Name</h2>
        <input
          onChange={this.handleChange}
          value={this.state.MovieName}
          type="text"
          name="MovieName"
          //   required
        />
        <h2>Title</h2>
        <input
          onChange={this.handleChange}
          value={this.state.title}
          type="text"
          name="title"
          //   required
        />
        <h2>description</h2>
        <textarea
          onChange={this.handleChange}
          value={this.state.description}
          name="description"
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
          id="inlineFormCustomSelect"
        >
          <option defaultValue>Choose...</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="chhattisgarhi">Chhattisgarhi</option>
        </select>
        <h2>image</h2>
        <input
          onChange={this.handleChange}
          //   value={this.state.posterImage}
          type="file"
          name="posterImage"
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
        <h2>video</h2>
        <input
          onChange={this.handleChange}
          //   value={this.state.video}
          type="file"
          name="video"
        />
        <h2>date</h2>
        <input
          onChange={this.handleChange}
          value={this.state.releasedDate}
          type="date"
          id="start"
          name="releasedDate"
          min="2018-01-01"
          max="2018-12-31"
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
        <h2>runTime</h2>
        <input
          onChange={this.handleChange}
          value={this.state.runTime}
          type="number"
          name="runTime"
          //   required
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
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default connect(null, { addMovie })(AdminPage);
