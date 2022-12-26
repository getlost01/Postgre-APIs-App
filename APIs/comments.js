import pool from '.././config/db.js';

const createComment = (req, res) => {
    const { post_id, user_id, comment } = req.body;
    pool.query("INSERT INTO comments( post_id, user_id, comment ) VALUES ($1,$2,$3) RETURNING * ",
        [ post_id, user_id, comment ],(err, result) => {
       
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.status(200).json({ done:true, 
            msg: "New comment have been created", 
            details: result.rows[0] 
        });
        }
    );
};

const getComment = (req,res) => {
    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM comments WHERE comment_id=$1',[id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}
        res.json({ done:true,
            comment : result.rows[0]
        })
    })
}

const getAllComments = (req,res) => {
    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM comments WHERE post_id=$1',[id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}
        res.json({ done:true,
            comments : result.rows
        })
    })
}

const updateComments = (req,res) => {
    let id = parseInt(req.params.id)
    const { newComment } = req.body;

    pool.query('UPDATE comments SET comment = $1 WHERE comment_id=$2', 
    [newComment, id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.json({ done:true,
            msg: `Comment id = ${id} have been updated🎉`
        })
    })
}

const deleteComment = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM comments WHERE comment_id=$1',[id], (err,result) => {
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.json({ done:true,
            msg: `Post with post_id = ${id} has deleted successfully`
        })
    })
}


export default { createComment, getComment, getAllComments ,updateComments ,deleteComment}

