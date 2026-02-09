import './App.css'
import { useState, useEffect } from 'react'
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
  useAuth,
} from '@clerk/clerk-react'
import { StreamChat } from 'stream-chat'
import axios from 'axios'

const streamApiKey = import.meta.env.VITE_STREAM_API_KEY
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function App() {
  const { user } = useUser()
  const { getToken } = useAuth()

  const [streamStatus, setStreamStatus] = useState('Not connected')
  const [channelStatus, setChannelStatus] = useState('')

  useEffect(() => {
    if (!user) return

    // ✅ Stream client MUST be here (effect scope)
    const chatClient = StreamChat.getInstance(streamApiKey)

    const connectStreamUser = async () => {
      try {
        // 1️⃣ Get Clerk session token
        const clerkToken = await getToken()

        // 2️⃣ Ask backend for Stream token (AUTHENTICATED)
        const response = await axios.post(
          `${apiUrl}/api/stream/token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${clerkToken}`,
            },
          }
        )

        const { token } = response.data

        // 3️⃣ Connect user to Stream
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.fullName || user.firstName || 'User',
            image: user.imageUrl,
          },
          token
        )

        console.log('✅ Stream user connected:', user.id)
        setStreamStatus(`Connected as ${user.fullName || user.firstName}`)

        // 4️⃣ Create / watch a channel
        const channel = chatClient.channel('messaging', 'general', {
          name: 'General Chat',
          members: [user.id], // add more userIds to test multi-user chat
        })

        await channel.watch()
        setChannelStatus('Channel "General Chat" created')

        // 5️⃣ Send a test message
        await channel.sendMessage({
          text: `Hello from ${user.fullName || user.firstName}! 🎉`,
        })

        setChannelStatus('Channel created & message sent ✅')
        console.log('✅ Message sent')
      } catch (error) {
        console.error('❌ Stream connection error:', error)
        setStreamStatus('Connection failed')
      }
    }

    connectStreamUser()

    // ✅ Proper cleanup
    return () => {
      chatClient.disconnectUser()
      console.log('🔌 Stream user disconnected')
    }
  }, [user, getToken])

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

        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ccc',
            maxWidth: '400px',
          }}
        >
          <h3>Stream Chat Status</h3>
          <p>
            <strong>Connection:</strong> {streamStatus}
          </p>
          {channelStatus && (
            <p>
              <strong>Channel:</strong> {channelStatus}
            </p>
          )}
        </div>
      </SignedIn>
    </>
  )
}

export default App
