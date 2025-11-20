import { Client, Databases, ID, Query } from 'appwrite';

// track searches made by users;

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TRENDING_MOVIES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') //Appwrite Endpoint
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); //project ID

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  // if exists, increment count
  // if not, create new record with count = 1
  try {
    const result = await databases.listDocuments(DATABASE_ID, TRENDING_MOVIES_COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
      Query.equal('movie_id', movie.id),
    ]);

    // check for existing record for the search term and movie ID
    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];

      await databases.updateDocument(
        DATABASE_ID,
        TRENDING_MOVIES_COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1
        }
      )
    } else {
      // create new record
      await databases.createDocument(
        DATABASE_ID,
        TRENDING_MOVIES_COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: searchTerm,
          movie_id: movie.id,
          title: movie.title,
          count: 1,
          poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
        }
      )
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
}