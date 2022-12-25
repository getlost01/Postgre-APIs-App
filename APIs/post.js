import pool from '.././config/db.js';


const createPost = (req, res) => {
    const { user_id, title, content, category, keywords} = req.body;
    console.log(req.body)
    pool.query("INSERT INTO posts ( user_id, title, content, category, keywords, created_at, likes, dislikes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",
        [ user_id, title, content, category, JSON.stringify(keywords), new Date(),0,0],(err, result) => {
       
        if(err){res.json({ msg: "Error encountered", error: err}); return;}

        res.status(200).json({ 
            msg: "New post have been created", 
            details: result.rows[0] 
        });
        }
    );
};


export default { createPost }

