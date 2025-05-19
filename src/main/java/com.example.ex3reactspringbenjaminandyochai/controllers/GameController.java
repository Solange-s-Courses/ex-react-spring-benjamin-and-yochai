package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.dao.FormData;
import com.example.ex3reactspringbenjaminandyochai.dao.GameData;
import com.example.ex3reactspringbenjaminandyochai.model.ScoreEntry;
import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;
import com.example.ex3reactspringbenjaminandyochai.services.ScoreService;
import com.example.ex3reactspringbenjaminandyochai.services.WordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
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
    public WordEntry addGame(@RequestBody FormData formData) throws ResponseStatusException{
            try{
                //boolean isUnique = scoreService.isNicknameUnique(formData.getNickname());

                //if(!isUnique){
                //    return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
                //}

                WordEntry word = wordsService.getRandomWord(formData.getCategory());
                if (word == null){
                    //return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "cannot find word");
                }
                //scoreService.registerNickname(formData);

                return word;
            }
            catch ( Exception e ){
                //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
            }
    }
/*
    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> deleteGame(@RequestParam String nickname){
        if (scoreService.deleteGame(nickname)){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
*/
    @PostMapping("/finish")
    public void finishGame(@RequestBody ScoreEntry gameData) throws ResponseStatusException{
        try {
            scoreService.register(gameData);
            //return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception error){
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "something went wrong");
        }
    }

    @GetMapping("/leaderboard")
    public List<ScoreEntry> getScoreboard(){
        return scoreService.getScores();
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }

}
