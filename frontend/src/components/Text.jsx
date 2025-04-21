import React, { useState } from "react";
import { handleHTTPError, handleHTTPSuccess, sendGETRequest } from "../lib/httpRequest";

const Text = ({ text, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(text.content);
  const [showStats, setShowStats] = useState({
    'word-count': false,
    'char-count': false,
    'sentence-count': false,
    'paragraph-count': false,
    'longest-words': false
  })
  const [analysis, setAnalysis] = useState({
    "word-count": 0,
    "char-count": 0,
    "sentence-count": 0,
    "paragraph-count": 0,
    "longest-words": [],
  });

  const toggleShowStat = (type) => {
    const updated = {
        'word-count': false,
        'char-count': false,
        'sentence-count': false,
        'paragraph-count': false,
        'longest-words': false
    }
    if (type) {
        updated[type] = true;
    }

    setShowStats(updated);
  }
  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setUpdatedText(text.content);
  };

  const handleSubmitClick = () => {
    onUpdate(text, updatedText)
    setEditing(false);
  };

  const getAnalysis = (id, type) => {
    sendGETRequest(`/texts/${id}/${type}`)
        .then(res => {
            handleHTTPSuccess(res);
            setAnalysis({
                ...analysis,
                [type]: res.data.count || res.data['longest-words']
            })
        }).catch(error => {
            handleHTTPError(error)
        })
  };
  return (
    <div className="mb-4 border m-1 p-3">
        <div>
            {editing ? (
                <textarea
                    className="form-control mb-3"
                    rows="5"
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                />
            ) : (
                <pre className="mb-3">{text.content}</pre>
            )}
            </div>
            <div className="d-flex gap-2">
            {editing ? (
                <>
                    <button className="btn btn-primary" onClick={handleSubmitClick}>
                        Submit
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    <button className="btn btn-warning" onClick={ ()=> {
                        toggleShowStat();
                        handleEditClick();
                    }}>
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => onDelete(text)}
                    >
                        Delete
                    </button>
                    <button className="btn btn-info" onClick={ () => {{
                        getAnalysis(text.id, 'word-count')
                        toggleShowStat('word-count')
                    }}}>
                        Count Words
                    </button>
                    <button className="btn btn-info" onClick={ () => {{
                        getAnalysis(text.id, 'char-count')
                        toggleShowStat('char-count')
                    }}}>
                        Count Characters
                    </button>
                    <button className="btn btn-info" onClick={ () => {{
                        getAnalysis(text.id, 'sentence-count')
                        toggleShowStat('sentence-count')
                    }}}>
                        Count Sentences
                    </button>
                    <button className="btn btn-info" onClick={ () => {{
                        getAnalysis(text.id, 'paragraph-count')
                        toggleShowStat('paragraph-count')
                    }}}>
                        Count Paragraphs
                    </button>
                    <button className="btn btn-info" onClick={ () => {{
                        getAnalysis(text.id, 'longest-words')
                        toggleShowStat('longest-words')
                    }}}>
                        Longest Words
                    </button>
                </>
            )}
        </div>

        {showStats['word-count'] && (
            <div className="mt-2">Word Count: {analysis["word-count"]}</div>
        )}

        {showStats['char-count'] && (
            <div className="mt-2">Character Count: {analysis["char-count"]}</div>
        )}

        {showStats['sentence-count'] && (
            <div className="mt-2">Sentence Count: {analysis["sentence-count"]}</div>
        )}

        {showStats['paragraph-count'] && (
            <div className="mt-2">Paragraph Count: {analysis["paragraph-count"]}</div>
        )}

        {showStats['longest-words'] && (
            <div className="mt-2">Longest Words: {analysis["longest-words"]?.toString()}</div>
        )}
    </div>
  );
};

export default Text;
