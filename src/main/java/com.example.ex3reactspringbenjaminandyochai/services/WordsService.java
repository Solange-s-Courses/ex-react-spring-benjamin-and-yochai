package com.example.ex3reactspringbenjaminandyochai.services;

import com.example.ex3reactspringbenjaminandyochai.model.WordEntry;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.regex.Pattern;

@Service
public class WordsService {
    private final String FILE_PATH = "words.ser";
    private List<WordEntry> words = new ArrayList<>();
    private final Random random = new Random();
    private static final Pattern ALPHA_PATTERN = Pattern.compile("^[a-zA-Z]+$");

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

    public synchronized void addWord(WordEntry word) throws IllegalArgumentException, IOException {
        //validateWordEntry(word);
        word.validate();

        loadWordsFromFile();

        // Check for duplicate
        if (wordExists(word.getWord())) {
            throw new IllegalArgumentException("Word already exists");
        }

        words.add(word);
        saveWordsToFile();
    }

    public synchronized void updateWord(WordEntry updatedWord) throws IllegalArgumentException, ClassNotFoundException, IOException {
        //validateWordEntry(updatedWord);
        updatedWord.validate();

        loadWordsFromFile();

        // Find the index of the word to update
        int indexToUpdate = -1;
        for (int i = 0; i < words.size(); i++) {
            if (words.get(i).getWord().equalsIgnoreCase(updatedWord.getWord())) {
                indexToUpdate = i;
                break;
            }
        }

        if (indexToUpdate != -1) {
            words.set(indexToUpdate, updatedWord);
            saveWordsToFile();
            return;
        }
        throw new ClassNotFoundException("No word to update");
    }

    public synchronized void deleteWord(String word) throws ClassNotFoundException, IOException{
        if (word == null || word.trim().isEmpty()) {
            throw new IllegalArgumentException("Word cannot be empty");
        }

        loadWordsFromFile();
        boolean removed = words.removeIf(w -> w.getWord().equalsIgnoreCase(word));
        if (!removed) {
            throw new ClassNotFoundException("Word not found");
        }
        saveWordsToFile();
    }

    public synchronized List<String> getAllCategories() {
        loadWordsFromFile();
        return words.stream().map(WordEntry::getCategory).distinct().toList();
    }

    public synchronized List<WordEntry> getAllWords() {
        loadWordsFromFile();
        return new ArrayList<>(words);
    }

    public synchronized boolean wordExists(String word) {
        if (word == null) return false;

        loadWordsFromFile();
        return words.stream().anyMatch(w -> w.getWord().equalsIgnoreCase(word));
    }
/*
    // Centralized validation method
    private void validateWordEntry(WordEntry wordEntry) {
        if (wordEntry == null) {
            throw new IllegalArgumentException("Word entry cannot be null");
        }

        String word = wordEntry.getWord();
        String hint = wordEntry.getHint();
        String category = wordEntry.getCategory();

        if (word == null || hint == null || category == null) {
            throw new IllegalArgumentException("Word, hint, and category cannot be null");
        }

        if (word.trim().isEmpty() || hint.trim().isEmpty() || category.trim().isEmpty()) {
            throw new IllegalArgumentException("Word, hint, and category cannot be empty");
        }

        // Validate word and category contain only letters
        if (!ALPHA_PATTERN.matcher(word).matches()) {
            throw new IllegalArgumentException("Word can only contain letters a-z");
        }

        if (!ALPHA_PATTERN.matcher(category).matches()) {
            throw new IllegalArgumentException("Category can only contain letters a-z");
        }
    }
*/
    private void loadWordsFromFile() {
        File file = new File(FILE_PATH);

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            Object obj = ois.readObject();
            if (obj instanceof List) {
                words = (List<WordEntry>) obj;
            }
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Error loading words from file");
            words = new ArrayList<>();
        }
    }

    private void saveWordsToFile() throws IOException{
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(FILE_PATH))) {
            oos.writeObject(words);
        } catch (IOException e) {
            System.out.println("Error saving words to file");
            throw e;
        }
    }
}

