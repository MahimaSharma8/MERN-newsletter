import React, { useEffect, useState } from "react";
import Articles from '../components/Article.jsx';
import crumpledPaper from '../assets/newspaper.jpg';
import Wordle from "../components/wordle.jsx";
function Newspaper2({ currentPage }) {
    useEffect(() => {
        // Fetch articles from 'articles1' or 'articles2' collection
        fetch(`http://localhost:5000/api/articles${currentPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => {
                console.error('There was an error fetching the articles!', error);
            });
    }, [currentPage]);
    
    const Typewriter = ({ text, delay }) => {
        const [currentText, setCurrentText] = useState('');
        const [currentIndex, setCurrentIndex] = useState(0);
        useEffect(() => {
            if (currentIndex < text.length) {
                const timeout = setTimeout(() => {
                    setCurrentText(prevText => prevText + text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);
                }, delay);

                return () => clearTimeout(timeout);
            }
        }, [currentIndex, delay, text]);
        return <span>{currentText}</span>;
    };
    return (
        <div className="bg-cover bg-center w-11/12 m-auto pt-0 mt-0 flex flex-col items-center justify-center h-full px-4 md:px-16" style={{ backgroundImage: `url(${crumpledPaper})` }}>
            <div className="flex flex-col items-center space-y-8 justify-center my-10 w-full">
                <div className="text-center">
                    <h1 className="font-serif text-5xl md:text-7xl text-black mt-10"><Typewriter text="THE GAZETTE" delay={100} /></h1>
                    <hr className="m-auto my-4 w-[80%] md:w-[600px] border-2 border-black" />
                </div>
                <hr className="w-full border-t-2 border-black my-4" />
                <div className="text-stone-950 w-full px-4">
                    <div className={`page-content page-${currentPage}`}>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <Articles currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {/* WORDLE */}
                <Wordle />
            </div>
        </div>
    );
}

export default Newspaper2;
