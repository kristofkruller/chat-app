import React from 'react';
import { 
  MultiChatSocket, 
  MultiChatWindow, 
  useMultiChatLogic 
 } from 'react-chat-engine-advanced';

import Header from '@/components/header';

const Chat = () => {

  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    "dummy",
    "P4ssw0rd"
  )

  return (
    <div style={{flexBasis: "100%"}}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow 
        {...chatProps}
        style={{height: "100vh"}}
        renderChatHeader={chat => <Header chat={chat}/>}
      />
    </div>
  )
}

export default Chat