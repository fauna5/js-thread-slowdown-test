thread-slowdown-test
====================

Get up and running
------------------

From the root directory, start the server with

    npm start

Load the test.html and go from there

Results
=======

OSX Chrome 33
--------------

| Generated     | Yield       | Hide Method     | Result |
| ------------- |-------------| ----------------|--------|
| *             | *           | minimise window |OK      |
| setInterval   | *           | background tab  |Paused  |
| websocket     | setTimeout  | background tab  |Slower. From 3s to 4s - CPU 10-12%|
| websocket     | postmessage | background tab  |OK - CPU 9% |

OSX FF 27
---------

| Generated     | Yield       | Hide Method     | Result |
| ------------- |-------------| ----------------|--------|
| setInterval   | *           | *               |Paused  |
| websocket     | *           | *               |OK |

OSX Safari 7
------------

| Generated     | Yield       | Hide Method     | Result |
| ------------- |-------------| ----------------|--------|
| websocket   	| *           | minimise, other app |Slows down, but catches up|
| websocket     | *           | background tab  |OK |
