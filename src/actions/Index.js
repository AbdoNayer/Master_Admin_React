import axios from "axios";
import CONST from "../const/api";

const Index = async ( data, nameApi, val ) => {

   return await axios({
        url         : CONST.url + nameApi,
        method      : val,
        data        : { data }
    })
    // .then(response => {
    //     console.log('response ---', response.data)
    // }).catch((err) => {
    //     console.log('err ---', err)
    // });

}

export default Index
