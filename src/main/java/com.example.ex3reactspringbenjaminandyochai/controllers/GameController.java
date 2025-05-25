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


@RestController
@RequestMapping("/game")
public class GameController {
    private final ScoreService scoreService;
    private final WordsService wordsService;

    @Autowired
    public GameController(ScoreService scoreService, WordsService wordsService) {
        this.scoreService = scoreService;
        this.wordsService = wordsService;
    }

    @GetMapping("/categories")
    public List<String> getCategories(){
        return wordsService.getAllCategories();
    }

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

    @PostMapping("/finish")
    public void finishGame(@RequestBody ScoreEntry gameData) throws ResponseStatusException{
        try {
            scoreService.register(gameData);
        } catch (Exception error){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
        }
    }

    @GetMapping("/leaderboard")
    public List<ScoreEntry> getScoreboard(){
        return scoreService.getScores();
    }

}
