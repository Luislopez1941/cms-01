import React from 'react'
import { Route} from 'react-router-dom'
import RoutesWithNotFonud from '../../utils/routes-with-not-found'
import RootPage from './RootPage'



const RouteProtector: React.FC = () => {
  return (
    <RoutesWithNotFonud>
        <Route path='/*' element={<RootPage />}/>

    </RoutesWithNotFonud>
  )
}

export default RouteProtector
