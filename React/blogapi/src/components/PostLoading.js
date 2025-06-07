import React from 'react';

const PostLoading = (Component) => {
  const PostLoadingComponent = ({ isLoading, ...props }) => {
    if (isLoading) {
      return (
        <p style={{ fontSize: '1.5rem', textAlign: 'center', marginTop: '2rem' }}>
          We are waiting for the data to load...
        </p>
      );
    }
    return <Component {...props} />;
  };

  return PostLoadingComponent;
};

export default PostLoading;
