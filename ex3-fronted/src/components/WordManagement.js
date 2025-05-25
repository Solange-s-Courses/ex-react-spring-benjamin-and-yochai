import React, { useState } from 'react';
import Layout from './Layout';
import WordForm from './WordForm';
import { useGetReq } from '../hooks/useGetReq';
import WordsByCategoryTable from "./WordsByCategoryTable";
import Spinner from "./Spinner";
import axios from "axios";


function WordManagement() {
    const [editingWord, setEditingWord] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [trigger, setTrigger] = useState(null);
    const { data: categories, isLoading: categoriesLoading, fetchError: categoriesError } = useGetReq('/game/categories', trigger);
    const { data: words, isLoading: wordsLoading, fetchError: wordsError } = useGetReq('/admin/words', trigger);

    const sendRequest = async (method, data) =>{
        setIsSubmitting(true);
        setFetchError(null);
        try {
            const res = await axios('/admin/words', {
                method,
                data: data
            });
            //window.location.reload();
        }catch(err){
            console.log("Error response:", err.response);
            console.log("Error data:", err.response?.data);

            if (err.response?.data) {
                const errorMessage = err.response.data.error;
                setFetchError(errorMessage);

            } else {
                setFetchError(err.message);
                console.log("Setting error to:", err.message);

            }
            //setFetchError(err.response?.data || err.message);
            //setFetchError(/*"Couldn't process your request, please try again later"*/err.message);
        }finally {
            console.log("Final fetchError:", fetchError);

            setIsSubmitting(false);
            setTrigger(data);
        }
    }
/*
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

    const handleUpdateWord = async (newWordData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/admin/words/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: newWordData
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
*/
    const isLoading = categoriesLoading || wordsLoading;
    //const fetchError = categoriesError || wordsError;
    //setFetchError( categoriesError + wordsError);

    return (

        <Layout title={"Word Management"}>
            {/*{(fetchError || categoriesError || wordsError) &&
                <div className="alert alert-danger">something went wrong {fetchError}</div>}*/}
            {(fetchError || categoriesError || wordsError) &&
                <div className="alert alert-danger">
                    {typeof fetchError === 'object' ? fetchError.message : fetchError}
                </div>}

            {isLoading?
                <Spinner />
                :
                editingWord ?
                    <WordForm
                        categories={categories || []}
                        sendRequest={sendRequest}
                        //onAddWord={async (word) => {await sendRequest('post', word)}}
                        //onUpdateWord={handleUpdateWord}
                        editingWord={editingWord}
                        setEditingWord={setEditingWord}
                        isSubmitting={isSubmitting}
                        existingWords={words || []}
                    />
                    :
                    <>
                        <div className={"d-flex justify-content-end align-items-end mb-2"}>
                            <button className="btn btn-success btn-sm" onClick={() => {
                                setFetchError(null);
                                setEditingWord({});
                            }}>
                                NEW WORD
                            </button>
                        </div>

                        <WordsByCategoryTable
                            words={words || []}
                            onEdit={setEditingWord}
                            onDelete={async(word)=> {await sendRequest('delete', word)}}
                            isSubmitting={isSubmitting}
                        />
                    </>
            }
        </Layout>

    );
}

export default WordManagement;
