import { moviesApi, tvApi } from 'api';
import React from 'react';
import DetailPresenter from './DetailPresenter';

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
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
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.moiveDetail(parsedId));
        ({ data: external } = await moviesApi.external(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: external } = await tvApi.external(parsedId));
      }
    } catch {
      this.setState({ error: '검색결과를 찾지 못했습니다.' });
    } finally {
      this.setState({ loading: false, result, external });
    }
  }

  render() {
    const { result, external, error, loading } = this.state;
    return (
      <DetailPresenter
        result={result}
        external={external}
        error={error}
        loading={loading}
      />
    );
  }
}

export default DetailContainer;
