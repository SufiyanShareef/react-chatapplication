import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'

const Conversations = () => {
  const { loading,conversations } = useGetConversations();
  console.log("CONVERSATIONS:", conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation,idx) => (
        <Conversation 
        key={conversation._id} 
        conversation={conversation} 
        emoji={getRandomEmoji()}
        lastIdx={idx === conversation.length-1}
        />
      )
     )}
      {loading ? <span className="loading loadign-spinner mx-auto"></span>:null}
    </div>
  )
}

export default Conversations


//Starter code for conversations.jsx
// import Conversation from './Conversation'
// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//       <Conversation/>
//       <Conversation/>
//       <Conversation/>
//       <Conversation/>
//     </div>
//   )
// }

// export default Conversations