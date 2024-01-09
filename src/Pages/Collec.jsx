import React from 'react';
import styled from 'styled-components';

function Collec() {
     // Placeholder URLs for demonstration purposes
  const images = [
    'https://via.placeholder.com/600x400',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
    'https://via.placeholder.com/300x200',
  ];

  return (
    <ImageCardContainer>
      {/* Largest image at the top */}
      <LargestImage src={images[0]} alt="Largest" />

      {/* Container for the three smaller images */}
      <SmallImagesContainer>
        {/* Three smaller images */}
        {images.slice(1).map((imageUrl, index) => (
          <SmallImage key={index} src={imageUrl} alt={`Image ${index + 1}`} />
        ))}
      </SmallImagesContainer>
    </ImageCardContainer>
  );
};

const ImageCardContainer = styled.div`
  width: 400px; /* Set the width according to your design */
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
`;

const LargestImage = styled.img`
  width: 100%;
  height: auto;
`;

const SmallImagesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SmallImage = styled.img`
  width: 33.33%; /* Each small image takes up one-third of the container */
  height: auto;
  max-height: 150px;
  border-top: 5px solid red;
`;
export default Collec