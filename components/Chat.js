import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import axios from "axios"
class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          createdAt: new Date(),
          image: 'data:image/png;base64,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',
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://scontent-lhr3-1.cdninstagram.com/v/t51.2885-15/e35/66110214_691108137979005_7964135820706926096_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&se=7&oh=5e5dae74d7ae018dc2d62555bbfd3c71&oe=5DEDF03A&ig_cache_key=MjA5Mzk5NjgzNTgyMjY4MTUzOA%3D%3D.2',
          },
        },
      ],
    })
  }

  onReceive(messages = []){
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  id(){
    return this.state.messages.length-1
  }

  onSend(messages = []) {
    let payload = {
          _id: this.id(),
          text: "",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Drica',
            avatar: 'https://scontent-lhr3-1.cdninstagram.com/v/t51.2885-15/e35/66110214_691108137979005_7964135820706926096_n.jpg?_nc_ht=scontent-lhr3-1.cdninstagram.com&se=7&oh=5e5dae74d7ae018dc2d62555bbfd3c71&oe=5DEDF03A&ig_cache_key=MjA5Mzk5NjgzNTgyMjY4MTUzOA%3D%3D.2',
          },
        }
    let self = this
    axios.post('https://drica-api-dev.azurewebsites.net//api/v1/message/send', 
      {message:messages[messages.length-1].text}
    )
    .then(function (response) {
      payload.text = response.data
      
        self.onReceive(payload)
    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}
export default Chat;
