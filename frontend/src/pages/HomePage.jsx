import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../redux/actions/postsAction";
import PostCard from "../components/PostCard";
import { CardDeck } from "reactstrap";
class HomePage extends Component {
  componentDidMount() {
    this.props.getPost();

  }

  render() {
    return this.props.posts ? (
      <CardDeck>{this.props.posts.map(p=>(
          <PostCard key={p.id} post={p}/>
      ))}
      </CardDeck>
    ) : (
      <h1>Loading</h1>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.postState.posts,
});
export default connect(mapStateToProps, { getPost })(HomePage);