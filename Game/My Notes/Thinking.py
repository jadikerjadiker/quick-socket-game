'''
June 5, 2016
Yes, apparently I still think in python.

I'm just used to how it splits everything up.

So the first decision was whether or not to use the tutorial given by socket.io to figure out how to do the app,...
or to instead use the setup given to me by Cloud9 to do everything.

After looking at the code Cloud9 has, it seems really complicated, and I have no idea what express is.
On the other hand, it looks more robust, and like it's built more for Cloud9, which is where I plan to develop this.
But, if I have no idea what I'm doing, then what's the point?

So right now I'm going to stick with the simple tutorial provided by socket.io and go from there.

Actually, the more I look at what Cloud9 has got, the more powerful it seems.

It might be best if I just dived in. The issue is that I don't know how to install what they did and what dependencies they used.
And then I see like 4 other documents that it looks like I need but I have no idea what they do or what they are.
Anything under the folder 'js' under the 'client' folder, I don't know what it is.

Again, sticking with what I know.
'''

'''
June 5 2016

The goal today (a very lofty one) is to make it so when you load the website, a block appears that you can move around with arrows,...
and it will draw the other blocks that have joined on the screen in the correct position.

Just a basic test to make sure that what I want to do is even possible, or hopefully feasible.

So what's the basic arcitecture of this thing?

Whenever something changes on the browser, it tells the server.

Then, whenever a browser wants to draw the screen, it gets the info from the server and draws what it needs.
'''

'''
June 6 2016

So, how should this server be set up?
I have no idea what I'm doing when it comes to communication and architecture.

Right now, I have a drawing loop set up, where the server and the sockets constantly call eachother to redraw.

I think that's probably the best option right now.

I could also set it up so that the server monitors all the connections and then checks to make sure they've all updated and then broadcasts to everyone else to draw.
But that seems slow, especially if one of the sockets is slow.

So, I'm thinking in the gameMap variable, it's actually a dictionary with the socket as the key, and the value is a table/list that holds a bunch of information.
I can have the table be open and have a set amount of things in the front of the table that will be drawn by the sockets.

Or, what I think I should do, is have one index of the table have the key "drawable" and the sockets loook through each other socket for their drawable and tell it to run its draw function.

The hard part is going to be when there's a lot of stuff going on off-screen.

Right now, I'm going to look at the HTML for diep and agar and see if I can decipher anything.

Nope. It all looks crazy to me. I'll stick with what I can figure out for now.
'''