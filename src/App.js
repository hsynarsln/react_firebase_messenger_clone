import SendIcon from '@mui/icons-material/Send';
import { FormControl, IconButton, Input } from '@mui/material';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import FlipMove from 'react-flip-move';
import './App.css';
import db from './firebase';
import Message from './Message';

function App() {
  const [input, setInput] = useState(''); //! useState --> variable in React
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // console.log(input);
  // console.log(messages);

  //! useEffect --> run code on a condition in React
  //! GET DATA FROM FIREBASE
  useEffect(() => {
    //* run once when the app component
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        //? snapshot değişikliği algılar algılamaz run the code && all db documents in snapshot
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() }))); //? returns object { username: 'hsyn', text: 'hey guys' }
      });
  }, []); //* Only running page loads

  useEffect(() => {
    // const name = prompt("Please enter your name")
    setUsername(prompt('Please enter your name'));
  }, []); //? condition --> [] --> this code runs ONCE // [input] --> runs UPDATE

  const sendMessage = event => {
    //* all the logic to send a message goes
    event.preventDefault();

    //! SEND MESSAGE
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // setMessages([...messages, { username: username, text: input }]); //* keep all messages and append input
    setInput(''); //* clear input
  };

  return (
    <div className='App'>
      <img src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100' alt='messenger logo' />
      <h1>Hello</h1>
      <h2>Welcome {username}</h2>

      <form className='app__form'>
        <FormControl className='app__formControl'>
          {/* <InputLabel>Enter a message...</InputLabel> */}
          <Input className='app__input' placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)} />
          {/* //! disabled={!input} --> forma herhangi birşey yazılmadıysa boş değer gönderme */}
          <IconButton className='app__iconButton' disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
          {/* <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
            Send Message
          </Button> */}
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message username={username} message={message} key={id} />
          //! key={id} --> burada mesajların sırayla gelmesini sağlıyor. yoksa her defasında re-render yaptığı için karışık gönderiyor.
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
