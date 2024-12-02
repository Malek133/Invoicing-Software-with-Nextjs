import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="w-full flex justify-center items-center my-48">
     <SignIn />   
    </main>
  
  )
}