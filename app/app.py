from flask import Flask, render_template, jsonify, request, redirect , flash ,url_for
from flask_sqlalchemy import SQLAlchemy
import rsa
#from vernam import *

key = ""
iv = ""
ctr = ""
plaintext = ""
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Answers.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class Answers(db.Model):
    id = db.Column(db.Integer, primary_key = True , auto_increment = True)
    A1 = db.Column(db.String(100))
    A2 = db.Column(db.String(100))
    A3 = db.Column(db.String(100))
    A4 = db.Column(db.String(100))
    A5 = db.Column(db.String(100))
   # A6 = db.Column(db.String(100))
    #A7 = db.Column(db.String(100))
   # A8 = db.Column(db.String(100))

    def __init__(self,a1,a2,a3,a4,a5):
        self.A1 = a1
        self.A2 = a2
        self.A3 = a3
        self.A4 = a4
        self.A5 = a5
    #    self.A6 = a6
     #   self.A7 = a7
      #  self.A8 = a8

def generate(sz, e=None):
    if e:
        public_key, private_key = rsa.newkeys(sz, exponent=e)
    else:
        public_key, private_key = rsa.newkeys(sz)

    return hex(private_key.n), public_key.e, hex(private_key.exp1 * private_key.exp2), hex(private_key.p), \
        hex(private_key.q), hex(private_key.d % (private_key.p - 1)), hex(private_key.d % (private_key.q - 1)), \
        hex(private_key.coef), public_key, private_key


def encrypt(message, n, e):
    print(str.encode(message), n, e)
    public_key = rsa.PublicKey(n, e)
    return rsa.encrypt(str.encode(message), public_key)


def decrypt(crypto, n, e, d, p, q):
    private_key = rsa.PrivateKey(n, e, d, p, q)
    return rsa.decrypt(crypto, private_key)

@app.route('/')
@app.route('/Introduction')
def Introduction():
    return render_template('Introduction.html')


@app.route('/Theory')
def Theory():
    return render_template('Theory.html')

str
@app.route('/Procedure')
def Procedure():
    return render_template('Procedure.html')


@app.route('/Objective')
def Objective():
    return render_template('Objective.html')


@app.route('/Experiment')
def Experiment():
    return render_template('Experiment.html')


@app.route('/Quizzes')
def Quizzes():
    return render_template('Quizzes.html')


@app.route('/Further')
def Further():
    return render_template('Further.html')


@app.route('/Assignment')
def Assignment():
    return render_template('Assignment.html')


@app.route('/Feedback')
def Feedback():
    return render_template('Feedback.html')

@app.route('/Quizzes',methods = ['POST'])
def GetAnswer():
    if request.method == 'POST':
        ans = Answers(request.form['A1'],request.form['A2'],request.form['A3'],request.form['A4'],request.form['A5'])
        db.session.add(ans)
        db.session.commit()
        # flash ('Answers were stored')
    return redirect(url_for('Quizzes'))


@app.route("/show_all")
def show_all():
    return render_template('show_all.html',Ans = Answers.query.all())


@app.route('/Experiment/set_512e3', methods=['GET'])
def generate4():
    public_key, private_key = rsa.newkeys(512, exponent=3)
    
    info = {
        'n': hex(private_key.n),
        'e': public_key.e,
        'p': hex(private_key.p),
        'q': hex(private_key.q),
        'dp_1': hex(private_key.d % (private_key.p - 1)),
        'dq_1': hex(private_key.d % (private_key.q - 1)),
        'coef': hex(private_key.coef),
        'd': hex(private_key.d)
    }
    return jsonify(info)


@app.route('/Experiment/set_512f4', methods=['GET'])
def generate3():
    public_key, private_key = rsa.newkeys(512)
    
    info = {
        'n': hex(private_key.n),
        'e': public_key.e,
        'p': hex(private_key.p),
        'q': hex(private_key.q),
        'dp_1': hex(private_key.d % (private_key.p - 1)),
        'dq_1': hex(private_key.d % (private_key.q - 1)),
        'coef': hex(private_key.coef),
        'd': hex(private_key.d)
    }
    return jsonify(info)


@app.route('/Experiment/set_1024e3', methods=['GET'])
def generate1():
    public_key, private_key = rsa.newkeys(1024, exponent=3)
    
    info = {
        'n': hex(private_key.n),
        'e': public_key.e,
        'p': hex(private_key.p),
        'q': hex(private_key.q),
        'dp_1': hex(private_key.d % (private_key.p - 1)),
        'dq_1': hex(private_key.d % (private_key.q - 1)),
        'coef': hex(private_key.coef),
        'd': hex(private_key.d)
    }
    return jsonify(info)


@app.route('/Experiment/set_1024f4', methods=['GET'])
def generate2():
    public_key, private_key = rsa.newkeys(1024)
    
    info = {
        'n': hex(private_key.n),
        'e': public_key.e,
        'p': hex(private_key.p),
        'q': hex(private_key.q),
        'dp_1': hex(private_key.d % (private_key.p - 1)),
        'dq_1': hex(private_key.d % (private_key.q - 1)),
        'coef': hex(private_key.coef),
        'd': hex(private_key.d)
    }
    return jsonify(info)


@app.route('/Experiment/encrypt', methods=['POST'])
def encrypt_m():
    data = request.get_json()
    n = int(data.get('n'), 16)
    e = int(data.get('e'), 16)
    plaintext = str(data.get('plaintext'))
    ciphertext = encrypt(plaintext, n, e)
    decrypted = plaintext
    info = {
        'ciphertext': ciphertext.hex(),
        'decrypted': decrypted
    }
    return jsonify(info)


@app.route('/Experiment/decrypt', methods=['POST'])
def decrypt_m():
    data = request.get_json()
    n = int(data.get('n'), 16)
    e = int(data.get('e'), 16)
    d = int(data.get('d'), 16)
    p = int(data.get('p'), 16)
    q = int(data.get('q'), 16)
    ciphertext = data.get('ciphertext')
    plaintext = str(data.get('plaintext'))
    decrypted = decrypt(ciphertext,n,e,d,p,q)
    info = {
        'decrypted': decrypted
    }
    return jsonify(info)

if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
    
