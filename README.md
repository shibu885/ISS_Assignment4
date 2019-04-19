# ISS_Assignment4
PKCS_v1.5:
This project was made by Vishal Verma(2018101072)(https://github.com/vjv2903) and Shiva Prasad Tummala(2018101047)
(https://github.com/shibu885) under guidance Mr. Anubhab Sen(https://github.com/anubhabsen) as an assignment for Introduction 
to Software Systems course.

## Disclaimer
This project was made solely for the purpose of an assignment and the content used in this app are in no way owned or distributed by us.

## What is this?
This is a rewriting of experiment 10 regarding PKCSv1.5 of Cryptography Lab of the virtual labs (link: http://cse29-iiith.vlabs.ac.in/exp10/index.php) using flask framework. 
Topic: Public-Key Cryptosystems (PKCSv1.5) 

# Prerequisites

...This experiment was developed primarily using Python-Flask. To run this experiment, you should have the following installed:-
..* [Python v3.5](https://docs.python.org/3/)
..* [Flask v0.12](http://flask.pocoo.org/docs/0.12/)
..* [SQLalchemy v1.2](http://docs.sqlalchemy.org/en/latest/)
..* [rsa] (pip3 install --user rsa)

# Testing

Run the command to set up the server
..* python3 run.py

If you get a message that indicates that your server is up and running, you are good to go. 
If it shows some error then install the required libraries using pip3. If that does not work, notify the developers by posting an issue here.

# Functionality of each file:
app/run.py: The file which when run, sets up the server.

app/app.py: The file which calls all urls.

app/templates/show_all.html: This shows all stored response database of all questions of quiz. The url to access it is 127.0.0.1::5000/show_all .

app/Answer.db: Contains the database containing all the responses along with their answers  for the questions for the quiz part of this application.

app/exp.js: prforms the function onclick funtions

app/__pycache__: it stores the temporary cache for webpage

app/static: contains the required CSS, images, and JS files

app/templates: contains the HTML files 

# Design Patterns identified
Factory pattern while initializing the database. The app.py creates and maintains of database of response of quizzes.

127.0.0::5000/show_all : shows the correct answers in first row followed by responses of visitors.

# Testing of Script
run app/test.py if it prints working well and nothing else then the logic of code is working well and it will give the error
if there is some fault. The above script invokes the logic in the code in itself and it creates some random string and it
encrypts the string and then decrypts the encrypted ciphertext and checks the result with plaintext and prints the error
message if any otherwise it shows only working well. 
