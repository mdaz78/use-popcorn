import React, { useState } from 'react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

/**
 * StarRating Component
 *
 * A reusable star rating component that allows users to rate items by clicking on stars.
 * Supports hover preview, custom messages, and customizable styling.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.color='#fcc419'] - Color of the stars and text
 * @param {number} [props.maxRating=5] - Maximum number of stars to display
 * @param {string|number} [props.size='48'] - Size of each star in pixels
 * @param {string} [props.className=''] - Additional CSS class names to apply to the container
 * @param {string[]} [props.messages=[]] - Array of messages to display for each rating.
 *   If the array length equals maxRating, messages will be shown instead of the numeric rating.
 *   Messages are indexed by rating (messages[0] for 1 star, messages[1] for 2 stars, etc.)
 * @param {number} [props.defaultRating=0] - Initial rating value (0 means no stars selected)
 * @param {Function} [props.onSetRating=() => {}] - Callback function called when a rating is set.
 *   Receives the selected rating value (1 to maxRating) as an argument
 * @returns {JSX.Element} The StarRating component
 *
 * @example
 * // Basic usage
 * <StarRating />
 *
 * @example
 * // With custom props and messages
 * <StarRating
 *   maxRating={10}
 *   color="#ff6b6b"
 *   size={24}
 *   defaultRating={3}
 *   messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
 *   onSetRating={(rating) => console.log('Rated:', rating)}
 * />
 */
const StarRating = ({
  color = '#fcc419',
  maxRating = 5,
  size = '48',
  className = '',
  messages = [],
  defaultRating = 0,
  onSetRating = () => {},
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onSetRating(value);
  };

  const handleMouseEnter = (value) => {
    setTempRating(value);
  };
  const handleMouseLeave = (value) => {
    setTempRating(value);
  };

  const textStyle = {
    fontSize: `${size / 1.5}px`,
    color,
    lineHeight: '1',
    margin: '0',
  };

  const isFull = (i) => (tempRating ? tempRating >= i + 1 : rating >= i + 1);
  const currentRating = tempRating || rating || '';
  const text =
    messages.length === maxRating && currentRating
      ? messages[currentRating - 1]
      : currentRating || '';

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={isFull(i)}
            color={color}
            size={size}
            onRate={() => handleClick(i + 1)}
            onHoverIn={() => {
              handleMouseEnter(i + 1);
            }}
            onHoverOut={() => {
              handleMouseLeave(0);
            }}
          />
        ))}
      </div>
      <p style={textStyle}>{text}</p>
    </div>
  );
};

/**
 * Star Component
 *
 * Individual star element that can be filled or empty.
 * Handles click and hover interactions for rating functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.full - Whether the star should be filled (true) or empty (false)
 * @param {string} props.color - Color of the star
 * @param {string|number} props.size - Size of the star in pixels
 * @param {Function} props.onRate - Callback function called when the star is clicked
 * @param {Function} props.onHoverIn - Callback function called when mouse enters the star
 * @param {Function} props.onHoverOut - Callback function called when mouse leaves the star
 * @returns {JSX.Element} The Star component
 */
const Star = ({ full, color, size, onRate, onHoverIn, onHoverOut }) => {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: 'pointer',
  };

  return (
    <span
      role='button'
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={color}
          stroke={color}
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke={color}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  );
};

export default StarRating;
