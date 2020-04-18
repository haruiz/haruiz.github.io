---
layout: post
title: "ML Math Foundations: Part 1"
permalink: ml-math-foundations-part-1
date: 2020-04-17 12:34:42
comments: true
description: "ML-Math Foundations: Part 1"
keywords: ""
categories:

tags:

---


## Math Foundations

Such was previously mentioned, in machine learning, most of the models are statistical or mathematical, so consequently, you are probably wondering if I need to be a mathematician or statistician to start using it.
The answer to that question is NO, Several open-source libraries to do machine learning exist,  but it will be beneficial if you have some knowledge about Algebra Lineal, Multivariable calculus, and statistics to interpret the algorithms and be able to tune them (Play around with the parameters). In this section, I am going to do a review of some of the more relevant topics and explain their use in Machine learning.

> ## Linear Algebra

To begin our journey learning the bases of linear algebra {% cite 1 %}, let look at a simple problem fo getting started.  Imagine we have a system of two linear equations to solve: $$ a) x-2y = 6 $$ and $$ b) 3x + y = 4 $$. How can we do it? Well,  for some of you, it can be straightforward, for others could sound confusing. Different ways to do it exist; however, if we follow our intuition, we can initiate with a basic approach isolating $$ x $$ in the first equation and then use it to solve y in the second.
After solving $$ x $$ in the first equation, we get $$ x = 6 + 2y $$, now we can plug that into the second equation and do the same process for $$ y $$.
{% cite 2 %}


$$
\begin{aligned}
3(6+2 y)+y &=4 \\
18+7 y &=4 \\
y &=-2
\end{aligned}
$$

Solving for $$ x $$ gives $$ x=2 $$, so we have obtained a unique solution, $$ x=2 $$ ,$$ y=-2 $$.
In this section, we are going to learn about different techniques to solve this kind of problem and how linear algebra helps us to come with the solutions, but before going further, let start describing what linear algebra is about and why it is so useful in the field of machine learning.

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


{% footnotes [
    {"title" : "How to create customizable Liquid tags in Jekyll", "url": "https://blog.sverrirs.com/2016/04/custom-jekyll-tags.html"},
    {"title" : "Pytorch: Step by Step implementation 3D Convolution Neural Network", "url": "https://medium.com/@michaelchan_2146/pytorch-step-by-step-implementation-3d-convolution-neural-network-8bf38c70e8b3"}   
] %}


