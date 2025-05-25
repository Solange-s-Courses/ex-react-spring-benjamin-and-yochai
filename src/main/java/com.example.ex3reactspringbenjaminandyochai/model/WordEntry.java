package com.example.ex3reactspringbenjaminandyochai.model;

import java.io.Serializable;
import java.util.regex.Pattern;

public class WordEntry implements Serializable {
    private String category; // mandatory (a-z letters only)
    private String word; // mandatory (a-z letters only)
    private String hint; // mandatory (any text)
    private static final Pattern ALPHA_PATTERN = Pattern.compile("^[a-zA-Z]+$");

    public WordEntry() {}

    public WordEntry(String category, String word, String hint) {
        this.category = category;
        this.word = word;
        this.hint = hint;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getHint() {
        return hint;
    }

    public void setHint(String hint) {
        this.hint = hint;
    }

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


};

