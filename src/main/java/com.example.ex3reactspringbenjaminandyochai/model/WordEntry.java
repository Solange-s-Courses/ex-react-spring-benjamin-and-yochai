package com.example.ex3reactspringbenjaminandyochai.model;

import java.io.Serializable;

public class WordEntry implements Serializable {
    private String category; // mandatory (a-z letters only)
    private String word; // mandatory (a-z letters only)
    private String hint; // mandatory (any text)

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


};

