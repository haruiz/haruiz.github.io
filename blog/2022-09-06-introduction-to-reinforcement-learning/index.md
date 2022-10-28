---
title: Introduction to Reinforcement Learning
slug: introduction-to-reinforcement-learning
draft: true
description: Introduction to Reinforcement Learning
authors: [haruiz]
tags: [python, data-science]
---

I'm so excited about this topic. I have been learning about Reinforcement Learning for a while taking a course in my Ph.D. and I would like to share my knowledge with you. I will do my best to going through the basics of Reinforcement Learning, how to implement it in Python and also share some resources that I have found useful to learn about this topic. I hope as I do you enjoy this journey.

# Machine Learning

The idea that we learn by interacting with our environment is probably the first to come to our mind when we think about the nature of learning. We learn by interacting with our enviroment, we learn by doing. This is the idea behind Reinforcement Learning. Reinforcement Learning is a branch of Machine Learning that is focused on learning by interacting with our enviroment. In this post, I will try to explain the basics of Reinforcement Learning and how to implement it in Python.

When we think about learning in machine learning context, it is related on how our algorithm is able to establish rules based on patterns found in the data that are discovered in different ways:

# TODO discuss here the different ways to discover patterns in data

**Supervised Learning:** The algorithm is presented with observations that have been labeled, its goal to learn the relationship between the provided features and the labels.


# what is Reinforcement Learning?

Richard S. Sutton and Andrew G. Barto define Reinforcement Learning as:

Systems that wants something, that adapts its behaviour to achieve that goal, and that receives feedback about its performance. Thi was the idea of a "hedonistic" learning systems, or as we call it today, Reinforcement Learning.

The problem of learning from interaction to achieve goals is still far from being solved, but our understanding of it has improved significantly in the last few years, thanks to some new ideas that have been placed  such as temporal-difference, dynamic programming and function approximation that are considered key to explore further how to approach this problem. In this posts series, I will try to explain some of thse concepts and how they are the foundations of the reinforcement learning algorithms.   

Explore the computational aspects to learn from interaction based on the foundations of the "hedonistic" learning systems.
However rarer than try to study the aspects behind how people or animals learn, RL as research area is focus on explore idealized learning situations and evaluate the effectiveness of various learning methods.

Reinforcement Learning is a subfield of Machine Learning that is concerned with how an agent can learn to take actions in an environment to maximize the total reward. The agent is a software that interacts with the environment and the environment is the world that the agent is living in. The agent takes actions in the environment and the environment gives the agent feedback in the form of rewards. The agent learns to take actions that maximize the total reward.

In summary Reinforcement learning is learning what to do—how to map situations to actions—so as to maximize a numerical reward signal. The learner is not told which actions to take, but instead must discover which actions yield the most reward by trying them. add reference to the book...

So the different algorithms and techniques are around the fact that: 

"...The learner is not told which actions to take, but instead must discover which actions yield the most reward by trying them.."


Reinforcement learning is different from supervised learning. In supervised learning, the learner is given a set of inputs and the desired outputs, and the goal is to learn a mapping from the inputs to the outputs. In reinforcement learning, the learner is given a set of inputs and a numerical reward signal, and the goal is to learn a mapping from the inputs to actions that maximize the total reward. 

In interactive problems is often impractical to obtain examples of the desired output for every possible input as a response of an agent performing an specific action in the environment. In reinforcement learning, the learner must discover the desired output by trial and error, learning by its own experience.

# Exploration and Exploitation

What made reinforcement learning different from other kinds of learning , is the trade-off between exploration and exploitation. The agent must learn to balance between exploring the environment to find new actions that may lead to high rewards and exploiting the actions that are known to lead to high rewards. This trade-off is known as the exploration-exploitation dilemma.

# context
Another key feature of reinforcement learning in comparison with others approaches, where they are focusin try to solve an specific task without takimg in consideration how it might fit in the big picture. in RF it considers the whole problem of a goal-directed agent inetracting with its environment as a single learning problem. This is known as the context of the problem. In other words, the agent is not only learning to maximize the reward, but also learning how to act in the environment. This is the context of the problem.


# Reinforcement Learning Applications



# Element of reinforcement learning

Beyond of the agent and the environment, there are four main elements in a reinforcement learning system:

# Policy

The policy is the agent's strategy for selecting actions. The policy is a function that maps from the agent's current state to the action that the agent should take. The policy is the agent's brain. The policy is the agent's strategy for selecting actions. The policy is a function that maps from the agent's current state to the action that the agent should take. The policy is the agent's brain.

# Reward signal

The reward signal is a numerical value that the agent receives from the environment in response to its actions. The reward signal is the agent's only feedback signal. The reward signal is a numerical value that the agent receives from the environment in response to its actions. The reward signal is the agent's only feedback signal. It indicates to the agenct if the performed action was good or bad. 
# Value function    

We seek for action that bring about states of highest value (over the long run), not highest reward.

Rewards are given directly by the enviroment as a response of performa anction, but values must be estimated and re-estimated from the sequence of observation and agent makes over its entire lifetime.

# Model of the environment

