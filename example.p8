pico-8 cartridge // http://www.pico-8.com
version 16
__lua__
key_names = {
 'left',
 'right',
 'up',
 'down',
 '🅾️',
 '❎'
}

function _draw()
 cls(13)
 print('btn test', 48, 4, 10)
 
 for i=1,6 do
  if btn(i-1) then
   print(
    key_names[i]..
    ' ('..(i-1)..')'..
    ' is pressed',
    8*4,
    6*2*(i+1),
    10
   )
  end
 end
end

