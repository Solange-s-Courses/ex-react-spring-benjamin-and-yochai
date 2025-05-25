package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.dao.WordDeleteDao;
import com.example.ex3reactspringbenjaminandyochai.services.WordsService;
import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final WordsService wordsService;

    @Autowired
    public AdminController(WordsService wordsService) {
        this.wordsService = wordsService;
    }

    @GetMapping("/words")
    public List<WordEntry> getAllWords() {
        return wordsService.getAllWords();
    }

    @PostMapping("/words")
    public void addWord(@RequestBody WordEntry newWord) {
        try {
            //WordEntry word = new WordEntry(wordData.getCategory(), wordData.getWord(), wordData.getHint());
            wordsService.addWord(newWord);
            //return ResponseEntity.status(HttpStatus.CREATED).body(word);
        } catch (IllegalArgumentException e) {
            //throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PutMapping("/words")
    public void updateWord(@RequestBody WordEntry updatedWord) {
        try {
            wordsService.updateWord(updatedWord);

        }catch (ClassNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @DeleteMapping("/words")
    public void deleteWord(@RequestBody WordDeleteDao wordToDelete) {
        try {
            String word = wordToDelete.getWord();
            if (word == null || word.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No word to delete");
            }

            wordsService.deleteWord(word);

        } catch (ClassNotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /*@ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }*/

    /*@ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }*/

    /*@ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.badRequest().body(error);
    }*/

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatus(ResponseStatusException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getReason());
        return ResponseEntity.status(ex.getStatusCode()).body(error);
    }

}

