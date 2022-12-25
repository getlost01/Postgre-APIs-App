DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
   user_id INT GENERATED ALWAYS AS IDENTITY,
   username VARCHAR(255) NOT NULL UNIQUE,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) NOT NULL UNIQUE,
   password VARCHAR(255) NOT NULL,
   PRIMARY KEY(user_id)
);

CREATE TABLE posts(
   post_id INT GENERATED ALWAYS AS IDENTITY,
   user_id INT,
   title VARCHAR(100) NOT NULL, 
   content TEXT NOT NULL,
   category VARCHAR(100) NOT NULL,
   keywords TEXT NOT NULL, 
   created_at VARCHAR(100),
   likes INT,
   dislikes INT,
   PRIMARY KEY(post_id),
   CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);

CREATE TABLE comments(
   comment_id INT GENERATED ALWAYS AS IDENTITY,
   post_id INT,
   user_id INT,
   comment TEXT NOT NULL,
   PRIMARY KEY(comment_id),
   CONSTRAINT fk_posts
      FOREIGN KEY(post_id) 
	  REFERENCES posts(post_id)
);