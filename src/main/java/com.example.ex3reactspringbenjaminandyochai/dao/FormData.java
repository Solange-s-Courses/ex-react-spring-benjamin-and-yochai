package com.example.ex3reactspringbenjaminandyochai.dao;

/**
 * Represents the form data submitted by the user for starting a new game.
 * Contains a nickname and a category for the game.
 */ 
public class FormData {
    private String nickname;
    private String category;

    /**
     * default constructor
     */
    public FormData() {}

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
     * Retrieves the category of the game.
     *
     * @return The category of the game
     */  
    public String getCategory() {
        return category;
    }

    /**
     * Sets the category of the game.
     *
     * @param category The category to set
     */
    public void setCategory(String category) {
        this.category = category;
    }

}
