## Recorder

The `recorder` utility 'renders' a buffer as a sequence of image files, then uses **ffmpeg** to convert them into an mp4 file. In doing so, the clock will be slowed to render each frame precisely.

Results are saved to [./data/recorder/](/loopin/file/data/recorder/).

``` control
path: logic/recorder
subs:
  start:
    type: trigger

  rate:
    options: [ 8, 15, 30, 60 ]

  count:
    type: slider
    min: 30
    max: 600
    precision: 0
    pow: 2.2

  buffer:
    options:
      - convert_show
      - convert_output
      - analyzer 
```