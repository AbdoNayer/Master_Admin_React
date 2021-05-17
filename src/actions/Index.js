import axios from "axios";
import CONST from "../const/api";

const Index = async ( dataVal, nameApi, val ) => {

   return await axios({
        url         : CONST.url + nameApi,
        method      : val,
        data        : dataVal
    });

}

export default Index
