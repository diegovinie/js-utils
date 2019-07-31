// Diffie-Hellman example

var a = BigInt(1031)
var b = BigInt(1507)
var p = BigInt(27449)
var g = BigInt(4570547430045956)

var bigA = (g ** a) % p

var bigB = (g ** b) % p

var aK = (bigB ** a) % p

var bK = (bigA ** b) % p

// same solution used for encrypt
aK === bK
