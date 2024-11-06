import mongoose from "mongoose";
const Schema = mongoose.Schema;

const article_schema = new Schema(
    {
        Article_id: { 
            type: Number,
            required: true,
            unique: true
        },
        headline: {
            type: String,
            required: true,
        },
        Textcontent: [{
            type: String,
            required: true,
        }],
        Author: {
            type: String,
            required: true,
        },
        Photos: [{
            type: String,
            required: true,
        }],
        likes: {
            type: Number,
            default: 0
        }
    },
    { collection: 'articles2' }
);

const Article2 = mongoose.model("Article2", article_schema);
export default Article2;
