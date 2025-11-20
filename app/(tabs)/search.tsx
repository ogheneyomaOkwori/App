import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { data: movies,
    loading: isLoadingMovies,
    error: moviesError,
    refetch: refetchMovies,
    reset
  } = useFetch(
    () => fetchMovies({ query: searchTerm }),
    false
  );

  useEffect(() => {
    // updateSearchCount(searchTerm, movies[0]);
    const timeout = setTimeout(async () => {
      if (searchTerm.trim()) {
        await refetchMovies();
        if (movies?.length > 0 && movies?.[0]) {
          await updateSearchCount(searchTerm, movies[0]);
        }
      } else {
        reset();
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode='cover'
      />
      <FlatList
        data={movies}
        renderItem={
          ({ item }) => (
            <MovieCard {...item} />
          )
        }
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'center', gap: 16, marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View
              className='w-full flex-row items-center justify-center mt-20'
            >
              <Image
                source={icons.logo}
                className='w-12 h-10'
              />
            </View>
            <View
              className='my-5'
            >
              <SearchBar
                placeholder='Search movies ...'
                value={searchTerm}
                onChangeText={(text: string) => {
                  setSearchTerm(text);
                }}
              />

            </View>
            {isLoadingMovies && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {moviesError?.message}
              </Text>
            )}
            {!isLoadingMovies && !moviesError && searchTerm.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white font-bold'>
                Search Results for {''}
                <Text className='text-accent font-bold'>
                  {searchTerm}
                </Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !isLoadingMovies && !moviesError && searchTerm.trim() ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchTerm.trim() ? `No results found for "${searchTerm}"` : 'Start typing to search for movies.'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

export default Search