package com.example.ex3reactspringbenjaminandyochai.WordInit;

import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Utility program to initialize the words file with some default words
 */
public class WordInit {
    private static final String WORDS_FILE = "words.ser";

    /**
     * Default contractor
     */
    public WordInit() {}

    /**
     * Main method to initialize the words file with some default words
     *
     * @param args command line arguments
     */
    public static void main(String[] args) {
        List<WordEntry> initialWords = new ArrayList<>();

        // Animals
        initialWords.add(new WordEntry("animals", "lion", "King of the jungle"));
        initialWords.add(new WordEntry("animals", "elephant", "Largest land mammal"));
        initialWords.add(new WordEntry("animals", "giraffe", "Tallest land animal"));
        initialWords.add(new WordEntry("animals", "penguin", "Flightless bird that swims"));
        initialWords.add(new WordEntry("animals", "dolphin", "Intelligent marine mammal"));

        // Fruits
        initialWords.add(new WordEntry("fruits", "apple", "Red or green fruit"));
        initialWords.add(new WordEntry("fruits", "banana", "Yellow curved fruit"));
        initialWords.add(new WordEntry("fruits", "strawberry", "Red fruit with seeds on outside"));
        initialWords.add(new WordEntry("fruits", "pineapple", "Tropical fruit with spiky skin"));
        initialWords.add(new WordEntry("fruits", "watermelon", "Large fruit with red flesh and black seeds"));

        // Countries
        initialWords.add(new WordEntry("countries", "japan", "Land of the rising sun"));
        initialWords.add(new WordEntry("countries", "brazil", "Largest country in South America"));
        initialWords.add(new WordEntry("countries", "egypt", "Famous for pyramids"));
        initialWords.add(new WordEntry("countries", "canada", "Second largest country by area"));
        initialWords.add(new WordEntry("countries", "australia", "Island continent"));

        // Sports
        initialWords.add(new WordEntry("sports", "soccer", "Most popular sport in the world"));
        initialWords.add(new WordEntry("sports", "basketball", "Game with hoops"));
        initialWords.add(new WordEntry("sports", "tennis", "Played with rackets"));
        initialWords.add(new WordEntry("sports", "swimming", "Water-based sport"));
        initialWords.add(new WordEntry("sports", "volleyball", "Court game with net"));

        // Professions
        initialWords.add(new WordEntry("professions", "doctor", "Medical professional"));
        initialWords.add(new WordEntry("professions", "teacher", "Educates students"));
        initialWords.add(new WordEntry("professions", "engineer", "Designs solutions"));
        initialWords.add(new WordEntry("professions", "lawyer", "Legal professional"));
        initialWords.add(new WordEntry("professions", "farmer", "Grows crops"));

        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(WORDS_FILE))) {
            oos.writeObject(initialWords);
            System.out.println("Successfully initialized words file with " + initialWords.size() + " words");
        } catch (IOException e) {
            System.err.println("Error creating words file: " + e.getMessage());
        }
    }
}