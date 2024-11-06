import React, { useEffect, useState } from "react";

function Articles({ currentPage }) {
    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:5000/api/articles${currentPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const updatedData = data.map(article => ({
                    ...article,
                    isLiked: false  // Local state for each article's like status
                }));
                setArticles(updatedData);
            })
            .catch(error => {
                console.error('There was an error fetching the articles!', error);
            });
    }, [currentPage]);

    const handleLike = (articleId) => {
        setArticles(articles.map(article => {
            if (article.Article_id === articleId) {
                return {
                    ...article,
                    likes: article.likes + 1,
                    isLiked: true
                };
            }
            return article;
        }));

        fetch(`http://localhost:5000/api/articles${currentPage}/${articleId}/likes`, { 
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            }
        }).catch(error => {
            console.error('Error updating like:', error);
        });
    };
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article, idx) => (
                <div id={article.headline} key={article.Article_id} className="mb-4 pb-0 pr-4 border-r-4 border-black">
                    <hr className="m-auto my-4 w-[100%] border-2 border-black" />
                    <h2 className="text-3xl font-bold mb-4 text-center">{article.headline || `Article ${idx + 1}`}</h2>
                    <hr className="m-auto my-1 w-[100%] border-2 border-black" />
                    <div className="flex flex-col md:flex-row items-start">
                        {article.Photos && article.Photos[0] && (
                            <img
                                src={article.Photos[0]}
                                className="w-72 grayscale hover:grayscale-0 transition-all duration-300 mb-5 h-40"
                            />
                        )}
                        <div className="ml-4">
                            {article.Textcontent && article.Textcontent[0] && (
                                <p className="font-sans text-sm first-letter:font-serif first-letter:text-3xl">
                                    {article.Textcontent[0]}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row">
                        {article.Textcontent && article.Textcontent[1] && (
                            <p className="font-sans text-sm">{article.Textcontent[1]}</p>
                        )}
                        {article.Photos && article.Photos[1] && (
                            <img
                                src={article.Photos[1]}
                                className="w-72 grayscale hover:grayscale-0 transition-all duration-300 h-40"
                            />
                        )}
                    </div>
                    {/* Like button */}
                    <button
                        className={`bg-transparent w-8 text-center p-0 hover:border-none focus:outline-none ${article.isLiked ? "text-red-800" : ""}`}
                        onClick={() => handleLike(article.Article_id)}
                    >
                        <i className="hover:text-red-700 active:text-red-800 text-3xl fa fa-heart mt-0 mb-0" aria-hidden="true"></i>
                        {article.likes}
                    </button>
                    <h2 className="text-xl font-bold text-right font-serif">Author: {article.Author}</h2>
                </div>
            ))}
        </div>
    );
}

export default Articles;
