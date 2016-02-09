import React, { Component } from 'react';
import Photo from '../components/Photo';

class Page extends Component {

  render() {
    return (
      <div>
        <h1>Photo Gallery</h1>

        <Photo />
      </div>
    );
  }

}

export default Page;
