thread-slowdown-test
====================

Get up and running
------------------

From the root directory, start the server with

    npm start

Load the test.html and go from there

Results
=======

Chrome OSX 33
--------------

| Generated     | Yield       | Hide Method     | Result |
| ------------- |-------------| ----------------|--------|
| *             | *           | minimise window |OK      |
| setInterval   | *           | background tab  |Paused  |
| websocket     | setTimeout  | background tab  | slower 3 -> 4 seconds |
| websocket     | postmessage | background tab  | OK |

FF OSX 27
---------

| Generated     | Yield       | Hide Method     | Result |
| ------------- |-------------| ----------------|--------|
| setInterval   | *           | *               |Paused  |
| websocket     | *           | *               |OK |
