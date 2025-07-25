import java.io.Serializable; // For potential file I/O or passing between activities
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

/**
 * Represents a single inspiring quote.
 * Implements Serializable for potential use with file I/O or passing via Intents.
 */
class Quote implements Serializable {
    private static final long serialVersionUID = 1L;
    private String text;
    private String author; // Optional

    public Quote(String text, String author) {
        this.text = text;
        this.author = author;
    }

    public String getText() {
        return text;
    }

    public String getAuthor() {
        return author;
    }

    @Override
    public String toString() {
        return "\"" + text + "\"" + (author != null && !author.isEmpty() ? " - " + author : "");
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Quote quote = (Quote) o;
        return text.equals(quote.text) &&
               (author != null ? author.equals(quote.author) : quote.author == null);
    }

    @Override
    public int hashCode() {
        int result = text.hashCode();
        result = 31 * result + (author != null ? author.hashCode() : 0);
        return result;
    }
}

/**
 * Manages the collection of quotes and favorite quotes.
 * Handles fetching random quotes and saving/loading favorites.
 */
class QuoteManager {
    private List<Quote> allQuotes;
    private Set<Quote> favoriteQuotes; // Using a Set to ensure unique favorites
    private Random random;

    // In a real Android app, this would interact with Shared Preferences or SQLite
    // for persistent storage of favorite quotes.
    // private SharedPreferences sharedPreferences;
    // private static final String FAVORITES_KEY = "favorite_quotes";

    public QuoteManager() {
        this.allQuotes = new ArrayList<>();
        this.favoriteQuotes = new HashSet<>();
        this.random = new Random();
        initializeQuotes();
        // this.sharedPreferences = context.getSharedPreferences("QuoteAppPrefs", Context.MODE_PRIVATE); // Android Context needed
        // loadFavoriteQuotes(); // Load favorites from storage on initialization
    }

    /**
     * Initializes a predefined list of inspiring quotes.
     */
    private void initializeQuotes() {
        allQuotes.add(new Quote("The only way to do great work is to love what you do.", "Steve Jobs"));
        allQuotes.add(new Quote("Believe you can and you're halfway there.", "Theodore Roosevelt"));
        allQuotes.add(new Quote("The future belongs to those who believe in the beauty of their dreams.", "Eleanor Roosevelt"));
        allQuotes.add(new Quote("Strive not to be a success, but rather to be of value.", "Albert Einstein"));
        allQuotes.add(new Quote("The mind is everything. What you think you become.", "Buddha"));
        allQuotes.add(new Quote("It is during our darkest moments that we must focus to see the light.", "Aristotle Onassis"));
        allQuotes.add(new Quote("The best way to predict the future is to create it.", "Peter Drucker"));
        allQuotes.add(new Quote("Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"));
        allQuotes.add(new Quote("The only impossible journey is the one you never begin.", "Tony Robbins"));
        allQuotes.add(new Quote("Innovation distinguishes between a leader and a follower.", "Steve Jobs"));
    }

    /**
     * Returns a random quote from the collection.
     * @return A random Quote object.
     */
    public Quote getRandomQuote() {
        if (allQuotes.isEmpty()) {
            return new Quote("No quotes available.", "");
        }
        return allQuotes.get(random.nextInt(allQuotes.size()));
    }

    /**
     * Adds a quote to the user's favorite list.
     * @param quote The Quote object to add to favorites.
     * @return True if added successfully, false if already a favorite.
     */
    public boolean addFavoriteQuote(Quote quote) {
        if (favoriteQuotes.add(quote)) {
            // saveFavoriteQuotes(); // Save to persistent storage
            return true;
        }
        return false;
    }

    /**
     * Removes a quote from the user's favorite list.
     * @param quote The Quote object to remove from favorites.
     * @return True if removed successfully, false if not found.
     */
    public boolean removeFavoriteQuote(Quote quote) {
        if (favoriteQuotes.remove(quote)) {
            // saveFavoriteQuotes(); // Save to persistent storage
            return true;
        }
        return false;
    }

    /**
     * Checks if a quote is in the favorite list.
     * @param quote The Quote object to check.
     * @return True if it's a favorite, false otherwise.
     */
    public boolean isFavorite(Quote quote) {
        return favoriteQuotes.contains(quote);
    }

    /**
     * Returns a list of all favorite quotes.
     * @return A copy of the list of favorite quotes.
     */
    public List<Quote> getFavoriteQuotes() {
        return new ArrayList<>(favoriteQuotes);
    }

    // /**
    //  * Loads favorite quotes from local storage (e.g., SharedPreferences). (Conceptual)
    //  */
    // private void loadFavoriteQuotes() {
    //     // String jsonFavorites = sharedPreferences.getString(FAVORITES_KEY, "[]");
    //     // Deserialize jsonFavorites into favoriteQuotes Set
    //     // Requires a JSON library like Gson or Jackson
    // }

