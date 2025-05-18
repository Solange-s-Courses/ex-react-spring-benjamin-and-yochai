package com.example.ex3reactspringbenjaminandyochai.services;

import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class WordsService {
    private final String FILE_PATH = "words.ser";
    private List<WordEntry> words = new ArrayList<>();
    private final Random random = new Random();

    @PostConstruct
    public void init() {
        loadWordsFromFile();
    }

    public synchronized WordEntry getRandomWord(String category) {
        loadWordsFromFile();

        List<WordEntry> filtered = words.stream()
                .filter(w -> w.getCategory().equalsIgnoreCase(category)).toList();

        if (filtered.isEmpty()) {
            return null;
        }

        return filtered.get(random.nextInt(filtered.size()));
    }

    public synchronized void addWord(WordEntry word) {
        //validation
        loadWordsFromFile();
        words.add(word);
        saveWordsToFile();
    }

    public synchronized List<String> getAllCategories() {
        loadWordsFromFile();

        return words.stream().map(WordEntry::getCategory).distinct().toList();
    }

    public synchronized void deleteWord(WordEntry word) {}

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
