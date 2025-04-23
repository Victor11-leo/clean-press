'use client'
import { Bell, LogOut, Package } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Header = () => {
    const {user} = useUser()  
  return (
    <header className=" border-b bg-background sticky top-0 z-30">
        <div className="flex h-16 items-center px-4">          
            <div className="flex items-center gap-2 font-bold text-xl ml-2">
            <div className="bg-primary text-primary-foreground p-1 rounded">
                <Package className="h-5 w-5" />
            </div>
            <span>Usafi Bora</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
            <div className="space-y-1">                
                <SignOutButton>
                    <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                    <LogOut className="h-5 w-5" />                    
                    </Button>
                </SignOutButton>                
                </div>
            <Avatar className="h-8 w-8">
                <AvatarImage src={user?.imageUrl} alt="User" />
                <AvatarFallback>{user?.firstName}</AvatarFallback>
            </Avatar>
            </div>
        </div>
        </header>
  )
}

export default Header