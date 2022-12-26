import pool from '.././config/db.js';

const createPost = (req, res) => {
    const { user_id, title, content, category, keywords} = req.body;
    pool.query("INSERT INTO posts ( user_id, title, content, category, keywords, created_at, likes, dislikes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING * ",
        [ user_id, title, content, category, JSON.stringify(keywords), new Date(),0,0],(err, result) => {
       
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.status(200).json({ done:true, 
            msg: "New post have been created", 
            details: result.rows[0] 
        });
        }
    );
};

const updatePost= (req,res) => {
    let id = parseInt(req.params.id)
    const { title, content, category, keywords} = req.body;

    pool.query('UPDATE posts SET title = $1 , content = $2 , category = $3 , keywords =$4 WHERE post_id=$5', 
    [title, content, category, keywords, id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.json({ done:true,
            msg: `Post id = ${id} have been updated🎉`
        })
    })
}

const showPosts = (req,res) => {

    const {keyword, textSearch, category, userId, orderBy} = req.body;
      let query = 'SELECT * FROM posts';
      let queryPart = [];
      let queryParams = [];

      if (keyword) {
        queryPart.push('keywords ILIKE $1');
        queryParams.push(`%${keyword}%`);
      }
      if (textSearch) {
        queryPart.push('title ILIKE $' + (queryParams.length + 1));
        queryParams.push(`%${textSearch}%`);
      }
      if (category) {
        queryPart.push('category = $' + (queryParams.length + 1));
        queryParams.push(category);
      }
      if (userId) {
        queryPart.push('user_id = $' + (queryParams.length + 1));
        queryParams.push(userId);
      }
  
      if (queryPart.length > 0) {
        query += ' WHERE ' + queryPart.join(' AND ');
      }

      if (orderBy) {
        query += ' ORDER BY';
        switch (orderBy) {
          case 'mostLiked':
            query += ' likes DESC';
            break;
          case 'mostDisliked':
            query += ' dislikes DESC';
            break;
          case 'mostRecent':
                query += ' created_at DESC';
                break;
          default:
            throw new Error('Invalid orderBy parameter');
        }
      }

    pool.query(query, queryParams, (err,result) =>{

        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}
        res.json({ done:true,
            posts : result.rows
        })
    })
}

const postsById = (req,res) => {

    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM posts WHERE post_id=$1',[id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}
        res.json({ done:true,
            post : result.rows[0]
        })
    })
}

const like = (req,res) => {

    let id = parseInt(req.params.id)

    pool.query('UPDATE posts SET likes = likes + 1 WHERE post_id=$1', [id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.json({ done:true,
            msg: "👍 Done"
        })
    })
}

const dislike = (req,res) => {

    let id = parseInt(req.params.id)

    pool.query('UPDATE posts SET dislikes = dislikes + 1 WHERE post_id=$1', [id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.json({ done:true,
            msg: "👎 Done"
        })
    })
}

const deletePost = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM posts WHERE post_id=$1',[id], (err,result) => {
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.json({ done:true,
            msg: `Post with post_id = ${id} has deleted successfully`
        })
    })
}



export default { createPost, showPosts, postsById, like, dislike, deletePost, updatePost}

