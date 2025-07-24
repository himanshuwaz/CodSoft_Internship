# TASK 4: RECOMMENDATION SYSTEM

def get_movie_data():
    """
    Returns a dictionary of movies with their associated genres.
    This simulates a small movie database.
    """
    movies = {
        "The Shawshank Redemption": ["Drama"],
        "The Godfather": ["Crime", "Drama"],
        "The Dark Knight": ["Action", "Crime", "Drama"],
        "Pulp Fiction": ["Crime", "Drama"],
        "Forrest Gump": ["Drama", "Romance"],
        "Inception": ["Action", "Sci-Fi", "Thriller"],
        "The Matrix": ["Action", "Sci-Fi"],
        "Interstellar": ["Sci-Fi", "Drama", "Adventure"],
        "Spirited Away": ["Animation", "Adventure", "Fantasy"],
        "La La Land": ["Musical", "Drama", "Romance"],
        "Blade Runner 2049": ["Sci-Fi", "Drama", "Mystery"],
        "Parasite": ["Comedy", "Drama", "Thriller"],
        "Avengers: Endgame": ["Action", "Sci-Fi", "Adventure"],
        "Eternal Sunshine of the Spotless Mind": ["Drama", "Romance", "Sci-Fi"]
    }
    return movies

def get_user_preferences():
    """
    Prompts the user to enter their preferred genres.
    Returns a list of unique, lowercase genres.
    """
    print("\nTell us your favorite genres (e.g., Action, Sci-Fi, Drama, Comedy, Romance, Thriller, Fantasy, Musical, Animation, Mystery, Adventure).")
    genres_input = input("Enter genres separated by commas: ").strip()
    if not genres_input:
        return []
    # Convert to lowercase and remove duplicates
    return list(set([genre.strip().lower() for genre in genres_input.split(',')]))

def recommend_movies(movies, user_genres, num_recommendations=5):
    """
    Recommends movies based on the user's preferred genres using content-based filtering.

    Args:
        movies (dict): A dictionary of movies and their genres.
        user_genres (list): A list of genres preferred by the user.
        num_recommendations (int): The maximum number of recommendations to return.

    Returns:
        list: A list of recommended movie titles, sorted by relevance.
    """
    if not user_genres:
        print("No genres provided. Cannot make specific recommendations.")
        return []

    movie_scores = {}
    for movie, genres in movies.items():
        score = 0
        # Convert movie genres to lowercase for comparison
        movie_genres_lower = [g.lower() for g in genres]

        for user_genre in user_genres:
            if user_genre in movie_genres_lower:
                score += 1 # Increment score for each matching genre

        if score > 0: # Only consider movies that match at least one preferred genre
            movie_scores[movie] = score

    # Sort movies by score in descending order
    # If scores are equal, sort alphabetically for consistent output
    sorted_movies = sorted(movie_scores.items(), key=lambda item: (-item[1], item[0]))

    recommendations = [movie for movie, score in sorted_movies]

    return recommendations[:num_recommendations] # Return top N recommendations

def main():
    """Main function to run the Recommendation System."""
    movies = get_movie_data()

    print("--- Simple Movie Recommendation System ---")
    print("Welcome! Let's find some movies you might like.")

    while True:
        user_preferences = get_user_preferences()

        if not user_preferences:
            print("You didn't enter any genres. Would you like to try again or exit?")
            retry = input("Type 'yes' to try again, or 'no' to exit: ").strip().lower()
            if retry == 'no':
                break
            continue

        recommendations = recommend_movies(movies, user_preferences)

        if recommendations:
            print("\n--- Here are some recommendations for you: ---")
            for i, movie in enumerate(recommendations):
                print(f"{i + 1}. {movie}")
            print("--------------------------------------------")
        else:
            print("\nSorry, no movies match your preferred genres in our database.")

        play_again = input("\nWould you like to get more recommendations? (yes/no): ").strip().lower()
        if play_again != 'yes':
            print("Exiting Recommendation System. Enjoy your movies!")
            break

if __name__ == "__main__":
    main()
