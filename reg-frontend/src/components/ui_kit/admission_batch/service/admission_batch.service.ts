import http from '../../../../lib/http-common'
import { IAdmissionBatch } from '../type/admission_batch.type';

const qs = require('qs');
const query = qs.stringify({
  fields: ['title', 'active'],
}, {
  encodeValuesOnly: true,
});


class AdmissionBatchService{
  async getall() {
     
      const ipath = `http://localhost:1337/api/admission-batches?${query}`
      console.log(ipath)
      
    const result = await http.get(ipath)

    const dataList:any[] = result.data.data
    //----------Parsing data------
   
      let admissionBatchList:IAdmissionBatch[]=[]
      
      dataList.map((value) => {
          const data = <IAdmissionBatch>{
              id: value.id,
              title: value.attributes.title,
              active:value.attributes.title,
          }
          admissionBatchList.push(
              data        
          )
      })
      console.log('admission batch data',admissionBatchList)
      return admissionBatchList
    }
}

export default new AdmissionBatchService

