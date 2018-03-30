``` control
path: loopin/window/fullscreen
type: trigger
title: Fullscreen
toggle: true
hide: all
```

``` control
path: loopin/osd/enabled
type: trigger
title: OSD
toggle: true
hide: all
```


# How to make a _bunch_ of colours oughta nothin'

``` control
path: loopin/show/buffer
hide: all
options:
  - convert_input_bears
  - convert_input_leds
```
## USE ALL THE COLOURS!!!!

# RGB Colour 

``` control
path: loopin/show/buffer
hide: all
options:
  - colour
```

``` control
path: loopin/render/lamps/texture/src/buffer
hide: all
options:
  - colour
```

``` control 
path: loopin/uniform/vec3/colour
hide: all
subs:
  red: { type: float }
  green: { type: float }
  blue: { type: float }
```


# Random RGB Colours 

How about just picking random **RGB** values?

``` control
path: loopin/show/buffer
hide: all
options:
  - random_colour
```

``` control
path: loopin/render/lamps/texture/src/buffer
hide: all
options:
  - random_colour
```

``` control 
path: logic/random_colour
hide: all
type: trigger
title: Randomize
```

## Implementation 

``` glsl
void main() {
  OUT.r = random();
  OUT.g = random();
  OUT.b = random();
}
```


## Advantages
- Lazy as heck.

## Disadvantages 
- Inconsistent brightness.
- No continuity between colours. 
- Results are literally noise. 

# The Colour Wheel

``` control
path: loopin/show/buffer
hide: all
options:
  - slide_wheel_1
  - slide_wheel_2
  - slide_wheel_3  
```


# HLS 

Also known as **HSL** or **HSB**. Colours composed of three values: **Hue**, **Lightness** ( or Brightness ) and **Saturation**.

``` control
path: loopin/show/buffer
hide: all
options:
  - analyzer
  - wheel
```

``` control
path: loopin/render/lamps/texture/src/buffer
hide: all
options:
  - analyzer_input
```

``` control 
path: loopin/mesh/wheel/arc/cols
hide: all
options: 
  - 6
  - 100
```

``` control
path: loopin/render/analyzer_input/texture/src/buffer
hide: all
options:
  - spectrum_hls
```

``` control 
path: loopin/uniform/float
hide: all
subs:
  lightness: 
    type: float

  saturation: 
    type: float

```

## Implementation

``` glsl
vec3 hueToRGB( float hue ) {
  hue = fract( hue );
  hue *= 6.0;
  float rising = fract( hue );
  float falling = 1.0 - rising;

  // Red -> Yellow
  if ( hue < 1.0 ) return vec3( 1.0, rising, 0.0 );

  // Yellow -> Green  
  if ( hue < 2.0 ) return vec3( falling, 1.0, 0.0 );

  // Green -> Cyan  
  if ( hue < 3.0 ) return vec3( 0.0, 1.0, rising );

  // Cyan -> Blue  
  if ( hue < 4.0 ) return vec3( 0.0, falling, 1.0 );

  // Blue -> Magenta  
  if ( hue < 5.0 ) return vec3( rising, 0.0, 1.0 );

  // Magenta -> Red
  return vec3( 1.0, 0.0, falling );
}

void main() {
  float q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  float p = 2 * l - q;

  OUT.rgb = hueToRGB( hue ) * ( q - p ) + p;
}
```

## Advantages
- Ubiquitous. Found in almost every colour picked.
- Used in CSS.
- Easily reversible. 
- Easy to implement.
- `l == 0` and `l == 1` guarantees black and white, regardless of `s`. 

## Disadvantages 
- Inconsistent power across spectrum.
- Orange not represented well. 
- Not compatible with unclamped values. 
- Knee at `l == 0.5`.
- Gimbal locks at both `l == 0` and `l == 1`.


# Standard HSV

A close relative of **HLS**. Composed of **Hue**, **Saturation** and **Value**. 

``` control
path: loopin/show/buffer
hide: all
options:
  - analyzer
  - wheel
```

``` control
path: loopin/render/lamps/texture/src/buffer
hide: all
options:
  - analyzer_input
```

``` control 
path: loopin/mesh/wheel/arc/cols
hide: all
options: 
  - 6
  - 100
```

``` control
path: loopin/render/analyzer_input/texture/src/buffer
hide: all
options:
  - spectrum_hsv_standard
```

``` control 
path: loopin/uniform/float
hide: all
subs:
  value: 
    type: float
  saturation: 
    type: float
```

## Unclamped settings

Unlike **HLS**, value and saturation are not limited to 0 -> 1 range.

``` control 
path: loopin/uniform/float
hide: all
subs:
  value: 
    type: float
    max: 2
  saturation: 
    type: float
    max: 2
```

## Implementation 

``` glsl
void main() {
  OUT.rgb = ( value - saturation * value ) + hueToRGB( hue ) * saturation * value ;
}
```

## Advantages
- Mathmatically more skookum than HLS.
- Unclamped values work, except `s < 0`.
- Easily reversible. 

## Disadvantages 
- Same spectral problems as HLS.

# RGB -> HSV -> RGB Conversion 

As well as generating colours, **HLS** and **HSV** colour spaces can be used to manipulate images. First, we convert an image from **RGB** to **HSV**, then manipulate values and convert back to **RGB**.

``` control 
path: loopin/render/convert_input/texture/src/buffer
hide: all
options:
  - convert_input_bears
  - convert_input_leds
  - slide_wheel_2
  - slide_wheel_3 
  - squarebear
    
```

``` control
path: loopin/show/buffer
hide: all
options:
  - convert_input
  - convert_show
  - convert_output  
```

