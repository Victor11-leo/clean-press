'use client'
import React, { useState } from 'react'
import UserDashboard from '@/components/pages/user/page'
import AdminDashboard from '@/components/pages/admin/page'
import RiderDashboard from '@/components/pages/rider/page'
import { useUser } from '@clerk/nextjs'

const page = () => {
  // const {user} = useUser()
  // const role = user?.publicMetadata?.role
  const role = "user"
  
  return (
    <div>
      {role == 'user' && <UserDashboard/>}
      {role == 'admin' && <AdminDashboard/>}
      {role == 'rider' && <RiderDashboard/>}
    </div>
  )
}

export default page