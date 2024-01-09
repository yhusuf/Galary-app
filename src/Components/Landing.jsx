import { useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { GoDownload } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Landing = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState([[], [], []]);
  const [downloading, setDownloading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?count=10&page=${page}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
      const newData = response.data.filter((item) => !columns.some(column => column.map(i => i.id).includes(item.id)));
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  }, [page]);

  useEffect(() => {
    const newColumns = [...columns];
    data.forEach((item, index) => {
      const columnIndex = index % 3;
      if (!newColumns[columnIndex].some(i => i.id === item.id)) {
        newColumns[columnIndex].push(item);
      }
    });
    setColumns(newColumns);
  },
  //eslint-disable-next-line
   [data]);

   const downloadImage = async (url, id) => {
    try {
      setDownloading(true);

      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `photo_${id}`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to clean up resources
      window.URL.revokeObjectURL(link.href);

      setDownloading(false);
    } catch (error) {
      console.error('Error downloading image:', error);
      setDownloading(false);
    }
  };


  return (
    <Body>
      <div>
        <Heading>
          Free Stock Photos
        </Heading>
      </div>
    <InfiniteScroll
      dataLength={data.length}
      next={() => setPage((prevPage) => prevPage + 1)}
      hasMore={true}
      loader={<LoadingPlaceholder key="loading">Loading...</LoadingPlaceholder>}
      style={{ overflow: 'hidden' }}
    >
      <RowContainer>
        {columns.map((column, columnIndex) => (
          <Column key={columnIndex}>
            {column.map((item) => (
              <ImageWrapper className='wrapper' key={item.id}>
                {/* Placeholder with dynamic aspect ratio */}
                <Placeholder aspectRatio={getAspectRatio(item.width, item.height)} />

                {/* Actual image with dynamic height */}
                <Image className='image'  src={item.urls.regular} alt="" />
                  <Dlfooter className="image-footer">
                <DownloadButton
                  onClick={() => downloadImage(item.urls.full, item.id)}
                  disabled={downloading}
                  >
                  <Con $loading={downloading}>
                    {downloading ? <AiOutlineLoading3Quarters style={{ fontSize: '30px', marginLeft: '5px' }} /> : <Con> Download <GoDownload style={{ fontSize: '30px', marginLeft: '5px' }} /></Con> }
                  </Con>
              </DownloadButton>
                  </Dlfooter>
              </ImageWrapper>
            ))}
          </Column>
        ))}
      </RowContainer>
    </InfiniteScroll>
    </Body>
  );
};
const Body =styled.div`
  *{
    padding-left: 5px;
    padding-right: 5px;
  }
`
const Heading = styled.h1`
  font-size: 39px;
  font-family: 'Noto Sans', sans-serif;
  padding: 30px;
  font-weight: 400;
`

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px; 
  justify-content: center;
  @media (max-width: 900px) {
    margin: 0px -35px;
  }
`;

const Column = styled.div`
  justify-content: center;
  align-items: center;
  flex: 0 0 calc(33.3333% - 20px); 
  margin: 0 5px; 
  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 20px);
    margin: 0px 0px;
  }

`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 20px; 
  overflow: hidden;
  cursor: pointer;
  width:100%;

  @media (max-width: 900px) {
    margin-bottom: 9px;
  }

  &:hover .image-footer{
    bottom: 0px;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  padding-top: ${(props) => props.aspectRatio * 100}%; 
  background-color: #ccc; 
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
`;

const LoadingPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px; 
  border-radius: 4px;
  color: #666;
`;

const getAspectRatio = (width, height) => height / width;

const DownloadButton = styled.button`
  position: absolute;
  background-color: #00040f;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  color: #fff;
  border: none;
  padding: 18px;
  height: 50px;
  border-radius: 17px;
  cursor: pointer;
  transition: background-color 0.1s, border ease-in-out, transform 0.1s, box-shadow 5ms, border-color 0.25s;

  &:disabled {
    cursor: not-allowed;
  }

`;

const Dlfooter =styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  bottom: -100%;
  padding: 1rem 0.5rem;
  transition: box-shadow 5ms;
  background-color: transparent;
  width: 97%;
  box-shadow: 0 60px 10px rgba(0, 0, 0, 0.6);
  height: 60px;

`
const Con = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Rotate animation when in loading state */
  ${(props) =>
    props.$loading &&
    `
      animation: rotate 1s linear infinite;
    `}

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Landing;
