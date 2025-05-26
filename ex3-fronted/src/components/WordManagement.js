import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import WordForm from './WordForm';
import { useGetReq } from '../hooks/useGetReq';
import WordsByCategoryTable from "./WordsByCategoryTable";
import Spinner from "./Spinner";
import axios from "axios";

/**
 * WordManagement Component - Administrative interface for managing game words
 * 
 * This component provides a complete word management system including:
 * - Display of all words organized by categories
 * - Adding new words through a form interface
 * - Editing existing words and their properties
 * - Deleting words from the database
 * - Error handling and loading states
 * - Real-time updates of the word list
 * 
 * @returns {Element} The rendered WordManagement component with word list and management controls
 * @constructor
 */
function WordManagement() {
    const [editingWord, setEditingWord] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [trigger, setTrigger] = useState(null);
    const { data: categories, isLoading: categoriesLoading, fetchError: categoriesError } = useGetReq('/game/categories', trigger);
    const { data: words, isLoading: wordsLoading, fetchError: wordsError } = useGetReq('/admin/words', trigger);

    /**
     * Sends a request to the server to add or update a word
     * 
     * This function sends a request to the server to add or update a word.
     * It sets the submitting state to true, clears any fetch error, and attempts to send the request.
     * 
     * @param {string} method The HTTP method to use (POST or PUT)
     * @param {Object} data The data to send to the server
     * @returns {Promise<boolean>} True if the request was successful, false otherwise
     */
    const sendRequest = async (method, data) =>{
        setIsSubmitting(true);
        setFetchError(null);
        let success = true;
        try {
            const res = await axios('/admin/words', {
                method,
                data: data
            });
        }catch(err){
            success = false;
            if (err.response?.data) {
                const errorMessage = err.response.data.message;
                setFetchError(errorMessage);

            } else {
                setFetchError("Something went wrong. please try again later");
            }

        }finally {
            setIsSubmitting(false);
        }
        return success;
    }

    /**
     * Sets the trigger to a new random UUID when the editing word changes
     * 
     * This function sets the trigger to a new random UUID when the editing word changes.
     * the trigger is used to trigger a re-fetch of the words and categories.
     * It also clears any fetch error.
     */
    useEffect(() => {
        setTrigger(crypto.randomUUID());
        setFetchError(null);
    }, [editingWord])

    const isLoading = categoriesLoading || wordsLoading;

    return (

        <Layout title={"Word Management"}>
            {(fetchError || categoriesError || wordsError) &&
                <div className="alert alert-danger">
                    {typeof fetchError === 'object' ? fetchError.message : fetchError}
                </div>}

            {editingWord ?
                <WordForm
                    categories={categories || []}
                    sendRequest={sendRequest}
                    editingWord={editingWord}
                    setEditingWord={setEditingWord}
                    isSubmitting={isSubmitting}
                    existingWords={words || []}
                />
                :
                isLoading?
                    <Spinner />
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
                            onDelete={async(word)=> {
                                await sendRequest('delete', word);
                                setTrigger(crypto.randomUUID());
                            }}
                            isSubmitting={isSubmitting}
                        />
                    </>
            }
        </Layout>

    );
}

export default WordManagement;
