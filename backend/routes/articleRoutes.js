import express from "express";
import Article1 from "../models/article1.js"; 
import Article2 from "../models/article2.js"; 
const articleRoutes = express.Router();


articleRoutes.get('/:collection', async (req, res) => {
    const { collection } = req.params; 

    let ArticleModel; 

    if (collection === 'articles1') {
        ArticleModel = Article1;
    } else if (collection === 'articles2') {
        ArticleModel = Article2;
    } else {
        return res.status(404).json({ message: 'Collection not found' });
    }

    try {
        const articles = await ArticleModel.find();
        const transformedArticles = articles.map(article => ({
            ...article._doc,
            Photos: article.Photos.map(photo => ({
                index: photo.index,
                src: String(photo.src), 
            }))
        }));

        res.json(transformedArticles);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving articles', error: err });
    }
});

// Route to get a specific article by ID (keeping this unchanged)
articleRoutes.get("/:collection/:Article_id", async (req, res) => {
    const { collection, Article_id } = req.params; // Get collection and article_id from URL parameters

    let ArticleModel; // To hold the reference to the appropriate model

    // Determine which model to use based on the collection name
    if (collection === 'articles1') {
        ArticleModel = Article1;
    } else if (collection === 'articles2') {
        ArticleModel = Article2;
    } else {
        return res.status(404).json({ message: 'Collection not found' });
    }

    try {
        const article = await ArticleModel.findOne({ Article_id });
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.json(article);
    } catch (error) {
        res.status(500).send('Error fetching article: ' + error.message);
    }
});

articleRoutes.patch('/:collection/:Article_id/likes', async (req, res) => {
    const { collection, Article_id } = req.params;

    let ArticleModel;

    if (collection === 'articles1') {
        ArticleModel = Article1;
    } else if (collection === 'articles2') {
        ArticleModel = Article2;
    } else {
        return res.status(404).json({ message: 'Collection not found' });
    }

    try {
        const article = await ArticleModel.findOne({ Article_id });
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        article.likes += 1;
        console.log(article.likes)
        await article.save();

        res.json({ message: 'Like updated successfully', likes: article.likes });
    } catch (err) {
        res.status(500).json({ message: 'Error updating likes', error: err.message });
    }
});






export default articleRoutes;
