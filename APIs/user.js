import pool from '.././config/db.js';


const signup = (req, res) => {
    const { username, email, name , password} = req.body;

    pool.query("INSERT INTO users (username, email, name , password) VALUES ($1,$2,$3,$4) RETURNING * ",
        [username, email, name , password],(err, result) => {
       
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        res.status(200).json({ done:true, 
            msg: "New user have been created", 
            details: result.rows[0] 
        });
        }
    );
};


const login = (req, res) => {
    const { username, password} = req.body;
  
    pool.query('SELECT * FROM users WHERE username=$1',[username], (err,result) =>{
       
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}
        if(result.rows.length == 0) {res.json({ done:true, msg: "Invalid username", error: {detail: "Username not found in data base."}}); return;}
        if(result.rows[0].password == password){
            res.status(200).json({ done:true,
                msg: "User have been login",
                username: result.rows[0].username,
                name: result.rows[0].name
            });
        }else{
            res.json({ done:true,
                msg: "Wrong password",
                error: {detail: "Password did not match."}
            });
        }
      }
    );
  };

const showUsers = (req,res) => {
    pool.query('SELECT * FROM users', (err,result) =>{

        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        var show = [];
        result.rows.forEach(user => {
            show.push({ user_id: user.user_id, username : user.username, email: user.email, name: user.name });
        });
        res.json({ done:true,
            users : show
        })
    })
}


const userById = (req,res) => {

    let id = parseInt(req.params.id)

    pool.query('SELECT * FROM users WHERE user_id=$1',[id], (err,result) =>{
        
        if(err){res.json({ done:false, msg: "Error encountered", error: err}); return;}

        var show = [];
        result.rows.forEach(user => {
            show.push({ username : user.username, email: user.email, name: user.name });
        });
        res.json({ done:true,
            users : show
        })
    })
}

export default { signup, login, showUsers ,userById }