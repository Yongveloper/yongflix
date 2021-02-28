import { moviesApi, tvApi } from 'api';
import React, { useState, useEffect } from 'react';
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
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.moiveDetail(parsedId));
        ({ data: external } = await moviesApi.external(parsedId));
        ({ data: credits } = await moviesApi.credits(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
        ({ data: external } = await tvApi.external(parsedId));
        ({ data: credits } = await tvApi.credits(parsedId));
      }
    } catch {
      this.setState({ error: '검색결과를 찾지 못했습니다.' });
    } finally {
      this.setState({ loading: false, result, external, credits });
    }
  }

  render() {
    const { result, external, credits, error, loading } = this.state;

    return (
      <DetailPresenter
        result={result}
        external={external}
        credits={credits}
        error={error}
        loading={loading}
      />
    );
  }
}
export default DetailContainer;
