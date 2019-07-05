import React from 'react';
import UserInfo from './UserInfo';
import UserPost from './UserPost';
import Filtering from './Filtering';
import { getPosts, getUsers, getComments } from './getData';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPosts: [],
      visiblePosts: [],
      isLoaded: false,
      isLoading: false,
      showComments: [],
    };
  }

  loadData = () => {
    this.setState({ isLoading: true });

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([posts, users, comments]) => {
        const preparedPosts = posts.map(post => (
          {
            ...post,
            user: users.find(user => user.id === post.userId),
            comments: comments.filter(comment => post.id === comment.postId),
          }
        ));

        this.setState({
          listOfPosts: preparedPosts,
          isLoaded: true,
          isLoading: false,
          visiblePosts: preparedPosts,
          showComments: Array(preparedPosts.length).fill(false),
        });
      });
  }

  showCommentClick = (index) => {
    this.setState((prevState) => {
      const newIndexes = [...prevState.showComments];
      newIndexes[index] = !newIndexes[index];
      return { showComments: newIndexes };
    });
  }

  filterBy = (event) => {
    let updatedList = this.state.listOfPosts;
    updatedList = updatedList.filter((item) => {
      const postData = item.title + item.body;
      return postData.toLowerCase().search(
        event.target.value.toLowerCase()
      ) !== -1;
    });
    this.setState({ visiblePosts: updatedList });
  }

  render() {
    return (
      <div className="container">
        { !this.state.isLoaded && (
          <button
            onClick={this.loadData}
            type="button"
            disabled={this.state.isLoading}
            className="load-button"
          >
            {this.state.isLoading ? 'Loading...' : 'LOAD'}
          </button>
        )}
        { this.state.isLoaded && (
          <Filtering
            isLoaded={this.state.isLoaded}
            filterBy={this.filterBy}
          />
        )}

        {this.state.visiblePosts.map((post, i) => (
          <div
            className="post-item"
            key={post.id}
          >
            <UserInfo
              key={post.user.id}
              user={post.user}
            />

            <div className="user-post">
              <UserPost
                post={post}
                showComments={this.state.showComments[i]}
                onClick={this.showCommentClick}
                postIndex={i}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PostList;
