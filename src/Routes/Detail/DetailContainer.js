import React, { useState, useEffect } from 'react';
import { moviesApi, tvApi } from 'api';
import DetailPresenter from './DetailPresenter';

const DetailContainer = ({ location, history, match }) => {
  console.log(location);
  console.log(history);
  console.log(match);
  const [state, setState] = useState({
    result: null,
    external: null,
    credits: null,
    similar: null,
    loading: true,
  });
  const [error, setError] = useState(null);

  const { pathname } = location;
  const isMovie = pathname.includes('/movie/');

  useEffect(() => {
    if (!state.loading) {
      setState((prevState) => ({ ...prevState, loading: true }));
    }
    const fetchData = async () => {
      const {
        params: { id },
      } = match;
      const { push } = history;

      const parsedId = parseInt(id);
      if (isNaN(parsedId)) {
        return push('/');
      }
      let result = null;
      let external = null;
      let credits = null;
      let similar = null;
      try {
        if (isMovie) {
          ({ data: result } = await moviesApi.moiveDetail(parsedId));
          ({ data: external } = await moviesApi.external(parsedId));
          ({ data: credits } = await moviesApi.credits(parsedId));
          ({ data: similar } = await moviesApi.similar(parsedId));
        } else {
          ({ data: result } = await tvApi.showDetail(parsedId));
          ({ data: external } = await tvApi.external(parsedId));
          ({ data: credits } = await tvApi.credits(parsedId));
          ({ data: similar } = await tvApi.similar(parsedId));
        }
      } catch {
        setError('검색결과를 찾지 못했습니다.');
      } finally {
        setState({ result, external, credits, similar, loading: false });
      }
    };
    fetchData();
  }, [pathname]);

  return <DetailPresenter {...state} error={error} isMovie={isMovie} />;
};

// class DetailContainer extends React.Component {
//   constructor(props) {
//     super(props);
//     const {
//       location: { pathname },
//     } = props;
//     this.state = {
//       result: null,
//       external: null,
//       credits: null,
//       similar: null,
//       error: null,
//       loading: true,
//       isMovie: pathname.includes('/movie/'),
//     };
//   }

//   componentDidMount() {
//     this.fetchData();
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.location.pathname !== this.props.location.pathname) {
//       this.setState({ loading: true });
//       this.fetchData();
//     }
//   }

//   async fetchData() {
//     const {
//       match: {
//         params: { id },
//       },
//       history: { push },
//     } = match;
//     const { isMovie } = this.state;
//     const parsedId = parseInt(id);
//     if (isNaN(parsedId)) {
//       return push('/');
//     }
//     let result = null;
//     let external = null;
//     let credits = null;
//     let similar = null;
//     try {
//       if (isMovie) {
//         ({ data: result } = await moviesApi.moiveDetail(parsedId));
//         ({ data: external } = await moviesApi.external(parsedId));
//         ({ data: credits } = await moviesApi.credits(parsedId));
//         ({ data: similar } = await moviesApi.similar(parsedId));
//       } else {
//         ({ data: result } = await tvApi.showDetail(parsedId));
//         ({ data: external } = await tvApi.external(parsedId));
//         ({ data: credits } = await tvApi.credits(parsedId));
//         ({ data: similar } = await tvApi.similar(parsedId));
//       }
//     } catch {
//       this.setState({ error: '검색결과를 찾지 못했습니다.' });
//     } finally {
//       this.setState({ loading: false, result, external, credits, similar });
//     }
//   }

//   render() {
//     const {
//       result,
//       external,
//       credits,
//       similar,
//       error,
//       loading,
//       isMovie,
//     } = this.state;

//     return (
//       <DetailPresenter
//         result={result}
//         external={external}
//         credits={credits}
//         similar={similar}
//         error={error}
//         loading={loading}
//         isMovie={isMovie}
//       />
//     );
//   }
// }
export default DetailContainer;
