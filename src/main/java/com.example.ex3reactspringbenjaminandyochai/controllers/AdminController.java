package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.dao.WordData;
import com.example.ex3reactspringbenjaminandyochai.services.WordsService;
import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/words/add")
    public ResponseEntity<WordEntry> addWord(@RequestBody WordData wordData) {
        try {
            WordEntry word = new WordEntry(wordData.getCategory(), wordData.getWord(), wordData.getHint());
            wordsService.addWord(word);
            return ResponseEntity.status(HttpStatus.CREATED).body(word);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/words/update")
    public ResponseEntity<WordEntry> updateWord(@RequestBody WordData wordData) {
        try {
            WordEntry newWord = new WordEntry(
                    wordData.getCategory(),
                    wordData.getWord(),
                    wordData.getHint()
            );

            boolean updated = wordsService.updateWord(wordData.getOriginalWord(), newWord);
            if (!updated) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(newWord);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/words/delete")
    public ResponseEntity<Void> deleteWord(@RequestBody WordData wordData) {
        try {
            String word = wordData.getWord();
            if (word == null || word.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }

            boolean deleted = wordsService.deleteWord(word);
            if (!deleted) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
