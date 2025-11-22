import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 text-sm font-normal'>{label}:</Text>
    <Text className='text-light-100 text-sm font-bold mt-2'>{value || 'N/A'}</Text>
  </View>
)

const MovieDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>()

  const {
    data: movieDetail,
    loading: isLoadingMovieDetail,
    error: movieDetailError,
    refetch: refetchMovieDetail
  } = useFetch(
    () => fetchMovieDetails(Number(id))
  );

  const {
    poster_path,
    title,
    release_date,
    vote_average,
    runtime,
    vote_count,
    overview,
    genres,
    budget,
    revenue,
    production_companies
  } = movieDetail || {};

  return (
    <View
      className='bg-primary flex-1'
    >
      <ScrollView
      // contentContainerStyle={{ paddingTop: 80 }}
      >
        <View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
            // source={{ uri: images.highlight }}
            className='w-full h-[550px]'
          // resizeMode='stretch'
          />
        </View>
        <View
          className='flex-col items-start justify-center mt-5 px-5'
        >
          <Text className='font-bold text-white text-xl'>{title}</Text>
          <View
            className='flex-row items-center gap-x-1 mt-2'
          >
            <Text className='text-light-200 text-sm font-medium'>{release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm font-medium'>•</Text>
            <Text className='text-light-200 text-sm font-medium'>{runtime} mins</Text>
          </View>
          <View
            className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'
          >
            <Text className='text-sm text-white font-semibold uppercase'>
              Rating:{' '}
              <Text className='text-yellow-400 font-bold'>
                {vote_average != null && Number(vote_average.toFixed(1))}
              </Text>
              {' '} / 10
            </Text>
            <Text className='text-light-200 text-sm'>({vote_count} votes)</Text>
          </View>
          <MovieInfo label='Overview' value={overview} />
          <MovieInfo label='Genre' value={`${genres?.map((g) => g.name).join(', ') || 'N/A'}`} />
          <View className='flex flex-row justify-between w-[60%] mt-10 mb-5'>
            <MovieInfo label='Budget' value={budget && `$${budget / 1000000} million`} />
            <MovieInfo label='Revenue' value={revenue && `$${(revenue / 1000000).toFixed(2)} million`} />
          </View>
          <MovieInfo label='Production Company' value={production_companies && production_companies.map((c) => c.name).join(', ') || 'N/A'} />
        </View>
      </ScrollView>
      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50'
        onPress={router.back}
      >
        <Image
          source={{
            uri: icons.arrow
          }}
          className='size-6 mr-1 mt-0.5 rotate-180'
          tintColor={'#FFFFFF'}
          resizeMode='contain'
        />
        <Text className='text-white text-base font-semibold'> Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails