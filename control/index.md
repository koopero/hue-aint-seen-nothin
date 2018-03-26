``` control
path: loopin/show/buffer
options:
  - analyzer_input
  - analyzer
  - convert_input
  - convert_result
  - convert_show
  - convert_output
```

# Conversion 

``` control 
path: loopin/render/convert_input/texture/src/buffer
options:
  - convert_input_bears
  - convert_input_leds
```

``` control 
path: loopin/render/convert_show/int/channel 
options:
  - 0
  - 1
  - 2
  - 3
```

``` control 
path: loopin/render/convert_output/float
subs:
  hueShift:
    type: float
  satShift:
    type: float
    min: -0.5
    max: 0.5
  satMult:
    type: float
    max: 2

```




# Spectrum Analyzer


``` control
path: loopin/render/analyzer_input/texture/src/buffer
options:
  - spectrum_hls
  - spectrum_hsv_sin
```

# Spectrums 

## HLS 

## HSV

## FastLED Rainbow



## Sinusoidal HSV

### Advantages
- Nice, soft colours.
- Easy to implement.
- Better power totalling than straight HSV. 
- Tweakable by shifting angle offset.
- With any luck, you get to use the word *sinusoidal* in conversation.

### Disadvantages 
- Computational pricey (?).
- Dull secondary colours, especially yellow.
- Not reversible. 

``` control 
path: loopin/uniform/float
subs:
  value: 
    type: float
    max: 2
  saturation: 
    type: float
    max: 2
  power:
    type: float
    min: 0.2
    max: 3
```



``` control 
path: loopin/uniform/vec3/shift
subs:
  r: 
    type: float
    unit: deg
    max: 360
  g: 
    type: float
    unit: deg
    max: 360
  b: 
    type: float
    unit: deg
    max: 360

```
