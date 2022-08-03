import Link from "next/link"
// Admin dashboard
const index = () => {
  return (
    <div>
          <Link href={'/admin/registration'}>
            <a>
                <span>Registration</span>      
            </a>
              
          </Link>    
    </div>
  )
}

export default index