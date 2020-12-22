USE employees_db;

INSERT INTO department (name)
VALUES
    ("Management"),
    ("Accounting"),
    ("Marketing"),
    ("Finance"),
    ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES
    ("President", 200000, 1),
    ("Vice President", 180000, 1),
    ("Executive Secretary", 150000, 1),
    ("Head Accountant", 100000, 2),
    ("Junior Accountant", 80000, 2),
    ("Marketing Manager", 100000, 3),
    ("Content Specialist", 50000, 3),
    ("Head of Investments", 160000, 4),
    ("Financial Analyst", 90000, 4),
    ("Senior Software Engineer", 130000, 5),
    ("Full Stack Developer", 91000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("James", "Sullivan", 1, null),
    ("Jimmy", "Sullivan", 2, 1),
    ("Derek", "Jeter", 3, 1),
    ("Jerry", "Seinfeld", 4, 1),
    ("Jimothy", "Squire", 5, 4),
    ("Slicky", "McSalesman", 6, 1),
    ("Jr", "McSalesman", 7, 6),
    ("Money", "McMoneybags", 8, 1),
    ("Coinage", "McMoneybags", 9, 8),
    ("Smarty", "McFly", 10, 1),
    ("Dumby", "McDumdum", 11, 10);