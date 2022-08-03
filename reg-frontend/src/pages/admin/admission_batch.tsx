import Head from 'next/head';
import AdmissionBatchTable from '../components/admission_batch/admission_batch_table';
import NewAdmissionBatch from '../components/admission_batch/new_admission_batch';
import SideBar from '../components/dashboard/sidebar';
import { IAdmissionBatch } from '../types/admission_batch';
import { getAdmissionBatch, useAdmissionBatch } from '../utils/admission_batch';
import {QueryClient,dehydrate,useQuery} from 'react-query'



interface Props { 
  initialData: IAdmissionBatch[]
}



export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('admission_batch', getAdmissionBatch)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}


const AdmissionBatch = () => {
  const  queryInfo = useAdmissionBatch()
 
  console.log('--------Admission Batch-----------')
  console.log(queryInfo)

  if (queryInfo.isLoading)
    return (<div>Loading...</div>)
  if (queryInfo.isError)
    return (<div>Error</div>)
  if (queryInfo.isSuccess)
  return (
    <div>
      <Head>
        <title>Admission Batch</title>
      </Head>
      <div className='flex flex-row mt-5'>
      <SideBar />
      <div className='flex flex-col w-full items-center'>
          <div className='flex flex-row space-x-10 items-center'>
            <h1 className='text-2xl'> Admission Batches</h1>
            <NewAdmissionBatch/>
          </div>
          
        <div className='w-full'>
          <AdmissionBatchTable data={queryInfo.data!} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdmissionBatch