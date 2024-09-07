import React from 'react'
import { Navigate, Route} from 'react-router-dom'
import RoutesWithNotFonud from '../../utils/routes-with-not-found'
import { PrivateRoutes } from '../../models/routes'
import RootPage from './RootPage'



const RouteProtector: React.FC = () => {
  return (
    <RoutesWithNotFonud>
        <Route path='/' element={<Navigate to={PrivateRoutes.HOME} />} />
        <Route path={PrivateRoutes.HOME} element={<RootPage />} />
    </RoutesWithNotFonud>
  )
}

export default RouteProtector
