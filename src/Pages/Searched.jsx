import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from '../Components/Navigation/Footer';
import Navsearch from '../Components/Navigation/Navsearch';
import { motion } from 'framer-motion';
import { Menu2, Close2 } from '../assets';
import { GoDownload } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDownloading } from "react-icons/md";

const Searched = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState([[], [], []]);
  const [downloading, setDownloading] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let params = useParams();

  const fetchData = async (name) => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${name}&page=${page}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
      );
      const newData = response.data.results.filter(
        (item) => !data.some((existingItem) => existingItem.id === item.id)
      );
      console.log(newData, response);
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(params.search);
    // eslint-disable-next-line
  }, [params.search, page]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const newColumns = [];
    const maxColumns = windowWidth <= 500 ? 2 : 3;
    for (let i = 0; i < maxColumns; i++) {
      newColumns.push([]);
    }
    data.forEach((item, index) => {
      const columnIndex = index % maxColumns;
      if (!newColumns[columnIndex].some(i => i.id === item.id)) {
        newColumns[columnIndex].push(item);
      }
    });
    setColumns(newColumns);
  }, [data, windowWidth]);


  const downloadImage = async (url, id) => {
    try {
      setDownloading((prevState) => ({ ...prevState, [id]: true })); // Update state for specific image

      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `photo_${id}`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(link.href);

      setDownloading((prevState) => ({ ...prevState, [id]: false })); // Reset state for specific image
    } catch (error) {
      console.error('Error downloading image:', error);
      setDownloading((prevState) => ({ ...prevState, [id]: false })); // Reset state for specific image
    }
  };

  return (
    <div>
      <div>
      <Navsearch bg={`bg-white`} tx={`text-black`} Menu={Menu2} Close={Close2} />
      </div>
      <Body>
        <div>
          <Heading>Free {params.search} Pictures.</Heading>
        </div>
        <InfiniteScroll
          dataLength={data.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={true}
          loader={<LoadingPlaceholder key="loading">Loading...</LoadingPlaceholder>}
          style={{ overflow: 'hidden' }}
        >
          <RowContainer
            animate={{opacity:1}}
            initial={{opacity:0}}
            exit={{opacity:0}}
            transition={{duration:0.9}}>
            {columns.map((column, columnIndex) => (
              <Column key={columnIndex}>
                {column.map((item) => (
                  <ImageWrapper key={item.id}>
                    {/* Placeholder with dynamic aspect ratio */}
                    <Placeholder aspectRatio={getAspectRatio(item.width, item.height)} />

                    {/* Actual image with dynamic height */}
                    <Image src={item.urls.regular} alt="" />
                  <Dlfooter className='image-footer'>
                  <DownloadButton
                  onClick={() => downloadImage(item.urls.full, item.id)}
                  disabled={downloading[item.id]}
                  >
                  <Con $loading={downloading[item.id]}>
                    {downloading[item.id] ? <AiOutlineLoading3Quarters style={{ fontSize: '30px', marginLeft: '5px' }} /> :(
                      //Switch between download buttons based on screen width
                        <>
                          {windowWidth <= 500 ? (
                            <MdDownloading style={{ fontSize: '30px', marginLeft: '5px'  }} />
                          ) : (
                            <Con>Download <GoDownload style={{ fontSize: '30px', marginLeft: '5px' }} /></Con>
                          )}
                        </>
                      )}
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
      <Footer />
    </div>
  );
};

const Body =styled.div`
  *{
    padding-left: 5px;
    padding-right: 5px;
  }
  padding-top: 80px;
`
const Heading = styled.h1`
  font-size: 39px;
  font-family: 'Noto Sans', sans-serif;
  padding: 30px;
  font-weight: 400;
`

const RowContainer = styled(motion.div)`
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
  font-family: 'Dancing Script', 'cursive';
  color: #fff;
  border: none;
  padding: 7px;
  height: 50px;
  border-radius: 17px;
  cursor: pointer;
  transition:background-color .1s,border ease-in-out,transform .1s,box-shadow 5ms,border-color .25s;
  &:disabled {
    cursor: not-allowed;
  }
  @media (max-width: 500px) {
    background-color: transparent;
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
  @media (max-width: 500px) {
    bottom: 0;
    width: 100%;
  }
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


export default Searched;
