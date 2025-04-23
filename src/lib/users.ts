'use server'
import { auth, clerkClient } from '@clerk/nextjs/server'

export const fetchAllUsers = async () => {
    const { userId } = await auth()
    if (!userId) {
        return { message: 'No Logged In User' }
    }

    try {
        const client = await clerkClient()        
        const res = await client.users
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        return []
    }
}