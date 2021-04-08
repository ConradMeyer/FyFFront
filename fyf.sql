CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(20) NOT NULL,
    secretWord VARCHAR(30)
);

CREATE TABLE favoritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  oferta NVARCHAR(150),
  resumen VARCHAR(250),
  url VARCHAR(300),
  idUsuario INT,
  FOREIGN KEY (idUsuario) REFERENCES usuarios(id)

);

INSERT INTO users (email, pass) VALUES
('example', 'example'),
('example', 'example');