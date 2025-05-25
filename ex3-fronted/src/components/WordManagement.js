import React, {useEffect, useState} from 'react';
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
        }catch(err){
            setFetchError("Couldn't process your request, please try again later");
        }finally {
            setIsSubmitting(false);
        }
    }

    useEffect(() => {
        setTrigger(crypto.randomUUID());
    }, [editingWord])

    const isLoading = categoriesLoading || wordsLoading;

    return (

        <Layout title={"Word Management"}>
            {(fetchError || categoriesError || wordsError) &&
                <div className="alert alert-danger">something went wrong {fetchError}</div>}

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
