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
    Author: 
    {
        type:String,
        required: true,
    },
    Textcontent:[text_schema],
    Photos: [photo_schema],
    likes: 
    {
        type: Number,
        default: 0
    }
},
    { collection: 'articles2' }
)
const Article2= mongoose.model("Article2",article_schema);
export default Article2;
