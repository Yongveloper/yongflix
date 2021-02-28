import React, { useState, useEffect } from 'react';
import TVPresenter from './TVPresenter';
import { tvApi } from 'api';

const TVContainer = () => {
  const [topRated, setTopRated] = useState(null);
  const [popular, setPopular] = useState(null);
  const [airingToday, setAiringToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTvData() {
      try {
        const {
          data: { results: topRated },
        } = await tvApi.topRated();
        const {
          data: { results: popular },
        } = await tvApi.popular();
        const {
          data: { results: airingToday },
        } = await tvApi.airingToday();
        setTopRated(topRated);
        setPopular(popular);
        setAiringToday(airingToday);
      } catch {
        setError('TV 정보를 찾을 수 없습니다.');
      } finally {
        setLoading(false);
      }
    }
    fetchTvData();
  }, []);

  return (
    <TVPresenter
      topRated={topRated}
      popular={popular}
      airingToday={airingToday}
      loading={loading}
      error={error}
    />
  );
};

export default TVContainer;
