package com.example.ex3reactspringbenjaminandyochai.model;

import java.io.Serializable;

/**
 * Represents a score entry in the application.
 * Contains a nickname and a score.
 */ 
public class ScoreEntry implements Serializable {
    private String nickname;
    private int score;

    /**
     * Constructs a ScoreEntry object
     */ 
    public ScoreEntry() {}

    /**
     * Constructs a ScoreEntry object with the given nickname, score, and category.
     *
     * @param nickname The nickname of the user
     * @param score The score of the user
     */ 
    public ScoreEntry(String nickname, int score) {
        this.nickname = nickname;
        this.score = score;
    }

    /**
     * Retrieves the nickname of the user.
     *
     * @return The nickname of the user
     */  
    public String getNickname() {
        return nickname;
    }

    /**
     * Sets the nickname of the user.
     *
     * @param nickname The nickname to set
     */     
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * Retrieves the score of the user.
     *
     * @return The score of the user
     */  
    public int getScore() {
        return score;
    }

    /**
     * Sets the score of the user.
     *
     * @param score The score to set
     */   
    public void setScore(int score) {
        this.score = score;
    }

}
