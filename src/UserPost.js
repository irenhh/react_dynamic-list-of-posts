import React from 'react';
import PropTypes from 'prop-types';
import PostBody from './PostBody';
import PostComment from './PostComment';

function UserPost(props) {
  return (
    <div>
      <PostBody
        postItem={props.post}
      />

      <button
        type="button"
        className="user-post__body-comment-label"
        onClick={() => props.onClick(props.postIndex)}
      >
        Comments ⯆
      </button>

      {props.showComments && (
        props.post.comments.map(comment => (
          <PostComment
            commentItem={comment}
          />
        ))
      )}
    </div>
  );
}

UserPost.propTypes = {
  post: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  showComments: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  postIndex: PropTypes.number.isRequired,
};

export default UserPost;
