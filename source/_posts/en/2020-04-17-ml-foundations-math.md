---
layout: post
title: "Linear Algebra (Introduction)"
permalink: en/ml-math-foundations-part-1
date: 2020-04-17 12:34:42
comments: true
description: "ML-Math Foundations: Part 1"
keywords: ""
lang: "en"
categories:
tags: ml
---
Such was previously mentioned, In others posts,  in machine learning, most of the models are statistical or mathematical, so consequently, you are probably wondering if I need to be a mathematician or statistician to start using it.
The answer to that question is NO, Several open-source libraries to do machine learning exist,  but it will be beneficial if you have some knowledge about Algebra Lineal, Multivariable calculus, and statistics to interpret the algorithms and be able to tune them (Play around with the parameters). In this section, I am going to explain why Linear algebra is relate with ML and why is important.

### Getting Started

To begin our journey learning the bases of linear algebra, let look at a simple problem fo getting started.  Imagine we have a system of two linear equations to solve: $$ a) x-2y = 6 $$ and $$ b) 3x + y = 4 $$. How can we do it? Well,  for some of you, it can be straightforward, for others could sound confusing. Different ways to do it exist; however, if we follow our intuition, we can initiate with a basic approach isolating $$ x $$ in the first equation and then use it to solve y in the second.
After solving $$ x $$ in the first equation, we get $$ x = 6 + 2y $$, now we can plug that into the second equation and do the same process for $$ y $$.

$$
\begin{aligned}
3(6+2 y)+y &=4 \\
18+7 y &=4 \\
y &=-2
\end{aligned}
$$

Solving for $$ x $$ gives $$ x=2 $$, so we have obtained a unique solution, $$ x=2 $$ ,$$ y=-2 $$.
In this section, we are going to learn about different techniques to solve this kind of problem and how linear algebra helps us to come with the solutions, but before going further, let start describing what linear algebra is about and why it is so useful in the field of machine learning.

### What is Linear Algebra?

According to Wikipedia {% cite 1 %}, Linear Algebra is the branch of mathematics concerning linear equations such as: $$ a_{1} x_{1}+\cdots+a_{n} x_{n}=b $$
linear functions such as: $$ \left(x_{1}, \ldots, x_{n}\right) \mapsto a_{1} x_{1}+\ldots+a_{n} x_{n} $$, and their representations through matrices and vector spaces. 
Understanding these concepts,  you going to acquire the confidence and the intuition necessary to understand how most of the machine learning algorithms works, for instance, K-means, KNN, SVM, etc.

### Why is linear algebra important in ML?

Having some understanding of Linear algebra and Calculus gives us a better intuition about how ML algorithms work and their implementation. Especially because, in theory, most of them are based on matrix transformations, vectors, and linear functions. Further, it takes us in a privileged position where we can decide which to use for solving a particular problem, and how to face it. So if you want to be a successful data scientist or machine learning engineering, my suggestion is to spend some time digging into the essential concepts.

![PCA](./../img/pca.gif)

### Online Resources to learn

- [Brilliant - Linear Algebra Course](https://brilliant.org/courses/linear-algebra/){:target="_blank"}
- [Khan Academy - Linear Algebra Course](https://www.khanacademy.org/math/linear-algebra){:target="_blank"}
- [3Blue1Brown - Essence of linear algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab){:target="_blank"}
- [MIT - Gilbert Strang lectures on Linear Algebra ](https://www.youtube.com/playlist?list=PL49CF3715CB9EF31D){:target="_blank"}
 


{% footnotes [
    {"title": "Linear Algebra", "url": "https://en.wikipedia.org/wiki/Linear_algebra"}
] %}

