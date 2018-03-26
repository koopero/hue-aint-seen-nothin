``` control
path: loopin/show/buffer
options:
  - analyzer_input
  - analyzer
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
