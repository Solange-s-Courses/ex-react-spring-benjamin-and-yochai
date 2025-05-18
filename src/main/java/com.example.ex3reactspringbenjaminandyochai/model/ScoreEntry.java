package com.example.ex3reactspringbenjaminandyochai.model;

import java.io.Serializable;

public class ScoreEntry implements Serializable {
    private String nickname;
    private int score;
    private String category;

    public ScoreEntry() {}

    public ScoreEntry(String nickname, int score, String category) {
        this.nickname = nickname;
        this.score = score;
        this.category = category;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
