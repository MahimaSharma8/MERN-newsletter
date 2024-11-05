import mongoose from "mongoose"
const Schema = mongoose.Schema;
const photo_schema = new Schema({
    index: { 
        type: Number, 
        required: true 
    },
    src: { 
        type: String, 
        required: true 
    }
});
const text_schema = new Schema({
    index: { 
        type: Number, 
        required: true 
    },
    text: { 
        type: String, 
        required: true 
    }
});

const article_schema = new Schema({
    Article_id:
    { 
        type: Number,
        required: true,
        unique: true
    },
    headline:
    {
        type:String,
        required:true,
    },
    Textcontent:[text_schema],
    Author: 
    {
        type:String,
        required: true,
    },
    Photos: [photo_schema],
    likes: 
    {
        type: Number
    }
    },
    { collection: 'articles1' }
)
const Article1= mongoose.model("Article1",article_schema);
export default Article1;