    // /**
    //  * Saves favorite quotes to local storage (e.g., SharedPreferences). (Conceptual)
    //  */
    // private void saveFavoriteQuotes() {
    //     // Serialize favoriteQuotes Set to JSON string
    //     // sharedPreferences.edit().putString(FAVORITES_KEY, jsonString).apply();
    // }
}

// --- Conceptual Android Activity/Fragment Integration ---
/*
// Example of how you might use QuoteManager in an Android Activity/Fragment
// This is NOT runnable code as it requires Android SDK and project setup.

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import android.view.View;
import android.content.Intent;
import android.content.SharedPreferences; // For favorite quotes persistence

import java.util.List;
import java.util.Set;
import com.google.gson.Gson; // You would need to add Gson library to your project
import com.google.gson.reflect.TypeToken; // For deserialization

public class MainActivity extends AppCompatActivity {

    private QuoteManager quoteManager;
    private TextView tvQuoteText, tvQuoteAuthor;
    private Button btnRefreshQuote, btnToggleFavorite, btnViewFavorites, btnShareQuote;
    private Quote currentQuote;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main); // Your layout file

        // Initialize QuoteManager (pass context if using SharedPreferences/SQLite)
        quoteManager = new QuoteManager();

        // Initialize UI components
        tvQuoteText = findViewById(R.id.tvQuoteText);
        tvQuoteAuthor = findViewById(R.id.tvQuoteAuthor);
        btnRefreshQuote = findViewById(R.id.btnRefreshQuote);
        btnToggleFavorite = findViewById(R.id.btnToggleFavorite);
        btnViewFavorites = findViewById(R.id.btnViewFavorites);
        btnShareQuote = findViewById(R.id.btnShareQuote);

        // Display initial quote
        displayNewQuote();

        // Button Listeners
        btnRefreshQuote.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                displayNewQuote();
            }
        });

        btnToggleFavorite.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (currentQuote != null) {
                    if (quoteManager.isFavorite(currentQuote)) {
                        quoteManager.removeFavoriteQuote(currentQuote);
                        Toast.makeText(MainActivity.this, "Removed from favorites!", Toast.LENGTH_SHORT).show();
                    } else {
                        quoteManager.addFavoriteQuote(currentQuote);
                        Toast.makeText(MainActivity.this, "Added to favorites!", Toast.LENGTH_SHORT).show();
                    }
                    updateFavoriteButtonState();
                }
            }
        });

        btnViewFavorites.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Start a new Activity to display favorite quotes
                Intent intent = new Intent(MainActivity.this, FavoritesActivity.class);
                // You might pass the list of favorites or load them in FavoritesActivity
                startActivity(intent);
            }
        });

        btnShareQuote.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (currentQuote != null) {
                    shareQuote(currentQuote);
                }
            }
        });
    }

    private void displayNewQuote() {
        currentQuote = quoteManager.getRandomQuote();
        tvQuoteText.setText(currentQuote.getText());
        tvQuoteAuthor.setText(currentQuote.getAuthor());
        updateFavoriteButtonState();
    }

    private void updateFavoriteButtonState() {
        if (currentQuote != null) {
            if (quoteManager.isFavorite(currentQuote)) {
                btnToggleFavorite.setText("Remove from Favorites");
                // You might change icon here
            } else {
                btnToggleFavorite.setText("Add to Favorites");
                // You might change icon here
            }
        }
    }

    private void shareQuote(Quote quote) {
        Intent shareIntent = new Intent(Intent.ACTION_SEND);
        shareIntent.setType("text/plain");
        shareIntent.putExtra(Intent.EXTRA_TEXT, quote.toString() + "\n\n#QuoteOfTheDayApp");
        startActivity(Intent.createChooser(shareIntent, "Share Quote via"));
    }

    // You would also need to implement FavoritesActivity.java and its layout
    // for displaying the list of favorite quotes, likely using a RecyclerView.
}

// For persistent storage of favorites using SharedPreferences (requires Gson library)
// class FavoriteQuotesStorage {
//     private SharedPreferences prefs;
//     private Gson gson;
//     private static final String FAVORITES_KEY = "favorite_quotes";

//     public FavoriteQuotesStorage(Context context) {
//         prefs = context.getSharedPreferences("QuoteAppPrefs", Context.MODE_PRIVATE);
//         gson = new Gson();
//     }

//     public Set<Quote> loadFavorites() {
//         String json = prefs.getString(FAVORITES_KEY, "[]");
//         Type type = new TypeToken<HashSet<Quote>>() {}.getType();
//         return gson.fromJson(json, type);
//     }

//     public void saveFavorites(Set<Quote> favorites) {
//         String json = gson.toJson(favorites);
//         prefs.edit().putString(FAVORITES_KEY, json).apply();
//     }
// }
*/
