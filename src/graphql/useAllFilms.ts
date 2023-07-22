import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ALL_FILMS = gql`
{
    allFilms{
        films{
          title,
          releaseDate,
          producers,
          director,
          episodeID,
          id
        },
        totalCount
    }
}
`

const useAllFilms = () => {
    const { error, loading, data } = useQuery(ALL_FILMS);
    return {
        error,
        loading, 
        data
    }
}

export default useAllFilms;
