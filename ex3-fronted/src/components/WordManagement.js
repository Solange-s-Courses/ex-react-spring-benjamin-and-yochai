import React, { useState } from 'react';
import Layout from './Layout';
import WordForm from './WordForm';
import WordCategoryList from './WordCategoryList';
import { useFetch } from '../hooks/useFetch';
import WordsByCategoryTable from "./WordsByCategoryTable";
import WordFormModal from "./WordFormModal";


function WordManagement() {
    const { data: categories, isLoading: categoriesLoading, fetchError: categoriesError } = useFetch('/game/categories');
    const { data: words, isLoading: wordsLoading, fetchError: wordsError, setFetchError } = useFetch('/admin/words');

    const [editingWord, setEditingWord] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddWord = async (wordData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/admin/words/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wordData)
            });

            if (!response.ok) {
                throw new Error('Failed to add word');
            }

            // Reload to refresh data
            window.location.reload();
            return true;
        } catch (error) {
            console.error('Error adding word:', error);
            setFetchError(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateWord = async (originalWord, newWordData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/admin/words/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    originalWord,
                    newWord: newWordData
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update word');
            }

            // Reload to refresh data
            window.location.reload();
            setEditingWord(null);
            return true;
        } catch (error) {
            console.error('Error updating word:', error);
            setFetchError(error.message);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteWord = async (word) => {
        try {
            const response = await fetch('/admin/words/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word })
            });

            if (!response.ok) {
                throw new Error('Failed to delete word');
            }

            // Reload to refresh data
            window.location.reload();
        } catch (error) {
            console.error('Error deleting word:', error);
            setFetchError(error.message);
        }
    };

    const isLoading = categoriesLoading || wordsLoading;
    const fetchError = categoriesError || wordsError;

    return (
        <Layout title="Word Management">
            {fetchError && <div className="alert alert-danger">{fetchError}</div>}

            <WordForm
                categories={categories || []}
                onAddWord={handleAddWord}
                onUpdateWord={handleUpdateWord}
                editingWord={editingWord}
                setEditingWord={setEditingWord}
                isSubmitting={isSubmitting}
                existingWords={words || []}
            />
            {/*
            <WordFormModal
                        categories={categories || []}
                        onAddWord={handleAddWord}
                        onUpdateWord={handleUpdateWord}
                        editingWord={editingWord}
                        setEditingWord={setEditingWord}
                        isSubmitting={isSubmitting}
                        existingWords={words || []}
                    />
*/}

                    <WordsByCategoryTable
                        categories={categories || []}
                        words={words || []}
                        onEdit={setEditingWord}
                        onDelete={handleDeleteWord}
                        isLoading={isLoading}
                        isSubmitting={isSubmitting}
                    />
                    {/*
            <WordCategoryList
                categories={categories || []}
                words={words || []}
                onEdit={setEditingWord}
                onDelete={handleDeleteWord}
                isLoading={isLoading}
                isSubmitting={isSubmitting}
            />
            */}
                    </Layout>
                );
            }

            export default WordManagement;
