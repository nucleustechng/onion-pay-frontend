import React from 'react'
// import ChargeBacks from '../../components/chargebacks/ChargeBacks'
// import Refunds from '../components/refunds/Refunds'
import TransactionSect from '../../components/transactions/TransactionSect'
import useAuth from '../../useAuth'



const Transactions = () => {
  useAuth()
  // const router  = useRouter();

  // const isAuthenticated = useAppSelector((state:RootState) => state.login.isAuthenticated)

  // if (typeof window !== "undefined") {
  //   // import and use next/router here
  //   if(!isAuthenticated){
  //     router.push('/auth/signin')
  //   }
  // }

  return (
    <div>
      <div>
        <div className='w-[20rem] lg:w-[74rem]'>
          <TransactionSect/>
          {/* <Refunds/> */}
          {/* <ChargeBacks/> */}
        </div>

      </div>
    </div>
  )
}

export default Transactions