---
layout: post
title: "Linear Algebra (Vectors & Matrices)"
permalink: en/vectors-matrices
date: 2020-05-05 14:47:56
comments: true
description: "vectors-matrices"
keywords: ""
categories:
lang: "en"
tags:
---
   
Linear algebra is all about vectors, matrices, and their transformation in the space. So, in this post, we will immerse ourselves in that fascinating world, learn how the vectors and matrices are represented, and what kind of operations we can do with them. 

Before starting to navigate deep into the definitions, let define what a vector space is.

**Vector space**: We can think about vector spaces as a collection of objects called vectors, which can be used to represents locations, physical forces, or numerical quantities. So, the number of components of the vectors defines the number of dimensions of the vector space. 
 
**Vector:** A vector is a set of elements where each element represents a dimension inside a defined space; they have magnitude and direction. 
The magnitude defines the length of the vector,  and the direction the orientation of it.
In other words, we can think of vectors as identifying points in space, with each element giving the coordinate along a different axis. For instance,  we could define our location in the world using the vector $$ \vec{l}= [x, y, z ] $$. Typically, we give vectors lowercase names in bold typeface (such as $$ \vec{x} $$). 

In Machine Learning, vectors are extremely important since we describe our data observations using them (data points). For example, Imagine we have a dataset with the information of 1000 diabetes patients; for each, we collected his age, sex, stratum, number of siblings, weight, etc. Then we have 1000 vectors in the form
patient = [ age, sex, stratum, number of siblings, weight]

**Vector Operations**

To add or subtract two vectors, we add or subtract the corresponding components. 
Let $$ \vec{u}=\left\langle u_{1}, u_{2}\right\rangle $$ and $$ \vec{v}=\left\langle v_{1}, v_{2}\right\rangle $$ be two vectors. Then, the sum of $$\vec{u}$$ and $$\vec{v}$$ is the vector: $$\vec{u}+\vec{v}=\left\langle u_{1}+v_{1}, u_{2}+v_{2}\right\rangle $$ and the difference of $$\vec{u}$$ and $$\vec{b}$$ is: $$\vec{u} - \vec{b} =\left\langle u_{1}-v_{1}, u_{2}-v_{2}\right\rangle $$.
This might sound complicated, but it is not. Doing arithmetic calculations on vectors is simply doing arithmetic operations on their components.

***Numerical example***

Find (a) $$\vec{u} + \vec{v}$$ and (b) $$\vec{u} - \vec{v}$$ if $$\vec{u} = \left\langle 3,4 \right\rangle $$ and  $$\vec{v} = \left\langle 5,-1 \right\rangle $$

$$
\begin{aligned}
For (a):
\vec{u}+\vec{v} =\left\langle u_{1}+v_{1}, u_{2}+v_{2}\right\rangle \\ =\langle 3+5,4+(-1)\rangle \\ =\langle 8,3\rangle
\end{aligned}
$$

$$
\begin{aligned}
For (b):
\vec{u}+\vec{v} =\left\langle u_{1}+v_{1}, u_{2}-v_{2}\right\rangle \\ =\langle 3 - 5,4 -(-1)\rangle \\ =\langle -1,5\rangle
\end{aligned}
$$

***python implementation***
{% code %}
import numpy as np
def sub_vectors(a: list, b: list) -> []:
    assert len(a) == len(b), "Invalid vectors size"
    result = []
    for x,y in zip(a, b):
        result.append(x-y)
    return result
if __name__ == '__main__':
    a, b = [1,2,3], [4,5,6]
    print('the result is:' % sub_vectors(a, b))
    # using numpy
    print('the result is:' % np.asarray(a) - np.asarray(b))    
{% endcode %}