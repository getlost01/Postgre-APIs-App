import pool from '.././config/db.js';

const createComment = (req, res) => {
    const { post_id, user_id, comment } = req.body;
    pool.query("INSERT INTO comments( post_id, user_id, comment ) VALUES ($1,$2,$3) RETURNING * ",
        [ post_id, user_id, comment ],(err, result) => {
       
        if(err){res.json({ msg: "Error encountered", error: err}); return;}

        res.status(200).json({ 
            msg: "New comment have been created", 
            details: result.rows[0] 
        });
        }
    );
};

const getComment = (req,res) => {
    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM comments WHERE post_id=$1',[id], (err,result) =>{
        
        if(err){res.json({ msg: "Error encountered", error: err}); return;}
        res.json({
            post : result.rows
        })
    })
}


export default { createComment, getComment}

