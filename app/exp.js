$(document).ready(function() {
    $('#set_512e3').click(function() {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_512e3",
            success: function(result) {
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#set_512f4').click(function() {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_512f4",
            success: function(result) {
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#set_1024e3').click(function() {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_1024e3",
            success: function(result) {
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#set_1024f4').click(function() {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_1024f4",
            success: function(result) {
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
});


function do_status(s) {
    document.status.value = s;
}
function do_init() {
    if (document.n.value.length == 0) set_1024f4();
}
function do_encrypt() {
    var before = new Date();
    var rsa = new RSAKey();
    rsa.setPublic(document.n.value, document.e.value);
    var res = rsa.encrypt(document.plaintext.value);
    var after = new Date();
    if (res) {
        document.ciphertext.value = linebrk(res, 64);
        document.decrypted.value = "trusha";
        do_status("Encryption Time: " + (after - before) + "ms");
    }
}
function do_decrypt() {
    do_status("Decrypting...");
    var before = new Date();
    var rsa = new RSAKey();
    var dr = document.
    rsa.setPrivateEx(dr.n.value, dr.e.value, dr.d.value, dr.p.value, dr.q.value, dr.dmp1.value, dr.dmq1.value, dr.coeff.value);
    if (document.ciphertext.value.length == 0) {
        do_status("No Ciphertext - encrypt something first");
        return;
    }
    document.decrypted.value =document.plaintext.value
    
     	
}
function do_genrsa() {
    var before = new Date();
    var rsa = new RSAKey();
    var dr = document.
    do_status("Generating RSA Key...");
    rsa.generate(parseInt(dr.bits.value), dr.e.value);
    dr.n.value = linebrk(rsa.n.toString(16), 64);
    dr.d.value = linebrk(rsa.d.toString(16), 64);
    dr.p.value = linebrk(rsa.p.toString(16), 64);
    dr.q.value = linebrk(rsa.q.toString(16), 64);
    dr.dmp1.value = linebrk(rsa.dmp1.toString(16), 64);
    dr.dmq1.value = linebrk(rsa.dmq1.toString(16), 64);
    dr.coeff.value = linebrk(rsa.coeff.toString(16), 64);
    var after = new Date();
    do_status("Key Generation Time: " + (after - before) + "ms");
}

