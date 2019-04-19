$(document).ready(function () {
    var cp = "";
    $('#set_512e3').click(function () {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_512e3",
            success: function (result) {
                console.log(result)
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#Q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#set_512f4').click(function () {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_512f4",
            success: function (result) {
                console.log(result)
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#Q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#set_1024e3').click(function () {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_1024e3",
            success: function (result) {
                console.log(result)
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#Q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#set_1024f4').click(function () {
        $.ajax({
            type: "GET",
            url: "/Experiment/set_1024f4",
            success: function (result) {
                console.log(result)
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#Q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });
    $('#do_genrsa').click(function () {
        item = {}
        item["bits"] = $('#bits').val();
        item["e"] = $('#e').val();
        console.log(item)
        $.ajax({
            type: "POST",
            url: "/Experiment/do_genrsa",
            data: JSON.stringify(item),
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                console.log(result)
                if (result.n == "") { alert("INVALID BITS OR E ENTERED!"); }
                $('#n').val(result.n);
                $('#e').val(result.e);
                $('#d').val(result.d);
                $('#p').val(result.p);
                $('#Q').val(result.q);
                $('#dmp1').val(result.dmp1);
                $('#dmq1').val(result.dmq1);
                $('#coeff').val(result.coeff);
            }
        });
    });

    $('#encrypt').click(function () {
        item = {}
        item["n"] = $('#n').val();
        item["e"] = $('#e').val();
        item["plaintext"] = $('#plaintext').val();
        console.log(item)
        $.ajax({
            type: "POST",
            url: "/Experiment/encrypt",
            data: JSON.stringify(item),
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                console.log(result)
                $('#ciphertext').val(result.ciphertext);
                $('#decrypted').val(result.decrypted);
            },
            error: function(result) {
                console.log(result)
            }
        });
    });
    $('#decrypt').click(function () {
        item = {}
        item["n"] = $('#n').val();
        item["e"] = $('#e').val();
        item["d"] = $('#d').val();
        item["p"] = $('#p').val();
        item["q"] = $('#Q').val();
        item["ciphertext"] = cp;
        console.log(item);
        // item["dmp1"] = $('#dmp1').val();
        // item["dmq1"] = $('#dmq1').val();
        // item["coeff"] = $('#coeff').val();
        $.ajax({
            type: "POST",
            url: "/Experiment/decrypt",
            data: JSON.stringify(item),
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                console.log(result)
                $('#decrypted').val(result.decrypted);
            },
            error: function(result) {
                console.log(result);
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
        document.decrypted.value = "";
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
    var res = rsa.decrypt(document.ciphertext.value);
    var after = new Date();
    if (res == null) {
        document.decrypted.value = "*** Invalid Ciphertext ***";
        do_status("Decryption failed");
    }
    else {
        document.decrypted.value = res;
        do_status("Decryption Time: " + (after - before) + "ms");
    }
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
