import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { forwardRef } from 'react';
import './Message.css';

const Message = forwardRef(({ message, username }, ref) => {
  const isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card className={isUser ? 'message__userCard' : 'message__guestCard'}>
        {/* //! hem isUser and login yapan kişi aynı ise messajlar bir tarafta diğer mesajlar başka tarafta olacak şekilde style'a condition ekledik */}
        <CardContent>
          <Typography color='black' variant='h5' component='div'>
            {/* //! message yazan ben isem; ismi gösterme, başka biri yazıyorsa göster  */}
            {!isUser && `${message.username || 'Unknown User'}:`} {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