``` control 
path: loopin/render/convert_show/int/channel 
hide: all
options:
  - 0
  - 1
  - 2
  - 3
```

``` control 
path: loopin/render/convert_output/shader
options:
  - convert_hsv_rgb
  - convert_hsv_rgb_sin
```

``` control 
path: loopin/render/convert_output/float
hide: all
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



# Triangular HSV

``` control
path: loopin/show/buffer
hide: all
options:
  - analyzer
  - wheel
```

``` control
path: loopin/render/analyzer_input/texture/src/buffer
hide: all
options:
  - spectrum_hsv_standard
  - spectrum_hsv_triangle
```

``` control 
path: loopin/mesh/wheel/arc/cols
hide: all
options: 
  - 3
  - 6
  - 100
```



``` control 
path: loopin/uniform/float
hide: all
subs:
  value: 
    type: float
    max: 2
  saturation: 
    type: float
    max: 2
```

## Advantages
- Consistent power across spectrum.

## Disadvantages 
- Muddy secondaries. 
- Reversal may result in `v > 1`. 

# Sinusoidal HSV

``` control
path: loopin/render/analyzer_input/texture/src/buffer
hide: all
options:
  - spectrum_hsv_sin
```

``` control
path: loopin/show/buffer
hide: all
options:
  - analyzer
  - wheel
```

## Implementation 

``` glsl
float sinusoidalChannel( float hue, float offset ) {
  return pow( cos( ( hue - offset ) * PI * 2.0 ) * 0.5 + 0.5, power ); 
}

vec3 hueToRGB( float hue ) {
  return vec3( 
    sinusoidalChannel( hue, shift.r / 360 ),
    sinusoidalChannel( hue, shift.g / 360 ),
    sinusoidalChannel( hue, shift.b / 360 )
  );
}
```

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

## Shift primary points

By tuning offsets of colour channels, can produce interesting colours.

``` control 
path: loopin/uniform/vec3/shift
subs:
  g: 
    type: float
    unit: deg
    max: 360
  b: 
    type: float
    unit: deg
    max: 360
```

``` control 
path: loopin/uniform/vec3/shift
title: reset
trigger: 
  r: 0
  g: 120
  b: 240
```

## Advantages
- Nice, soft colours.
- Easy to implement.
- Better power totalling than straight HSV. 
- Tweakable by shifting angle offsets.
- You get to use the word *sinusoidal* in polite conversation.

## Disadvantages 
- Computational pricey.
- Hard to get both primary and secondary colours.
- Not reversible. 

# FastLED Rainbow HSV

Useful implementation of HSV, designed specifically for LED output. See [FastLED HSV Colors](https://github.com/FastLED/FastLED/wiki/FastLED-HSV-Colors).

``` control
path: loopin/render/analyzer_input/texture/src/buffer
hide: all
options:
  - spectrum_hsv_fastled
```

``` control 
path: loopin/mesh/wheel/arc/cols
hide: all
options: 
  - 6
  - 8
  - 100
```

``` control
path: loopin/show/buffer
hide: all
options:
  - analyzer
  - wheel
```

``` control 
path: loopin/uniform/float
subs:
  value: 
    type: float
    max: 1
  saturation: 
    type: float
    max: 1
```

## Implementation

``` c++
#include <FastLED.h>

void loop() {
  // Settings in 0-255 range.
  leds[0] = CHSV( hue, saturation, value );
}
```

## Advantages
- Looks better than standard HSV
- Computationally easier than HSV. ( No divide by 6 )
- Tight implementation on Arduino.

## Disadvantages 
- Not widely used, except on Arduino.
- More difficult to reverse. 


# Arbitrary Spectrum HSV

Instead of converting **Hue** to **RGB** with an equation, just use a texture lookup.

``` control
path: loopin/render/analyzer_input/texture/src/buffer
hide: all
options:
  - spectrum_hsv_arb
```

``` control 
path: loopin/mesh/wheel/arc/cols
hide: all
options: 
  - 6
  - 8
  - 100
```

``` control
path: loopin/show/buffer
hide: all
options:
  - analyzer
  - wheel
```

``` control
path: loopin/pixels/palette_arb/data 
type: pixels
hide: all
channels: rgb
cols: 8
rows: 1
```

Values and saturation controls are the same.

``` control 
path: loopin/uniform/float
hide: all
subs:
  value: 
    type: float
    max: 1
  saturation: 
    type: float
    max: 1
```

For even finer control, we can tweak the definition of `white`.

``` control 
path: loopin/uniform/vec3/white
hide: all
subs:
  red:
    type: float
    min: 0.75
  green:
    type: float
    min: 0.75
  blue:
    type: float
    min: 0.75
```

``` control 
path: loopin/uniform/vec3/white
title: Reset
hide: all
trigger:
  red: 1
  green: 1
  blue: 1
```

## Implementation

``` glsl
vec3 hueToRGB( float hue ) {
  return Texture( paletteSampler, vec2( hue, 0.0 ) ).rgb;
}

void main() {
  OUT.rgb = white * ( value - saturation * value ) + hueToRGB( hue ) * saturation * value ;
}
```

## Advantages
- Very flexible.
- Fast ( used hardware texture filtering ).

## Disadvantages 
- Requires picking and tuning of spectrum components. 


# Conclusions 

- There are a bunch of ways of making a bunch of colours.
- Asthetics are more important than science.
- If you need to make a bunch of colours, you must first define the universe in which those colours exist.
- Sinusoidal HSV is fun, easy and beautiful.
- FastLED has a really cool HSV implementation.
- Arbitrary spectrum HSV is fast and flexible.


# Thanks for watching!