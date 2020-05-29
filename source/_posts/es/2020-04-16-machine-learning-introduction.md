---
layout: post
title: "Introducción a Machine Learning"
permalink: es/machine-learning-introduction
date: 2020-04-16 22:48:44
comments: true
lang: "es"
description: "A wonderful serenity has taken possession of my entire soul"
keywords: "machine learning"
categories: deep learning
tags:

---
In 1833 Charles Babbage, the renowned English mathematician, known as "father of the computer," invented the "Analytical Engine," a mechanical machine that was capable of processing arithmetic operations, control flow instructions, and loops, making it the first design for a general-purpose computer. {% cite 1 %}
This brilliant invention would be the precursor of great ideas that emerged later and would mark the evolution of computing.
For instance, years later, lady Ada Lovelace would describe a sequence of operations for solving mathematical problems using Babbage's invention. Ada remarked that "The Analytical Engine has no pretensions to originate anything. It can do whatever we know how to order it to perform", a statement that was cited later by the AI pioneer Alan Turing in his publication "Computing Machinery and Intelligence." {% cite 2 %}
In that landmark publication, where the England mathematician introduced the Turing test as well, he was quoting Ada Lovelace while pondering whether general-purpose computers could be capable of learning and originality, and he came to the conclusion that they could.{% cite 3 %}
Machine learning arises from this question: could a computer go beyond "what we know how to order it to perform" and learn on its own how to perform a specified task? Could a computer surprise us? Rather than programmers crafting data-processing rules by hand, could a computer automatically learn these rules by looking at data?  This question opens the door to a new programming paradigm. 
Let start defining the essential concepts required for understanding how the ML algorithms work and the kind of problems we can face.

