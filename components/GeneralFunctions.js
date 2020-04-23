import md5 from 'md5';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'react-native-crypto-js';

 
 
export function capFormData(data_dict){ 
    let form_data = new FormData();
    for(var key in data_dict){
        form_data.append(key, data_dict[key])
    }
    let tmp = ''.concat(new Date().getHours(), new Date().getDate()) 
     // getizp+KHRe+eEWnUsEdHg==,  81EB62CE9F8A1D17BE7845A752C11D1E
    const api_security_key = md5(tmp)
    form_data.append('api_security_key', api_security_key) 
    const secretData = '123456'   
    var key  = CryptoJS.enc.Hex.parse("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    var iv   = CryptoJS.enc.Hex.parse("AAAAAAAAAAAAAAAA");
    //var key  = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    //var iv   = "00000000000000000000000000000000";
    let ciphertext = CryptoJS.AES.encrypt(secretData, key, { iv: iv });
    // ciphertext = CryptoJS.AES.encrypt(secretData, key, {iv: iv, padding: CryptoJS.pad.NoPadding});
 
    console.log({ciphertext: ciphertext.ciphertext.toString(), iv: ciphertext.iv.toString(), key: ciphertext.key.toString()})


    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key, { iv: iv });
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(ciphertext.toString(), originalText)

    form_data.append('test_key', ciphertext) 
    return form_data
}