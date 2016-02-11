import React, { Component } from 'react';
import './Photo.scss';
import { Motion, spring } from 'react-motion';
import IMAGE from './images';

const springSettings = {
  stiffness: 170,
  damping: 26,
};
class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = { // :off
      photos: [[500, 350], [800, 600], [800, 400], [700, 500], [200, 650], [600, 600]],  // :on
      currentPhoto: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { photos, currentPhoto } = this.state;
    const [currentWidth, currentHeight] = photos[currentPhoto];

    const widths = photos.map(([originalWidth, originalHeight]) => (currentHeight / originalHeight * originalWidth));

    const leftStartCoords = widths.slice(0, currentPhoto)
                                  .reduce((sum, width) => sum - width, 0);

    const configs = [];
    photos.reduce((prevLeft, [originalWidth, originalHeight], index) => {
      configs.push({
        left: spring(prevLeft, springSettings),
        height: spring(currentHeight, springSettings),
        width: spring(widths[index], springSettings),
      });
      return prevLeft + widths[index];
    }, leftStartCoords);

    return (
      <div>
        <div>Scroll Me</div>
        <input
          type="range"
          min={0}
          max={photos.length - 1}
          value={currentPhoto}
          onChange={this.handleChange}
        />
        <div className="Photo">
          <Motion style={{ height: spring(currentHeight), width: spring(currentWidth) }}>
            {container => (
              <div
                className="Photo-inner"
                style={container}
              >
                {configs.map((style, index) => (
                  <Motion
                    key={index}
                    style={style}
                  >
                    {imgStyle => (
                      <img
                        src={IMAGE[index]}
                        className="Photo-photo"
                        style={imgStyle}
                      />
                    )}
                  </Motion>
                ))}

              </div>
            )}
          </Motion>

        </div>

      </div>
    );
  }

  handleChange({ target: { value } }) {
    this.setState({ currentPhoto: value });
  }

}

export default Photo;
