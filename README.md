# quick-socket-game
A collab game made with my friends for my friends (or other people who like it)

The code is in the folder called Game.

The Cloud9Tutorial shows a much more complicated way to do essentially the same thing that we have implemented in Game.

To run it, go into the Game folder, run "index.js" and wait until it prints "listening on *:8080".
Then, go to https://quick-socket-game-jadiker.c9users.io  (there's also a link at the top of the terminal where you ran "index.js")

At the time of writing (6/29/16) you should be able to type in a username, hit submit,...
and be presented with a circle that can move around with the arrow keys.

If there's only one person online, it won't look like you're moving (since there's no background).
So,  I recommend creating a few tabs of people with different names and moving around so you can see how it works.


As for commenting style, I use "todo" for things that may be broken or need to be done, and "upgrade" for things that may change, or may not.
Sometimes you may see commented out console logs. I prefer to keep them there so I don't have to retype them if I need to debug.
They also help comment and keep track of what's going on. If there's something confusing without a comment, check to make sure it doesn't have a console.log inside of it or...
in this case, sometimes a socket.emit('log', someMessage) if I want the message to show up on the server side.
(I can't inspect element on the Chromebook, so I try to forward stuff to the server if I don't have access to another computer.)

I'm also just getting used to using Git, and may make a few mistakes or do things weird, so if I do, just let me know.

"so'ed" is short for "Stack overflowed" which means I probably don't know how exactly the code works, but it does what I need it to.