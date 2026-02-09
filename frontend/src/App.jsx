import './App.css'
import { useState, useEffect } from 'react'
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
  useUser
} from '@clerk/clerk-react'
import { StreamChat } from 'stream-chat'
import axios from 'axios'

const streamApiKey = import.meta.env.VITE_STREAM_API_KEY
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const { user } = useUser()
  const [streamStatus, setStreamStatus] = useState('Not connected')
  const [channelStatus, setChannelStatus] = useState('')

  useEffect(() => {
    if (!user) return

    const connectStreamUser = async () => {
      try {
        // Initialize Stream client
        const chatClient = StreamChat.getInstance(streamApiKey)

        // Get token from backend
        const response = await axios.post(`${apiUrl}/api/stream/token`, {
          userId: user.id
        })
        const { token } = response.data

        // Connect user to Stream
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.fullName || user.firstName || 'User',
            image: user.imageUrl
          },
          token
        )

        console.log('✅ Stream user connected:', user.id)
        setStreamStatus(`Connected as ${user.fullName || user.firstName}`)

        // Create a test channel
        const channel = chatClient.channel('messaging', 'general', {
          name: 'General Chat',
          members: [user.id]
        })

        await channel.watch()
        console.log('✅ Channel created:', channel.id)
        setChannelStatus('Channel "General Chat" created')

        // Send a test message
        await channel.sendMessage({
          text: `Hello from ${user.fullName || user.firstName}! 🎉`
        })
        console.log('✅ Message sent successfully')
        setChannelStatus('Channel created & message sent ✅')

        // Cleanup on unmount
        return () => {
          chatClient.disconnectUser()
        }
      } catch (error) {
        console.error('❌ Stream connection error:', error)
        setStreamStatus('Connection failed')
      }
    }

    connectStreamUser()
  }, [user])

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
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Stream Chat Status</h3>
          <p><strong>Connection:</strong> {streamStatus}</p>
          {channelStatus && <p><strong>Channel:</strong> {channelStatus}</p>}
        </div>
      </SignedIn>
    </>
  )
}

export default App


