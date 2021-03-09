import { moviesApi, tvApi } from 'api';
import React from 'react';
import DetailPresenter from './DetailPresenter';

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      external: null,
      credits: null,
      similar: null,
      error: null,
      loading: true,
      isMovie: pathname.includes('/movie/'),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
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
      this.setState({ error: '검색결과를 찾지 못했습니다.' });
    } finally {
      this.setState({ loading: false, result, external, credits, similar });
    }
  }

  render() {
    const {
      result,
      external,
      credits,
      similar,
      error,
      loading,
      isMovie,
    } = this.state;
    console.log(similar);
    return (
      <DetailPresenter
        result={result}
        external={external}
        credits={credits}
        similar={similar}
        error={error}
        loading={loading}
        isMovie={isMovie}
      />
    );
  }
}
export default DetailContainer;
