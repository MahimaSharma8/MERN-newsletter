import express from "express";
import Article1 from "../models/article1.js"; 
import Article2 from "../models/article2.js"; 
import User from "../models/user.js";
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

        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving articles', error: err });
    }
});

articleRoutes.get("/:collection/:Article_id", async (req, res) => {
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
        await article.save();

        res.json({ message: 'Like updated successfully', likes: article.likes });
    } catch (err) {
        res.status(500).json({ message: 'Error updating likes', error: err.message });
    }
});
articleRoutes.post('/articles1', async(req, res) => {
    const { Author, headline, Textcontent, Photos } = req.body;
    const Article_id = Date.now();
    const articleData = new Article1({
        Article_id,
        Author,
        headline,
        Textcontent,
        Photos,
    });

    // Handle articleData as needed, like saving to a database
    console.log("Verified Article Data:", articleData);

    await articleData.save();
    await User.updateOne({Author: Author, headline: headline },{$set:{verified:true}});


    // Send response
    res.status(200).send({ message: "Article verified successfully" });
});


export default articleRoutes;
