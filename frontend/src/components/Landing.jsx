import React, { useState, useEffect } from 'react';
import Text from './Text';
import { handleHTTPError, handleHTTPSuccess, sendDELETERequest, sendGETRequest, sendPOSTRequest, sendPUTRequest } from '../lib/httpRequest';

const Landing = () => {
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetchText();
  }, []);

  const fetchText = async () => {
    sendGETRequest('/texts')
        .then((res) => {
            handleHTTPSuccess(res);
            setTexts(res.data.textObjList);
        })
        .catch((error) => {
            handleHTTPError(error);
            setTexts([])
        })
};

  const handleSubmit = async () => {
    sendPOSTRequest('/texts', {content: text})
        .then(res => {
            handleHTTPSuccess(res);
            setText('');
            fetchText();
        })
        .catch(error => {
            handleHTTPError(error)
        })
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleDelete = (textObj) => {
    sendDELETERequest(`/texts/${textObj.id}`)
        .then(res => {
            handleHTTPSuccess(res);
            fetchText()
        })
        .catch(error => {
            handleHTTPError(error);
        })
  }

  const handleUpdate = (textObj, content) => {
    sendPUTRequest(`/texts/${textObj.id}`, { content })
        .then(res => {
            handleHTTPSuccess(res);
            fetchText()
        })
        .catch(error => {
            handleHTTPError(error)
        })
  }

  return (
    <div className="container mt-5">
        <textarea
            className="form-control mb-3"
            rows="5"
            value={text}
            onChange={handleChange}
        />
        <button 
            disabled={text.length === 0} 
            type="submit" 
            className="btn btn-primary mb-3" 
            onClick={handleSubmit}
        >
            Add Text
        </button>
        {texts.map(t => {
            return (
                <Text
                    text={ t }
                    onDelete={ handleDelete }
                    onUpdate={ handleUpdate }
                    key={ t.id }
                />
            )
        })}
    </div>
  );
};

export default Landing;
