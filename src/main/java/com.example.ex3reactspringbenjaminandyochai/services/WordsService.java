package com.example.ex3reactspringbenjaminandyochai.services;

import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class WordsService {
    private final String FILE_PATH = "words.ser";
    private List<WordEntry> words = new ArrayList<>();
    private final Random random = new Random();

    @PostConstruct
    public void init() {
        loadWordsFromFile();
    }

    public synchronized WordEntry getRandomWord() {
        loadWordsFromFile();

        if (words.isEmpty()) {
            //return new WordEntry("none", "no word", "no hint");
            return null;
            //throw error
        }
        return words.get(random.nextInt(words.size()));
    }

    public synchronized void addWord(WordEntry word) {
        loadWordsFromFile();
        words.add(word);
        saveWordsToFile();
    }

    private void loadWordsFromFile() {
        File file = new File(FILE_PATH);
        if (!file.exists()) return;
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            Object obj = ois.readObject();
            if (obj instanceof List) {
                words = (List<WordEntry>) obj;
            }
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    private void saveWordsToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_PATH))) {
            oos.writeObject(words);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
