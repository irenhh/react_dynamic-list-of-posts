import React from 'react';
import PropTypes from 'prop-types';

function PostComment(props) {
  return (
    <div className="user-post__comment">
      <p className="comment-name">{props.commentItem.name}</p>
      <p className="comment-email">{props.commentItem.email}</p>
      <p className="comment-text">{props.commentItem.body}</p>
    </div>
  );
}

PostComment.propTypes = {
  commentItem: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default PostComment;
