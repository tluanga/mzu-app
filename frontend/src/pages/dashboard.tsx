
import React from 'react'
import NewTable from '../components/admission_batch/new_table'
import SampleTable from '../components/admission_batch/sample_table'

import SideBar from '../components/dashboard/sidebar'


const Dashboard = () => {
  return (
    <div>
      {/* <SampleTable/> */}
      <NewTable/>
      <SideBar/>
         
    </div>
  )
}

export default Dashboard