{% timeline [
        {
            "title": "Blaise Pascal", 
            "content":"Blaise Pascal was 19 when he made an “arithmetic machine” for his tax collector father. It could add, subtract, multiply, and divide. Three centuries later, the IRS uses machine learning to combat tax evasion", 
            "year": 1642,
            "image": "../img/pascal.jpeg"
        },
        {
            "title": "Gottfried Wilhelm", 
            "content":"German mathematician, philosopher, and occasional poet Gottfried Wilhelm Leibniz devised the system of binary code that laid the foundation for modern computing.", 
            "year": 1679,
            "image": "../img/Gottfried.jpeg"
        },
         {
             "title": "The Turk", 
             "content":"A moving, mechanical device designed to imitate a human. “The Turk” fooled even Napoleon into thinking it could play chess. The jig was up in 1857 when The Turk’s final owner revealed how a person hidden inside moved its arms.", 
             "year": 1770,
             "image": "../img/Turk.jpg"             
         },
          {
           "title": "Thomas Bayes", 
           "content":"Several vital concepts in machine learning derive from probability theory and statistics, and they root back to the 18th century. In 1763, English statistician Thomas Bayes set out a mathematical theorem for probability, which came to be known as Bayes Theorem that remains a central concept in some modern approaches to machine learning.", 
           "year": 1763,
           "image": "../img/bayes.png"
            },
           {
               "title": "Charles Babbage", 
               "content":"Englishman Charles Babbage conceived a general all-purpose device that could be programmed with punched cards. His Analytical Machine was never built, yet nearly all modern computers rely on its logical structure.", 
               "year": 1834,
               "image": "../img/charlesbabbage.jpg"
           },
           {
              "title": "Ada Lovelace", 
              "content":"The 27-year-old mathematician described a sequence of operations for solving mathematical problems using Charles' Babbage's theoretical punch-card machine.  In the 70s, the US Department of Defense paid homage, naming a new software language Ada.", 
              "year": 1842,
              "image": "../img/ada-lovelace-290.jpeg"
          },
          {
            "title": "George Boole", 
            "content":"Philosopher and closet mystic George Boole created a form of algebra in which all values can be reduced to “true” or “false.” Essential to modern computing, Boolean logic helps a CPU decide how to process new inputs.", 
            "year": 1847,
            "image": "../img/220px-George_Boole_color.jpg"
         },
         {
             "title": "Fritz Lang", 
             "content":"Set in 2026 Berlin, Fritz Lang’s expressionist sci-fi film “Metropolis” introduced moviegoers to the idea of a thinking machine. His character, “False Maria,” was the first robot ever depicted on film.", 
             "year": 1927,
             "image": "../img/Fritz.jpg"
         },        
          {
              "title": "Alan Turing", 
              "content":"English mathematician Alan Turing’s papers were full of ideas on machine intelligence. “Can machines think?” was the first question about he started to write. In 1950, he suggested a test for machine intelligence, later known as the Turing Test, in which a machine is called “intelligent” if its responses to questions could convince a human.", 
              "year": 1936,
              "image": "../img/turing.png"
          },
         {
             "title": "Warren McCulloch", 
             "content":"A neurophysiologist and a mathematician co-wrote a paper on how human neurons might work. To illustrate the theory, they modeled a neural network with electrical circuits. In the 1950s, computer scientists would begin applying the idea to their work", 
             "year": 1943,
             "image": "../img/warren.jpg"
         },
         {
          "title": "Arthur Samuel", 
          "content":"Machine learning pioneer Arthur Samuel created a program that helped an IBM computer get better at checkers the more it played. Machine learning scientists often use board games because they are both understandable and complex.", 
          "year": 1952,
          "image": "../img/samuel.jpg"
          },
           {
            "title": "Frank Rosenblatt", 
            "content":"Noted American psychologist Frank Rosenblatt’s Perceptron was an early attempt to create a neural network with the use of a rotary resistor (potentiometer) driven by an electric motor. The machine could take an input (such as pixels of images) and create an output (such as labels).",
            "year": 1957,
            "image": "../img/Rosenblatt_21.jpg"
            }, 
            {
            "title": "Kunihiko Fukushima", 
            "content":"The neocognitron was introduced by Kunihiko Fukushima in 1980, this introduced two basic types of layers in CNNs: convolutional layers, and downsampling layers. A convolutional layer contains units whose receptive fields cover a patch of the previous layer. ",
            "year": 1957,
            "image": "../img/Fukushima.jpg"
            },                  
            {
              "title": "Yann André Lecun", 
              "content":"in  1989 Yann LeCun used back-propagation to learn the convolution kernel coefficients directly from images of hand-written numbers. Learning was thus fully automatic, performed better than manual coefficient design, and was suited to a broader range of image recognition problems and image types. This approach became a foundation of modern computer vision.", 
              "year": 1989,
              "image": "../img/lecun.jpg"
          },    
           {
               "title": "Geoffrey Hinton", 
               "content":"When his field fell off the academic radar, computer scientist Geoffrey Hinton rebranded neural net research as “deep learning.” Today, the internet’s heaviest hitters use his techniques to improve tools like voice recognition and image classification.", 
               "year": 2006,
               "image": "../img/Geoffrey.jpg"
           },
           {
           "title": "AT&T scientists", 
           "content":"n 2006, Netflix offered $1M to anyone who could beat its algorithm at predicting consumer film ratings. The BellKor team of AT&T scientists took the prize three years later, beating the second-place team by mere minutes.", 
           "year": 2009,
           "image": "../img/netflix_winners.jpg"
           },
            {
          "title": "Watson IBM", 
          "content":"Though not a perfect player, IBM’s Watson did manage to outwit two Jeopardy! champions in a three-day showdown. Plans for this technology include powering a computerized doctor’s assistant.", 
          "year": 2011,
          "image": "../img/watson.jpg"
          },
         {
        "title": "Google’s AlphaGo", 
        "content":"Google’s AlphaGo was the first program to best a professional player at Go, considered the most difficult board game in the world. With this defeat, computers officially beat human opponents in every classical board game", 
        "year": 2015,
        "image": "../img/alphago.jpeg"
        },
        {
        "title": "What's next in machine learning?", 
        "content":"How far this technology will take us remains to be seen, but applications in the works span everything from improving in-store retail experiences with IoT to boosting security with biometric data to predicting and diagnosing disease.", 
        "year": "2020",
        "image": "../img/future.jpg"
        }    
] | 6 | 200 | 300 %}
<br/>
<em>
Most of the text in this visualization was taken from [History of machine learning](https://cloud.withgoogle.com/build/data-analytics/explore-history-machine-learning/), I would like to extend my thanks for the valuable contribution.
</em>

<br/>


## A new Paradigm

**Traditional Programming:** In classical programming, the paradigm of symbolic AI, humans input rules (a program) and data to be processed according to these rules, and out come answers 

**Machine Learning:** With machine learning, humans input data as well as the answers expected from the data, and out come the rules. These rules can then be applied to new data to produce original answers.

## Definition

Machine learning is a field of computer science under the umbrella of artificial intelligence, which has evolved and experienced many transformations for decades, that is why we can find multiple definitions on the internet and the literature. In this post, I am going to provide my interpretation based on them.

**From a general perspective**, we could define Machine Learning as a discipline focused on describing how to build systems (Hardware/software) that can learn by themselves using some input data, further in the discovery of the mathematics-statistics-computation laws which govern this kind of systems (The learning process ).
 
On the other hand, **from an expert point of view**, do or apply Machine Learning consists of training a mathematical-statistic model to infer o predict the value of a numerical variable, which can be discrete or continuous depending on whether we are trying to solve classification, or regression problem, generally, using historical information and with the primary goal of explaining or understand a phenomenon, forecasting, or identify patterns in the data.

## Kind of problems



**Unsupervised Learning:** Inferring a function that describe the structure of the unlabeled data.

***common algorithms:***
<ol style="margin: 10px">
  <li>K-means</li>
  <li>k-Medians</li>
  <li>Expectation Maximisation (EM)</li>
  <li>Hierarchical Clustering</li>
</ol>

**Supervised Learning:** Learning a function that maps an input to an output based on example input-output parts

***common algorithms:***
<ol style="margin: 10px">
  <li>Nearest Neighbor</li>
  <li>Naive Bayes</li>
  <li>Decision Trees</li>
  <li>Linear Regression</li>
  <li>Support Vector Machines (SVM)</li>
  <li>Neural Networks</li>
</ol>


**Reinforcement learning** Area of machine learning concerned with how software agents ought to take actions in an environment in order to maximize the notion of cumulative reward. 


***common algorithms:***
<ol style="margin: 10px">
  <li>Q-Learning</li>
  <li>Temporal Difference (TD)</li>
  <li>Deep Adversarial Networks</li>
</ol>


## Applications

<ol style="margin: 10px">
<li>Virtual Personal Assistants</li>
<li>self-driving cars</li>
<li>Videos Surveillance</li>
<li>Email Spam and Malware Filtering</li>
<li>face detection</li>
<li>Search Engine Result Refining</li>
<li> Product Recommendations</li>
<li>Online Fraud Detection</li>
</ol>


If this is the first time you are reading about this topic, is very likely that the previous definitions and concepts sound obscure, maybe cloudy, and you can get confused quickly, so this is why before start thinking about the implementation of the algorithms or which is the best library or framework  to use, you need to  understand the foundations. So in the next post I am going to explain in detail the different type of problems and how to approach them.  

{% footnotes [
    {"title": "Analytical Engine", "url": "https://en.wikipedia.org/wiki/Analytical_Engine"},
    {"title": "Computing Machinery and Intelligence", "url": "https://academic.oup.com/mind/article/LIX/236/433/986238"},
    {"title": "Deep Learning with Python", "url": "https://www.manning.com/books/deep-learning-with-python"}    
] %}



