import { useEffect, useState} from 'react';
import styled from 'styled-components';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Footer from '../Components/Navbar/Footer';
import Navbar from '../Components/Navbar/Navbar';

const Searched = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState([[], [], []]);
  let params = useParams();

  const fetchData = async (name) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos?count=10&query=${name}&page=${page}&client_id=${process.env.REACT_APP_ACCESS_KEY}`);
      const newData = response.data.results.filter((item) => !columns.some(column => column.map(i => i.id).includes(item.id)));
      console.log(newData, response);
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(params.data);
    // eslint-disable-next-line 
  }, [params.data]);

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
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  return (
    <div>
        <Navbar/>
        <Body>
            <div>
                <Heading>
                {params.search} result.
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
              <ImageWrapper key={item.id}>
                {/* Placeholder with dynamic aspect ratio */}
                <Placeholder aspectRatio={getAspectRatio(item.width, item.height)} />

                {/* Actual image with dynamic height */}
                <Image src={item.urls.regular} alt="" />
                <DownloadButton onClick={() => downloadImage(item.urls.full, item.id)}>
                    Download
                  </DownloadButton>
              </ImageWrapper>
            ))}
          </Column>
        ))}
      </RowContainer>
    </InfiniteScroll>
    </Body>
    <Footer/>
    </div>
   
  );
};
const Body =styled.div`
  *{
    padding-left: 5px;
    padding-right: 5px;
  }
`
const Heading = styled.h1`
  font-size: 30px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  padding: 20px;
`

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px; 
  justify-content: center;
  @media (max-width: 900px) {
    justify-content: space-between;
  }
`;

const Column = styled.div`
  justify-content: center;
  align-items: center;
  flex: 0 0 calc(33.3333% - 20px); 
  margin: 0 5px; 
  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 20px);
  }

  @media (max-width: 600px) {
    flex: 0 0 calc(100% - 20px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 20px; 
  overflow: hidden;
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
  bottom: 10px;
  right: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

export default Searched;
