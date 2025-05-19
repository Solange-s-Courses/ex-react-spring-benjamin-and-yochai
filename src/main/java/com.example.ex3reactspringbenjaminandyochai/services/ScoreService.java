package com.example.ex3reactspringbenjaminandyochai.services;

import com.example.ex3reactspringbenjaminandyochai.dao.FormData;
import com.example.ex3reactspringbenjaminandyochai.dao.GameData;
import com.example.ex3reactspringbenjaminandyochai.model.ScoreEntry;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScoreService {
    private final String FILE_PATH = "scores.ser";
    private List<ScoreEntry> scores = new ArrayList<>();

    @PostConstruct
    public void init() {
        loadFromFile();
    }

    public synchronized boolean isNicknameUnique(String nickname) {
        return scores.stream().noneMatch(entry -> entry.getNickname().equalsIgnoreCase(nickname));
    }

    /*
    public synchronized void registerNickname(FormData formData) {
        loadFromFile();
        //check if unique
        scores.add(new ScoreEntry(formData.getNickname(), 0, formData.getCategory()));
        saveToFile();
    }

     */

    public synchronized void register(ScoreEntry gameData) throws IOException {
        loadFromFile();
        boolean updated = false;

        for (ScoreEntry entry : scores) {
            if (entry.getNickname().equalsIgnoreCase(gameData.getNickname())) {
                updated = true;
                if (entry.getScore() < gameData.getScore()) {
                    entry.setScore(gameData.getScore());
                }
                break;
            }
        }

        if (!updated) {
            scores.add(gameData);
        }

        saveToFile();
    }

    public synchronized List<ScoreEntry> getScores() {
        loadFromFile();
        return scores;
    }
/*
    public boolean deleteGame(String nickname) {
        loadFromFile();
        boolean removed = scores.removeIf(entry -> entry.getNickname().equalsIgnoreCase(nickname));
        saveToFile();

        return removed;
    }
*/
    private void loadFromFile() {
        File file = new File(FILE_PATH);
        //if (!file.exists()) return;
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            Object obj = ois.readObject();
            if (obj instanceof List) {
                scores = (List<ScoreEntry>) obj;
            }
        } catch (IOException | ClassNotFoundException e) {
            scores = new ArrayList<>();
            System.out.println("Error loading scores from file: " + e.getMessage());
        }
    }

    private void saveToFile() throws IOException {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_PATH))) {
            oos.writeObject(scores);
        } catch (IOException e) {
            System.out.println("Error saving scores to file");
            throw e;
        }
    }
}