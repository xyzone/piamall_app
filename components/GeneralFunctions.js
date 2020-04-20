export function capFormData(data_dict){
    let form_data = new FormData();
    for(var key in data_dict){
        form_data.append(key, data_dict[key])
    }
    return form_data

}