import MaskedView from '@react-native-masked-view/masked-view';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface PopularMoviesCardProps {
  movie: Movie;
  index: number;
}

const PopularMoviesCard = ({ movie: { id, poster_path, title }, index }: PopularMoviesCardProps) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity
        className='w-32 relative pl-5'
      >
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : 'https://placeholder.co/600x400/1a1a1a/ffffff.png'
          }}
          className='w-32 h-48 rounded-lg'
          resizeMode='cover'
        />
        <View
          className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'
        >
          <MaskedView
            maskElement={
              <Text className='text-6xl font-bold text-white'>
                {index + 1}
              </Text>
            }
          >
            <Image
              source={{
                uri: 'https://www.transparenttextures.com/patterns/diagmonds-light.png'
                // uri: images.rankingGradient
              }}
              className='size-14'
              resizeMode='cover'
            />
          </MaskedView>
        </View>
        <Text
          className='text-white font-bold text-sm mt-2 text-light-200'
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>

    </Link>
  )
}

export default PopularMoviesCard