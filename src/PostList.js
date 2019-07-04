import React from 'react';
import UserInfo from './UserInfo';
import UserPost from './UserPost';
import Filtering from './Filtering';

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfPosts: [],
      visibleList: [],
      buttonDisabled: false,
      isLoaded: false,
      text: 'LOAD',
      showComments: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.filterBy = this.filterBy.bind(this);
    this.showCommentClick = this.showCommentClick.bind(this);
  }

  showCommentClick(index) {
    this.setState((prevState) => {
      const newIndexes = [...prevState.showComments];
      newIndexes[index] = !newIndexes[index];
      return { showComments: newIndexes };
    });
  }

  filterBy(event) {
    let updatedList = this.state.listOfPosts;
    updatedList = updatedList.filter((item) => {
      const postData = item.title + item.body;
      return postData.toLowerCase().search(
        event.target.value.toLowerCase()
      ) !== -1;
    });
    this.setState({ visibleList: updatedList });
  }

  handleClick() {
    this.setState({ buttonDisabled: true, text: 'Loading...' });
    const postsApi = fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json());
    const usersApi = fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json());
    const commentsApi = fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json());

    Promise.all([postsApi, usersApi, commentsApi])
      .then((finalVals) => {
        const posts = finalVals[0];
        const users = finalVals[1];
        const comments = finalVals[2];
        this.setState({
          listOfPosts: posts.map(post => (
            {
              ...post,
              user: users.find(user => user.id === post.userId),
              comments: comments.filter(comment => post.id === comment.postId),
            }
          )),
          isLoaded: true,
        });
      })
      .then(() => {
        this.setState({
          visibleList: [...this.state.listOfPosts],
          showComments: Array(this.state.listOfPosts.length).fill(false),
        });
      });
  }

  render() {
    return (
      <div className="container">
        { !this.state.isLoaded && (
          <button
            onClick={this.handleClick}
            type="button"
            disabled={this.state.buttonDisabled}
            className="load-button"
          >
            {this.state.text}
          </button>
        )}

        <Filtering
          isLoaded={this.state.isLoaded}
          filterBy={this.filterBy}
        />

        {this.state.visibleList.map((post, i) => (
          <div className="post-item">
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
