package com.example.ex3reactspringbenjaminandyochai.model;

import java.io.Serializable;
import java.util.regex.Pattern;

/**
 * Represents a word entry in the application.
 * Contains a category, word, and hint.
 */
public class WordEntry implements Serializable {
    private String category; // mandatory (a-z letters only)
    private String word; // mandatory (a-z letters only)
    private String hint; // mandatory (any text)
    private static final Pattern ALPHA_PATTERN = Pattern.compile("^[a-zA-Z]+$");

    /**
     * Constructs a WordEntry object.
     */ 
    public WordEntry() {}

        /**
     * Constructs a WordEntry object with the given category, word, and hint.
     *
     * @param category The category of the word
     * @param word The word to set
     * @param hint The hint for the word
     */ 
    public WordEntry(String category, String word, String hint) {
        this.category = category;
        this.word = word;
        this.hint = hint;
    }

    /**
     * Retrieves the category of the word.
     *
     * @return The category of the word
     */  
    public String getCategory() {
        return category;
    }

    /**
     * Sets the category of the word.
     *
     * @param category The category to set
     */      
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * Retrieves the word of the word.
     *
     * @return The word of the word
     */   
    public String getWord() {
        return word;
    }

    /**
     * Sets the word of the word.
     *
     * @param word The word to set
     */    
    public void setWord(String word) {
        this.word = word;
    }

    /**
     * Retrieves the hint of the word.
     *
     * @return The hint of the word
     */    
    public String getHint() {
        return hint;
    }

    /**
     * Sets the hint of the word.
     *
     * @param hint The hint to set
     */     
    public void setHint(String hint) {
        this.hint = hint;
    }

    /**
     * Validates the word entry.
     *
     * @throws IllegalArgumentException if the word, hint, or category is null or empty
     */    
    public void validate() throws IllegalArgumentException {
        if (word == null || hint == null || category == null ||
                word.trim().isEmpty() || hint.trim().isEmpty() || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Word, hint, or category cannot be empty");
        }

        // Validate word and category contain only letters
        if (!ALPHA_PATTERN.matcher(word).matches()) {
            throw new IllegalArgumentException("Word can only contain letters a-z");
        }

        if (!ALPHA_PATTERN.matcher(category).matches()) {
            throw new IllegalArgumentException("Category can only contain letters a-z");
        }
    }


}

