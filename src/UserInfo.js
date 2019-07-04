import React from 'react';
import PropTypes from 'prop-types';

function UserInfo(props) {
  const {
    suite,
    street,
    city,
    zipcode,
    geo,
  } = props.user.address;

  return (
    <div className="app-card_item">
      <div className="user-info">
        <h1 className="user-info__name">
          {props.user.name}
        </h1>

        <div className="user-info__contact-info">
          <p>{props.user.email}</p>

          <p className="contact-info__address">
            {`
              ${suite}
              ${street}
              ${city}
              ${zipcode}

              (${geo.lat}, ${geo.lng})
            `}
          </p>
        </div>
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }).isRequired,
};

export default UserInfo;
