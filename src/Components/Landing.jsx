import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Landing = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [columns, setColumns] = useState([[], [], []]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.unsplash.com/photos/random?count=10&page=${page}&client_id=${import.meta.env.VITE_ACCESS_KEY}`);
      const newData = response.data.filter((item) => !columns.some(column => column.map(i => i.id).includes(item.id)));
      setData((prevData) => [...prevData, ...newData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // Distribute images to columns when data changes
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

  return (
    <Body>
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
    padding-left: 10px;
    padding-right: 10px;
  }
`

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px; 
  @media (max-width: 900px) {
    justify-content: space-between;
  }
`;

const Column = styled.div`
  flex: 0 0 calc(33.3333% - 20px); 
  margin: 0 10px; 
  @media (max-width: 900px) {
    flex: 0 0 calc(50% - 20px);
  }

  @media (max-width: 600px) {
    flex: 0 0 calc(100% - 20px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 10px; 
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

export default Landing;
