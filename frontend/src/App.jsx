import './App.css'
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut
} from '@clerk/clerk-react'

function App() {
  return (
    <>
      <h1>Welcome to TalentQ</h1>

      <SignedOut>
        <SignInButton mode="modal" />
        <Button>Login</Button>
        <SignUpButton mode="modal" />
        <Button>Register</Button>
      </SignedOut>

      <SignedIn>
        <SignedOutButton />
      </SignedIn>
      <UserButton />
    </>
  )
}

export default App
