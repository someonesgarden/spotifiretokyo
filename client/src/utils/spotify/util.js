import moment from 'moment';

export default{

    isObject(obj) {
    return obj instanceof Object && Object.getPrototypeOf(obj) === Object.prototype;
    },

    p_outCSV(filename, targets) {
        this.c_exportExcels(filename, this.p_preprocess4CSV_vertical(targets));
    },

    p_preprocess4CSV(targets){
        let result = [];
        if(targets instanceof Array){
            //Array
            let elm0 = targets[0];
            let keys = Object.keys(elm0).map(key=>key);
            targets.map(target=> result.push(keys.map(key=> target[key])));
            result = [keys,...result];
        }else{
            //Object
            let keys = [], vals = [];
            Object.keys(targets).map(key=>{
                keys.push(key);
                let val = targets[key];
                vals.push(val);
            });
            result = [keys,vals];
        }
        return result;
    },

    p_outCSV_vertical(params,seeds,option) {
        let params_ary = this.p_preprocess4CSV_vertical('params',params);
        let seeds_ary = this.p_preprocess4CSV_vertical('seeds',seeds);
        let option_ary = this.p_preprocess4CSV_vertical('option',option);
        this.c_exportExcels_vertical('analyse_', [...params_ary, ...option_ary,...seeds_ary]);
    },

    p_preprocess4CSV_vertical(type, targets){
        let result = [];
        if(targets instanceof Array){
            targets.map(target=> { result.push([type, target['type'], target['id']]);});
        }else{
            //Object
            Object.keys(targets).map(key=>{result.push([type, key,targets[key]])});
        }
        return result;
    },

    c_exportExcels_vertical(filename, csv_array){
        let csv_string = "";
        csv_array.map(elm=> {csv_string += elm.join(",")+'\r\n'});
        let formatted_date = moment(new Date).format('YYYYMMDDHHmm_');
        //Google Spreadsheet : 変換
        let csv_contents_gs = csv_string;
        let blob_gs = new Blob([csv_contents_gs] , {type: "text/csv;charset=utf-8;"});
        let link_gs = document.createElement('a');
        link_gs.href = window.URL.createObjectURL(blob_gs);
        link_gs.download = filename+"_"+formatted_date+'.csv';
        link_gs.click();
    },


    c_exportExcels(filename, csv_array){
        let csv_string = "";
        csv_array.map(elm=> {csv_string += elm.join("\t")+'\r\n'});
        let formatted_date = moment(new Date).format('YYYYMMDDHHmm_');

        //BOM追加
        let csv_string_excel = "\ufffe" + csv_string; //UTF-16
        let array_excel = [];
        for (let i=0; i<csv_string_excel.length; i++) array_excel.push(csv_string_excel.charCodeAt(i));
        let csv_contents_excel = new Uint16Array(array_excel);

        let blob_excel = new Blob([csv_contents_excel] , {type: "text/csv;charset=utf-16;"});
        let link_excel = document.createElement('a');
        link_excel.href = window.URL.createObjectURL(blob_excel);
        link_excel.download = "Excel_"+filename+"_"+formatted_date+'.csv';
        link_excel.click();

        //Google Spreadsheet : 変換
        let csv_contents_gs = csv_string;
        let blob_gs = new Blob([csv_contents_gs] , {type: "text/csv;charset=utf-8;"});
        let link_gs = document.createElement('a');
        link_gs.href = window.URL.createObjectURL(blob_gs);
        link_gs.download = "Google_"+filename+"_"+formatted_date+'.csv';
        link_gs.click();
    },
}
