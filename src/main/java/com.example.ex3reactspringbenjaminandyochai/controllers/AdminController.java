package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.services.WordsService;
import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


/**
 * REST controller for managing word entries in the admin section of the application.
 * Provides endpoints for CRUD operations on word entries.
 *
 */
@RestController
@RequestMapping("/admin")
public class AdminController {
    private final WordsService wordsService;

    /**
     * initializing word service
     *
     * @param wordsService a word service
     */
    @Autowired
    public AdminController(WordsService wordsService) {
        this.wordsService = wordsService;
    }

    /**
    * Retrieves all word entries from the system.
    *
    * @return List of all WordEntry objects
    */
    @GetMapping("/words")
    public List<WordEntry> getAllWords() {
        return wordsService.getAllWords();
    }

    /**
    * Adds a new word entry to the system.
    * Throws ResponseStatusException with:
    * - CONFLICT (409) if the word already exists
    * - INTERNAL_SERVER_ERROR (500) for other exceptions
    *
    * @param newWord The WordEntry object to be added
    * @throws ResponseStatusException if word already exists or other errors occur
    */
    @PostMapping("/words")
    public void addWord(@RequestBody WordEntry newWord) {
        try {
            wordsService.addWord(newWord);
        } catch (IllegalArgumentException e) {
            //throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    /**
    * Updates an existing word entry in the system.
    * Throws ResponseStatusException with:
    * - NOT_FOUND (404) if word doesn't exist
    * - BAD_REQUEST (400) for invalid input
    * - INTERNAL_SERVER_ERROR (500) for other exceptions
    *
    * @param updatedWord The WordEntry object containing updated information
    * @throws ResponseStatusException if word not found or other errors occur
    */
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

    /**
    * Deletes a word entry from the system.
    * Throws ResponseStatusException with:
    * - BAD_REQUEST (400) if no word to delete
    * - NOT_FOUND (404) if word doesn't exist
    * - INTERNAL_SERVER_ERROR (500) for other exceptions
    *
    * @param wordToDelete The WordEntry object containing the word to delete
    * @throws ResponseStatusException if no word to delete or other errors occur
    */
    @DeleteMapping("/words")
    public void deleteWord(@RequestBody WordEntry wordToDelete) {
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

}

