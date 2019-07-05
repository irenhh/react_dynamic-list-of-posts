import React from 'react';
import PropTypes from 'prop-types';

function PostBody(props) {
  return (
    <div className="user-post__body">
      <h2 className="user-post__body-title">{props.postItem.title}</h2>
      <p className="user-post__body-text">{props.postItem.body}</p>
      <hr className="user-post__line-break" />
    </div>
  );
}

PostBody.propTypes = {
  postItem: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default PostBody;
