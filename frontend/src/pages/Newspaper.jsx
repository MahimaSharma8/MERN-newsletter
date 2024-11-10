import React, { useEffect, useState } from "react";
import Articles from '../components/Article.jsx';
import crumpledPaper from '../assets/newspaper.jpg';
import { Link } from "react-router-dom";
function Newspaper({ currentPage }) {
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
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const displayDate = () => {
            const date = new Date();
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const dayName = days[date.getDay()];
            const day = date.getDate();
            const monthName = months[date.getMonth()];
            const year = date.getFullYear();
            return `${dayName}, ${day} ${monthName} ${year}`;
        };

        setFormattedDate(displayDate());
    }, []);
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
                    <h1 className="font-bold text-2xl block p-4 text-black" id="date">{formattedDate}
                    </h1>
                <div className="text-center">
                    <h1 className="font-serif text-5xl md:text-7xl text-black mt-10"><Typewriter text="THE GAZETTE" delay={100} /></h1>
                    <hr className="m-auto my-4 w-[80%] md:w-[600px] border-2 border-black" />
                </div>
                <hr className="w-full border-t-2 border-black my-4" />
                <div className="text-stone-950 w-full px-4">
                    <div className={`page-content page-${currentPage}`}>
                        <div>
                            <Articles currentPage={currentPage} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <Link to="/Newspaper2">
                    <button className="bg-gray-300 w-32 p-2 text-black mb-2 font-mono font-extrabold border-black border-2 hover:border-black">Next</button>
                </Link>
            </div>
        </div>
    );
}

export default Newspaper;
