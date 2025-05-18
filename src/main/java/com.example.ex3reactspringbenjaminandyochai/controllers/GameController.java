package com.example.ex3reactspringbenjaminandyochai.controllers;

import com.example.ex3reactspringbenjaminandyochai.dao.FormData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Arrays;
import java.util.List;


@RestController
@RequestMapping("/game")
public class GameController {
    @GetMapping("")
    public String game() {
        return "Hello World";
    }

    @GetMapping("/categories")
    public List<String> getCategories(){
        //return Words.getAllCategories();
        return Arrays.asList("", "", "");
    }

    @PostMapping("/start")
    public ResponseEntity<HttpStatus> addGame(@RequestBody FormData formData){
        //synchronized (/*leader score*/){
            // try{
            //      leaderBoard.addAttempt(formData);
            //      GameData newGame = Words.getGame(formData.category);
            //      return new ResponseEntity.ok(HttpStatus.OK);
            // }catch(e){
            //      handle errors}
        //}
        return ResponseEntity.ok(HttpStatus.CREATED);
    }

    @DeleteMapping("delete")
    public ResponseEntity<String> deleteGame(@RequestParam String username){
        return ResponseEntity.ok(username + " has been deleted");
    }

    @ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }

}
