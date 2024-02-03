

# GLSL
### source: https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html


GLSL stands for Graphics Library Shader Language. It's the language shaders are written in. It has some special semi unique features that are certainly not common in JavaScript. It's designed to do the math that is commonly needed to compute things for rasterizing graphics. So for example it has built in types like vec2, vec3, and vec4 which represent 2 values, 3 values, and 4 values respectively. Similarly it has mat2, mat3 and mat4 which represent 2x2, 3x3, and 4x4 matrices. You can do things like multiply a vec by a scalar.

```
vec4 a = vec4(1, 2, 3, 4);
vec4 b = a * 2.0;
// b is now vec4(2, 4, 6, 8);
``````
Similarly it can do matrix multiplication and vector to matrix multiplication

```
mat4 a = ???
mat4 b = ???
mat4 c = a * b;
 
vec4 v = ???
vec4 y = c * v;
```
It also has various selectors for the parts of a vec. For a vec4

```
vec4 v;
v.x is the same as v.s and v.r and v[0].
v.y is the same as v.t and v.g and v[1].
v.z is the same as v.p and v.b and v[2].
v.w is the same as v.q and v.a and v[3].
```
It is able to swizzle vec components which means you can swap or repeat components.

```
v.yyyy
```
is the same as
```
vec4(v.y, v.y, v.y, v.y)
```

Similarly
```
v.bgra
```
is the same as

```
vec4(v.b, v.g, v.r, v.a)
```
when constructing a vec or a mat you can supply multiple parts at once. So for example

```
vec4(v.rgb, 1)
```
Is the same as

```
vec4(v.r, v.g, v.b, 1)
```
Also
```
vec4(1)
```
Is the same as
```
vec4(1, 1, 1, 1)
```

One thing you'll likely get caught up on is that GLSL is very type strict.

```
float f = 1;  // ERROR 1 is an int. You can't assign an int to a float
```
The correct way is one of these

```
float f = 1.0;      // use float
float f = float(1)  // cast the integer to a float
```
The example above of vec4(v.rgb, 1) doesn't complain about the 1 because vec4 is casting the things inside just like float(1).

GLSL has a bunch of built in functions. Many of them operate on multiple components at once. So for example

```
T sin(T angle)
```
Means T can be float, vec2, vec3 or vec4. If you pass in vec4 you get vec4 back which the sine of each of the components. In other words if v is a vec4 then

```
vec4 s = sin(v);
```
is the same as

```
vec4 s = vec4(sin(v.x), sin(v.y), sin(v.z), sin(v.w));
```
Sometimes one argument is a float and the rest is T. That means that float will be applied to all the components. For example if v1 and v2 are vec4 and f is a float then

```
vec4 m = mix(v1, v2, f);
```
is the same as

```
vec4 m = vec4(
  mix(v1.x, v2.x, f),
  mix(v1.y, v2.y, f),
  mix(v1.z, v2.z, f),
  mix(v1.w, v2.w, f));
```

