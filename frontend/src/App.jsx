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
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button>Register</button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App

