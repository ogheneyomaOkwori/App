import MovieCard from "@/components/MovieCard";
import PopularMoviesCard from "@/components/PopularMoviesCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, fetchPopularMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: popularMovies,
    loading: isLoadingPopularMovies,
    error: popularMoviesError,
    refetch: isRefetchingPopularMovies
  } = useFetch(
    () => fetchPopularMovies()
  );

  const { data: movies,
    loading: isLoadingMovies,
    error: moviesError,
    refetch: isRefetchingMovies
  } = useFetch(
    () => fetchMovies({ query: '' })
  );

  return (
    <View className="flex-1 bg-primary"
    >
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <Image source={images.bg} className="absolute w-full z-0" />
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {isLoadingMovies || isLoadingPopularMovies ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          // animating={isLoadingMovies || isRefetchingMovies}
          />
        ) : moviesError || popularMoviesError ? (
          <Text className="text-white text-lg font-bold mt-5 mb-3">
            Error: {moviesError?.message || popularMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search movies, shows..."
            />
            {popularMovies && popularMovies.length > 0 && (
              <>
                <Text className="text-white text-lg font-bold mt-5 mb-3">
                  Top Rated
                </Text>

                <FlatList
                  data={popularMovies}
                  renderItem={({ item, index }) => (
                    <PopularMoviesCard
                      movie={item}
                      index={index}
                    />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  className="mt-2"
                  contentContainerStyle={{ paddingRight: 20 }}
                />
              </>
            )}
            <>
              <Text className="text-white text-lg font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                // horizontal
                showsHorizontalScrollIndicator={false}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
        )
        }
      </ScrollView>
    </View>
  );
}
