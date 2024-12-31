import { useState, useRef } from 'react'
import { Video, VideoOff, Mic, MicOff, Send } from 'lucide-react'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const strangerVideoRef = useRef(null)
  const userVideoRef = useRef(null)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: inputMessage }])
      setInputMessage('')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-xl border border-gray-200">
        
        {/* Video Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          
          {/* User Video (Preview on Left) */}
          <div className="relative bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
            {isVideoOn ? (
              <video ref={userVideoRef} className="w-full h-full object-cover rounded-lg" autoPlay muted loop>
                <source src="/placeholder.svg" type="video/mp4" />
              </video>
            ) : (
              <VideoOff className="w-16 h-16 text-gray-500" />
            )}
            {/* Video and Mic Toggle for User */}
            <div className="absolute bottom-3 left-3 flex space-x-3">
              <button 
                onClick={() => setIsVideoOn(!isVideoOn)} 
                className="p-3 bg-white rounded-full shadow-md"
              >
                {isVideoOn ? <Video className="w-5 h-5 text-blue-500" /> : <VideoOff className="w-5 h-5 text-red-500" />}
              </button>
              <button 
                onClick={() => setIsAudioOn(!isAudioOn)} 
                className="p-3 bg-white rounded-full shadow-md"
              >
                {isAudioOn ? <Mic className="w-5 h-5 text-blue-500" /> : <MicOff className="w-5 h-5 text-red-500" />}
              </button>
            </div>
          </div>

          {/* Stranger Video (Right Side) */}
          <div className="relative bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
            <video ref={strangerVideoRef} className="w-full h-full object-cover rounded-lg" autoPlay muted loop>
              <source src="/placeholder.svg" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white px-6 pt-4 pb-2">
          <div className="h-40 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-gray-100">
            {messages.length === 0 ? (
              <p className="text-gray-500">Looking for people online...</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Controls */}
          <form onSubmit={handleSendMessage} className="flex items-center mt-4 space-x-4">
            
            {/* Skip Button */}
            <button 
              type="button"
              className="p-3 px-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Skip
            </button>

            {/* Message Input */}
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {/* Send Button */}
            <button 
              type="submit"
              className="p-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center transition"
            >
              <Send className="w-5 h-5 mr-2" />
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
