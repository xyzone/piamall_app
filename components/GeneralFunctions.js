import md5 from 'md5';

export function capFormData(data_dict){
    let form_data = new FormData();
    for(var key in data_dict){
        form_data.append(key, data_dict[key])
    }
    let tmp = ''.concat(new Date().getHours(), new Date().getDate()) 
    const api_security_key = md5(tmp)
    form_data.append('api_security_key', api_security_key) 
    return form_data
}