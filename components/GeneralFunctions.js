import CryptoJS from 'react-native-crypto-js';
 
//var iv = CryptoJS.enc.Hex.parse("AAAAAAAAAAAAAAAA");
//var key = CryptoJS.enc.Base64.parse("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
var AES_key = CryptoJS.enc.Utf8.parse('8uDkMr.aK)x3zR*!^c+JYMx:');  

export function encrypt(msgString, key=AES_key) {
    // msgString is expected to be Utf8 encoded
    var iv = CryptoJS.lib.WordArray.random(16);
    var encrypted = CryptoJS.AES.encrypt(msgString, key, 
        { iv: iv,  mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

export function decrypt(ciphertextStr, key=AES_key) {
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
 
export function capPostData(data_dict){ 
    let form_data = new FormData(); 
    let data = JSON.stringify(data_dict) 
    const api_encrypt_data = encrypt(data) 
    form_data.append('api_encrypt_data', api_encrypt_data) 
    return form_data
}
 
export function capPostDataNoEncry(data_dict){
    let form_data = new FormData();  
    for (var key in data_dict){
        form_data.append(key, data_dict[key])
    } 
    return form_data
}