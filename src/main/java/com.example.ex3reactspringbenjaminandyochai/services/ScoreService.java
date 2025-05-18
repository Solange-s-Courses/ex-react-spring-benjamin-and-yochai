package com.example.ex3reactspringbenjaminandyochai.services;

import com.example.ex3reactspringbenjaminandyochai.model.ScoreEntry;
import jakarta.annotation.PostConstruct;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

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

    public synchronized void registerNickname(String nickname, String category) {
        scores.add(new ScoreEntry(nickname, 0, category));
        saveToFile();
    }

    private void loadFromFile() {
        File file = new File(FILE_PATH);
        if (!file.exists()) return;
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            Object obj = ois.readObject();
            if (obj instanceof List) {
                scores = (List<ScoreEntry>) obj;
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private void saveToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_PATH))) {
            oos.writeObject(scores);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}