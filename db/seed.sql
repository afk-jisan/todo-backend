-- Insert dummy users
INSERT INTO users (name, email, password) VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword1'),
('Bob Smith', 'bob@example.com', 'hashedpassword2'),
('Charlie Brown', 'charlie@example.com', 'hashedpassword3');


-- Insert dummy todos
INSERT INTO todos (user_id, title, description, is_completed) VALUES
(1, 'Buy groceries', 'Milk, bread, eggs, and fruit', FALSE),
(1, 'Complete project', 'Finish FastAPI conversion and test endpoints', TRUE),
(2, 'Workout', 'Go for a run and do strength training', FALSE),
(2, 'Read a book', 'Finish reading "Clean Code"', TRUE),
(3, 'Call mom', 'Check in and chat for a while', FALSE);
