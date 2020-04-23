import md5 from 'md5'; 
import CryptoJS from 'react-native-crypto-js';
 
//var iv = CryptoJS.enc.Hex.parse("AAAAAAAAAAAAAAAA");
//var key = CryptoJS.enc.Base64.parse("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
var AES_key = CryptoJS.enc.Utf8.parse('+q@5V{ED/Ct$d7v}');  

function encrypt(msgString, key) {
    // msgString is expected to be Utf8 encoded
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(msgString, key, 
        { iv: iv,  mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

function decrypt(ciphertextStr, key) {
    var ciphertext = CryptoJS.enc.Base64.parse(ciphertextStr);

    // split IV and ciphertext
    var iv = ciphertext.clone();
    iv.sigBytes = 16;
    iv.clamp();
    ciphertext.words.splice(0, 4); // delete 4 words = 16 bytes
    ciphertext.sigBytes -= 16;

    // decryption
    var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext}, key, {
        iv: iv
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
 
export function capFormData(data_dict){ 
    let form_data = new FormData(); 
    let data = JSON.stringify(data_dict) 
    const api_encrypt_data = encrypt(data, AES_key)
    console.log(api_encrypt_data)
    form_data.append('api_encrypt_data', api_encrypt_data) 
    return form_data
}

