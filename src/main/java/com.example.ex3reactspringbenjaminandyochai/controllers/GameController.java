package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.dao.FormData;
import com.example.ex3reactspringbenjaminandyochai.model.ScoreEntry;
import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;
import com.example.ex3reactspringbenjaminandyochai.services.ScoreService;
import com.example.ex3reactspringbenjaminandyochai.services.WordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * REST controller for managing game operations.
 * Provides endpoints for starting new games, registering scores, and retrieving leaderboards.
 */
@RestController
@RequestMapping("/game")
public class GameController {
    private final ScoreService scoreService;
    private final WordsService wordsService;

    /**
     * initializing services
     *
     * @param scoreService a scoreService
     * @param wordsService a wordService
     */
    @Autowired
    public GameController(ScoreService scoreService, WordsService wordsService) {
        this.scoreService = scoreService;
        this.wordsService = wordsService;
    }

    /**
     * Retrieves all categories available in the system.
     *
     * @return List of all categories
     */ 
    @GetMapping("/categories")
    public List<String> getCategories(){
        return wordsService.getAllCategories();
    }

    /**
     * Starts a new game with a randomly selected word from the specified category.
     *
     * @param formData The FormData object containing the category for the game
     * @return WordEntry object representing the randomly selected word
     * @throws ResponseStatusException if word not found or other errors occur  
     */ 
    @PostMapping("/start")
    public WordEntry newGame(@RequestBody FormData formData) throws ResponseStatusException{
            try{
                WordEntry word = wordsService.getRandomWord(formData.getCategory());
                if (word == null){
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "cannot find word");
                }
                return word;
            }
            catch ( Exception e ){
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
            }
    }

    /**
     * Registers a score for a completed game.
     *
     * @param gameData The ScoreEntry object containing the game data
     * @throws ResponseStatusException if score registration fails
     */
    @PostMapping("/finish")
    public void finishGame(@RequestBody ScoreEntry gameData) throws ResponseStatusException{
        try {
            scoreService.register(gameData);
        } catch (Exception error){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
        }
    }

    /**
     * Retrieves the leaderboard of scores.
     *
     * @return List of ScoreEntry objects representing the leaderboard
     */ 
    @GetMapping("/leaderboard")
    public List<ScoreEntry> getScoreboard(){
        return scoreService.getScores();
    }

}
