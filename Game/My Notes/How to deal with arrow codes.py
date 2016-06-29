if (l or r or u or d):
    updatePlayer()
    if r:
        player.x+=1
    if u:
        player.y+=1
    etc...
    
    
    
OR

shouldRun = false
if r:
    player.x+=1
    shouldRun = true
if u:
    plyer.y+=1
    shouldRun = true
    
if l:
    plyer.y-=1
    shouldRun = true
    
if d:
    plyer.y-=1
    shouldRun = true
    
if shouldRun:
    updatePlayer()
etc...

OR

deltaX = 0
deltaY = 0
if r:
    deltaX+=1
if u:
    deltaY+=1
if not(deltaX==0 and deltaY==0):
    updatePlayer()

def func(thing):
    if thing()
    if thing==a:
        player.x+=1
    updatePlayer()