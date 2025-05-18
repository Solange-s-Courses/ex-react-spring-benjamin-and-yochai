package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.dao.FormData;
import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;
import com.example.ex3reactspringbenjaminandyochai.services.ScoreService;
import com.example.ex3reactspringbenjaminandyochai.services.WordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

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
    public ResponseEntity<WordEntry> addGame(@RequestBody FormData formData){
            try{
                boolean isUnique = scoreService.isNicknameUnique(formData.getUsername());

                if(!isUnique){
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
                }

                WordEntry word = wordsService.getRandomWord(formData.getCategory());
                if (word == null){
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }
                scoreService.registerNickname(formData);

                return ResponseEntity.ok(word);
            }
            catch ( Exception e ){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> deleteGame(@RequestParam String username){
        if (scoreService.deleteGame(username)){
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }

}
