import React, { useState, useEffect } from 'react';
import HomePresenter from './HomePresenter';
import { moviesApi } from 'api';

const HomeContainer = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [popular, setPopular] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const {
          data: { results: nowPlaying },
        } = await moviesApi.nowPlaying();
        const {
          data: { results: upcoming },
        } = await moviesApi.upcoming();
        const {
          data: { results: popular },
        } = await moviesApi.popular();
        setNowPlaying(nowPlaying);
        setUpcoming(upcoming);
        setPopular(popular);
      } catch {
        setError('영화의 정보를 찾을 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchMovieData();
  }, []);

  return (
    <HomePresenter
      nowPlaying={nowPlaying}
      upcoming={upcoming}
      popular={popular}
      error={error}
      loading={loading}
    />
  );
};

// class HomeContainer extends React.Component {
//   state = {
//     nowPlaying: null,
//     upcoming: null,
//     popular: null,
//     error: null,
//     loading: true,
//   };

//   async componentDidMount() {
//     try {
//       const {
//         data: { results: nowPlaying },
//       } = await moviesApi.nowPlaying();
//       const {
//         data: { results: upcoming },
//       } = await moviesApi.upcoming();
//       const {
//         data: { results: popular },
//       } = await moviesApi.popular();
//       this.setState({
//         nowPlaying,
//         upcoming,
//         popular,
//       });
//     } catch {
//       this.setState({
//         error: '영화의 정보를 찾을 수 없습니다.',
//       });
//     } finally {
//       this.setState({
//         loading: false,
//       });
//     }
//   }

//   render() {
//     const { nowPlaying, upcoming, popular, error, loading } = this.state;
//     return (
//       <HomePresenter
//         nowPlaying={nowPlaying}
//         upcoming={upcoming}
//         popular={popular}
//         error={error}
//         loading={loading}
//       />
//     );
//   }
// }

export default HomeContainer;
