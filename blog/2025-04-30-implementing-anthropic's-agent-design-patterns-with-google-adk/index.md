---
title: Implementing Anthropic’s Agent Design Patterns with Google ADK
slug: implementing-anthropic's-agent-design-patterns-with-google-adk
description: Agentic systems are rapidly becoming a core design pattern for LLM-powered applications, enabling dynamic reasoning, decision-making, and tool use. Inspired by Anthropic’s influential Building Effective Agents article, this post demonstrates the implementation of their proposed agent design patterns—such as prompt chaining, routing, and parallelization—using Google’s open-source Agent Development Kit (ADK). The guide provides practical, hands-on examples that illustrate how these patterns work and where they can be effectively applied.
authors: [haruiz]
tags: [python, agentic-systems, llm-agents, agent-development-kit, prompt-engineering, ai-workflows, autonomous-agents, multi-agent-systems, adk]
---

<!-- truncate -->


Anthropic’s <a href="#anthropic:1">"Building Effective Agents"[1]</a> article has quickly become a widely referenced guide for designing agentic systems, particularly because it introduces the conceptual and functional differences between Workflows and Agents.

:::quote[Anthropic]

**Workflows** are systems where LLMs and tools are orchestrated through predefined code paths. 
**Agents**, on the other hand, are systems where LLMs dynamically direct their own processes and tool usage, maintaining control over how they accomplish tasks.

::::

Workflows provide structure, determinism, and reproducibility—making them ideal for applications with well-defined logic and fixed execution paths. Agents, in contrast, offer flexibility and autonomy, enabling LLMs to direct their own reasoning, planning, and tool use to make decisions and solve problems. This autonomy makes agent-based systems especially effective in open-ended, interactive, or partially observable environments.

This post explores Anthropic’s proposed agent design patterns and shows how to implement them using Google’s open-source Agent Development Kit (ADK). ADK provides a flexible and extensible framework for building, orchestrating, and deploying LLM-powered agents, making it a practical choice for bringing these concepts into real-world applications.

:::tip[In This Post You Will Learn]

- The core differences between **Workflows** and **Agents**, as introduced by Anthropic, and when to use each approach
- How to implement six of the foundational agent design patterns from Anthropic’s article using Google ADK:
    - 🔁 **Prompt Chaining** for step-by-step task decomposition
    - 🔀 **Routing** for directing inputs to specialized agents
    - ⚡ **Parallelization** to run tasks concurrently using sectioning and voting
    - 🧠 **Orchestrator–Worker** pattern for dynamic task delegation and synthesis
    - 🧪 **Evaluator–Optimizer** loop for iterative refinement based on structured feedback
    - 🤖 **Autonomous Agents** that reason, plan, and act independently in open-ended environments
- How to integrate tools, memory, and execution loops using ADK framework
:::

## Hands-on Examples

The foundation for all the agent patterns explored and implemented in this post begins with a core building block: an augmented LLM equipped with tools, memory, and retrieval capabilities. This setup enables the agent to access external knowledge, retain contextual awareness over time, and interact with its environment through purposeful actions. These foundational capabilities will be integrated into the implementation of each agent pattern described in the following sections. The code snippet below demonstrates how to augment an LLM with a tool that retrieves the current weather and time—effectively transforming it into a functional agent.

```python
import datetime
from zoneinfo import ZoneInfo

from google.adk import Runner
from google.adk.agents import Agent
from dotenv import load_dotenv
from google.adk.artifacts import InMemoryArtifactService
from google.adk.sessions import InMemorySessionService
from google.genai import types
from rich.panel import Panel
from rich import print

load_dotenv(verbose=True)

def get_weather(city: str) -> dict:
    """Retrieves the current weather report for a specified city.

    Args:
        city (str): The name of the city for which to retrieve the weather report.

    Returns:
        dict: status and result or error msg.
    """
    if city.lower() == "new york":
        return {
            "status": "success",
            "report": (
                "The weather in New York is sunny with a temperature of 25 degrees"
                " Celsius (41 degrees Fahrenheit)."
            ),
        }
    else:
        return {
            "status": "error",
            "error_message": f"Weather information for '{city}' is not available.",
        }


def get_current_time(city: str) -> dict:
    """Returns the current time in a specified city.

    Args:
        city (str): The name of the city for which to retrieve the current time.

    Returns:
        dict: status and result or error msg.
    """

    if city.lower() == "new york":
        tz_identifier = "America/New_York"
    else:
        return {
            "status": "error",
            "error_message": (
                f"Sorry, I don't have timezone information for {city}."
            ),
        }

    tz = ZoneInfo(tz_identifier)
    now = datetime.datetime.now(tz)
    report = (
        f'The current time in {city} is {now.strftime("%Y-%m-%d %H:%M:%S %Z%z")}'
    )
    return {"status": "success", "report": report}


root_agent = Agent(
    name="weather_time_agent",
    model="gemini-2.0-flash",
    description=(
        "Agent to answer questions about the time and weather in a city."
    ),
    instruction=(
        "You are a helpful agent who can answer user questions about the time and weather in a city."
    ),
    tools=[get_weather, get_current_time],
)

# Example usage
if __name__ == '__main__':

    # --- Constants ---
    APP_NAME = "code_refinement_app"
    USER_ID = "user_123"
    SESSION_ID = "session_456"

    # --- Services ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()

    # Create session once
    session_service.create_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )

    # --- Runner Setup ---
    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service,
    )
    prompt = "What is the current weather in New York?"
    print(Panel.fit(f"[bold white]User Prompt[/bold white]: {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        if event.is_final_response() and event.content:
            response = event.content.parts[0].text
            print(Panel.fit(f"[bold green]{event.author}:[/bold green] {response}", title="🤖"))

```

## Workflow: Prompt chaining

The prompt chaining pattern consists of breaking a complex task into a series of smaller, manageable steps, where each step involves an LLM processing the output of the previous one. This sequential structure allows for greater control and reliability, as you can introduce programmatic checks—or “gates”—at any stage to validate intermediate results and keep the process aligned with the intended goal.

**When to use this pattern:**

Prompt chaining is ideal for scenarios where a task can be cleanly divided into discrete, well-ordered subtasks. It intentionally trades off some latency to gain higher accuracy by reducing the cognitive load on each individual model invocation.

:::tip[Example applications]
- Creating marketing content and then translating it into another language
- Drafting an outline, validating it against predefined criteria, and using it to generate a full document
:::

**ADK Implementation:**

In the following example, we implement a simple joke generation workflow that consists of three steps: generating a joke, improving it, and polishing it. Each step is handled by a separate agent, and the output of one agent is passed as input to the next.

```python
from typing import Optional, List, Dict
from dotenv import load_dotenv
from rich import print
from rich.panel import Panel

from google.adk import Runner
from google.adk.agents import LlmAgent, SequentialAgent
from google.adk.agents.callback_context import CallbackContext
from google.adk.artifacts import InMemoryArtifactService
from google.adk.models import LlmRequest, LlmResponse
from google.adk.sessions import InMemorySessionService
from google.genai import types

# --- Load environment variables ---
load_dotenv()

# --- Constants ---
BLOCKED_KEYWORDS = ["apple"]  # Extendable

# --- Agent Configs ---
AGENT_CONFIGS: List[Dict] = [
    {
        "name": "joke_generator",
        "description": "Generate a joke",
        "instruction": "Generate a joke based on the user prompt",
        "output_key": "joke",
        "temperature": 1.0
    },
    {
        "name": "joke_improver",
        "description": "Improve the joke",
        "instruction": "Make the joke funnier and more engaging",
        "output_key": "improved_joke",
        "temperature": 0.7
    },
    {
        "name": "joke_polisher",
        "description": "Polish the joke",
        "instruction": "Polish the joke, add a surprise twist at the end",
        "output_key": "polished_joke",
        "temperature": 0.5
    },
]

# --- Guardrail Callback ---
def on_before_model_callback(callback_context: CallbackContext, llm_request: LlmRequest) -> Optional[LlmResponse]:
    """
    Guardrail function to block inappropriate prompts.
    """
    prompt = llm_request.contents[0].parts[0].text.lower()
    print(Panel.fit(f"[bold magenta]Agent:[/bold magenta] {callback_context.agent_name}\n[bold cyan]Prompt:[/bold cyan] {prompt}"))

    for word in BLOCKED_KEYWORDS:
        if word in prompt:
            raise ValueError(f"❌ Prompt contains forbidden word: '{word}'. Please rephrase.")

    return None

# --- Agent Factory ---
def create_llm_agent(config: Dict) -> LlmAgent:
    return LlmAgent(
        name=config["name"],
        description=config["description"],
        model="gemini-2.0-flash",
        global_instruction=f"You are a {config['description'].lower()}.",
        instruction=config["instruction"],
        output_key=config["output_key"],
        generate_content_config=types.GenerateContentConfig(temperature=config["temperature"]),
        before_model_callback=on_before_model_callback
    )

# --- Create Sequential Workflow ---
joke_agents = [create_llm_agent(cfg) for cfg in AGENT_CONFIGS]
joke_workflow = SequentialAgent(
    name="joke_generator_workflow",
    description="Generate, improve, and publish a joke",
    sub_agents=joke_agents
)

# --- Set root agent for the web user interface ---
root_agent = joke_workflow

# --- Execution Handlers ---
def call_agent(prompt: str):
    """
    Run the agent workflow with a user prompt.
    """
    print(Panel.fit(f"[bold white]User Prompt:[/bold white] {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        if event.is_final_response() and event.content:
            print(Panel.fit(f"[bold green]{event.author}:[/bold green] {event.content.parts[0].text}", title="🤖"))

def inspect_state():
    """
    Inspect and print the internal session state.
    """
    state = runner.session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID).state
    print(Panel.fit("[bold yellow]Session State[/bold yellow]"))
    for key, value in state.items():
        print(f"[cyan]{key}[/cyan]:\n{value}\n")

# --- Main Execution ---
if __name__ == '__main__':
    APP_NAME = "joke_generator_app"
    USER_ID = "dev_user_01"
    SESSION_ID = "dev_user_session_01"

    # --- Session & Runner Setup ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()

    session_service.create_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )

    runner = Runner(
        agent=joke_workflow,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service
    )

    try:
        call_agent("Tell me a robot joke")
        inspect_state()
    except Exception as e:
        print(Panel.fit(f"[bold red]Error:[/bold red] {str(e)}", title="❌"))

```

## Workflow: Routing

The routing pattern involves classifying the incoming task/prompt and directing them to the most appropriate follow-up LLM/Agent call. This approach promotes modularity and specialization, enabling more tailored prompts for each category. Without routing, attempts to optimize for one input type often degrade performance for others due to overly generalized prompts.

**When to use this pattern:**

Routing is particularly effective for tasks involving clearly distinguishable input categories that benefit from separate handling. It works best when accurate classification can be achieved—whether through an LLM, rule-based logic, or a traditional machine learning classifier.

:::tip[Example applications]
- Handling customer service inquiries by directing general questions, refund requests, and technical issues to different prompt flows or tools
- Forwarding simple, frequently asked questions to lightweight models like Claude 3.5 Haiku, while sending complex or edge cases to more capable models like Claude 3.5 Sonnet to balance speed and cost
:::

**ADK Implementation:**

In this example, we implement a routing agent that delegates tasks to sub-agents based on the topic of the user prompt. The routing agent uses a simple keyword-based classification to determine which sub-agent to invoke.

```python
from dotenv import load_dotenv
from rich import print
from rich.panel import Panel
from typing import Optional, List, Dict

from google.adk import Runner
from google.adk.agents import LlmAgent
from google.adk.agents.callback_context import CallbackContext
from google.adk.artifacts import InMemoryArtifactService
from google.adk.models import LlmRequest, LlmResponse
from google.adk.sessions import InMemorySessionService
from google.genai import types

# --- Load environment ---
load_dotenv()

# --- Constants ---
BLOCKED_KEYWORDS = ["apple"]

# --- Router Config: Define Routing Sub-Agents ---
ROUTER_CONFIG: List[Dict] = [
    {
        "name": "joke_generator",
        "description": "Generate a joke",
        "instruction": "Generate a joke based on the user prompt",
        "output_key": "joke",
        "temperature": 1.0
    },
    {
        "name": "song_generator",
        "description": "Generate a song",
        "instruction": "Generate a song based on the user prompt",
        "output_key": "song",
        "temperature": 1.0
    },
    {
        "name": "poem_generator",
        "description": "Generate a poem",
        "instruction": "Generate a poem based on the user prompt",
        "output_key": "poem",
        "temperature": 1.0
    }
]

# --- Guardrail Callback ---
def on_before_model_callback(callback_context: CallbackContext, llm_request: LlmRequest) -> Optional[LlmResponse]:
    prompt = llm_request.contents[0].parts[0].text.lower()
    print(Panel.fit(f"[bold magenta]Agent:[/bold magenta] {callback_context.agent_name}\n[bold cyan]Prompt:[/bold cyan] {prompt}"))

    for word in BLOCKED_KEYWORDS:
        if word in prompt:
            raise ValueError(f"❌ Prompt contains forbidden word: '{word}'. Please rephrase.")

    return None


# --- Helper: Agent Factory from Router Config ---
def create_llm_agent(config: Dict) -> LlmAgent:
    return LlmAgent(
        name=config["name"],
        description=config["description"],
        model="gemini-2.0-flash",
        global_instruction=f"You are a {config['description'].lower()}.",
        instruction=config["instruction"],
        output_key=config["output_key"],
        generate_content_config=types.GenerateContentConfig(temperature=config.get("temperature", 1.0)),
        before_model_callback=on_before_model_callback
    )

# Create sub-agents from config
sub_agents = [create_llm_agent(cfg) for cfg in ROUTER_CONFIG]

# --- Router Agent ---
router_instruction = (
    "You are a router agent.\n"
    "Given the user prompt, decide whether it's a request for a joke, song, or poem, and delegate accordingly.\n"
    "Use only the appropriate sub-agent based on the topic.\n"
)

router_agent = LlmAgent(
    name="root_router",
    model="gemini-2.0-flash",
    description="Router agent that delegates to joke, song, or poem generators.",
    instruction=router_instruction,
    sub_agents=sub_agents,
    output_key="final_response",
    before_model_callback=on_before_model_callback
)

# --- Set root agent for the web user interface ---
root_agent = router_agent

# --- Execution Helpers ---
def call_agent(prompt: str):
    """
    Call the router agent with a user prompt and print the response.
    """
    print(Panel.fit(f"[bold white]User Prompt:[/bold white] {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        if event.is_final_response() and event.content:
            response = event.content.parts[0].text
            print(Panel.fit(f"[bold green]{event.author}:[/bold green] {response}", title="🤖"))


def inspect_state():
    """
    Print the internal session state.
    """
    state = session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID).state
    print(Panel.fit("[bold yellow]Session State[/bold yellow]"))
    for key, value in state.items():
        print(f"[cyan]{key}[/cyan]: {value}")


# --- Entry Point ---
if __name__ == '__main__':
    APP_NAME = "joke_generator_app"
    USER_ID = "dev_user_01"
    SESSION_ID = "dev_user_session_01"

    # --- Session & Runner Setup ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()

    session_service.create_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )

    runner = Runner(
        agent=router_agent,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service
    )

    try:
        topic = "robots"
        call_agent(f"write a poem about {topic}")
        inspect_state()
    except Exception as e:
        print(Panel.fit(f"[bold red]Error:[/bold red] {str(e)}", title="❌"))

```

## Workflow: Parallelization

The parallelization pattern allows multiple LLMs to work concurrently on a task, with their outputs combined through programmatic aggregation. This approach typically takes two main forms:

**Sectioning:** Dividing a task into distinct, independent components that can be handled in parallel
**Voting:** Running the same task multiple times to gather diverse perspectives and aggregate results for higher confidence

**When to use this pattern:**

Parallelization is ideal when tasks can be broken into parts that are either independent or benefit from multiple viewpoints. It’s especially effective for increasing speed by distributing workload or for improving accuracy in complex evaluations by isolating specific dimensions of a problem across separate LLM calls.

:::tip[Example applications]
**Sectioning:**

* Generating a multi-part report where each section (e.g., summary, key findings, recommendations) is written by a different LLM call
* Creating localized versions of a product description, with one model instance handling cultural adaptation per target market in parallel
* Conducting a multi-faceted sentiment analysis, where separate LLM calls assess tone, emotional intensity, and subjectivity individually

**Voting:**

* Rewriting a paragraph for clarity and running several prompts with slight variations, then selecting the best version via ranking or consensus
* Classifying user feedback as actionable or non-actionable using multiple interpretations, then aggregating to reduce classification errors
* Diagnosing possible root causes from system logs by prompting the model with different framing strategies and combining insights
:::


**ADK Implementation:**

In this example, we implement a parallel agent that generates a joke, song, and poem concurrently based on the user prompt. The outputs are then merged into a structured response.

```python
from dotenv import load_dotenv
from rich import print
from rich.panel import Panel
from typing import List, Dict, Optional

from google.adk import Runner
from google.adk.agents import LlmAgent, ParallelAgent, SequentialAgent
from google.adk.agents.callback_context import CallbackContext
from google.adk.artifacts import InMemoryArtifactService
from google.adk.models import LlmRequest, LlmResponse
from google.adk.sessions import InMemorySessionService
from google.genai import types

# --- Load Environment ---
load_dotenv()

# --- Constants ---
BLOCKED_KEYWORDS = ["bruno"]

# --- Task Definitions ---
TASK_CONFIGS: List[Dict[str, str]] = [
    {
        "name": "joke_generator",
        "description": "Generate a joke",
        "instruction": "Generate a joke based on the user prompt",
        "output_key": "joke"
    },
    {
        "name": "song_generator",
        "description": "Generate a song",
        "instruction": "Generate a song based on the user prompt",
        "output_key": "song"
    },
    {
        "name": "poem_generator",
        "description": "Generate a poem",
        "instruction": "Generate a poem based on the user prompt",
        "output_key": "poem"
    },
]

# --- Callback Guardrail ---
def on_before_model_callback(callback_context: CallbackContext, llm_request: LlmRequest) -> Optional[LlmResponse]:
    """
    Guardrail to block LLM execution for specific banned phrases.
    """
    prompt = llm_request.contents[0].parts[0].text.lower()
    print(Panel.fit(f"[bold magenta]Agent:[/bold magenta] {callback_context.agent_name}\n[bold cyan]Prompt:[/bold cyan] {prompt}"))

    for banned in BLOCKED_KEYWORDS:
        if banned in prompt:
            return LlmResponse(
                content=types.Content(
                    role="model",
                    parts=[types.Part(text=f"LLM call blocked. We don't talk about {banned.capitalize()}!!")]
                )
            )
    return None


# --- Helper: Create Agent from Task Config ---
def create_task_handler_agent(task: Dict[str, str]) -> LlmAgent:
    return LlmAgent(
        name=task["name"],
        description=task["description"],
        model="gemini-2.0-flash",
        global_instruction=f"You are a {task['description'].lower()} generator.",
        instruction=task["instruction"],
        output_key=task["output_key"],
        generate_content_config=types.GenerateContentConfig(temperature=1.0),
        before_model_callback=on_before_model_callback
    )

# --- Create Sub-agents ---
sub_agents = [create_task_handler_agent(task) for task in TASK_CONFIGS]

# --- Aggregator (Parallel Execution) ---
aggregator_agent = ParallelAgent(
    name="ParallelGenerator",
    sub_agents=sub_agents,
    description="Run joke, song, and poem generators in parallel based on the user prompt."
)

# --- Merger Agent ---
merger_agent = LlmAgent(
    name="merger_agent",
    description="Merge the outputs of the sub-agents into a structured response.",
    model="gemini-2.0-flash",
    global_instruction="You are a merger agent.",
    instruction=(
        "Your task is to merge the outputs of multiple sub-agents into a single, coherent, and structured response.\n\n"
        "- Do **not** add any external information, context, or commentary.\n"
        "- Use **only** the provided inputs: {joke}, {song}, and {poem}.\n"
        "- Maintain the exact order and structure specified below.\n\n"
        "### Joke:\n{joke}\n\n"
        "### Song:\n{song}\n\n"
        "### Poem:\n{poem}\n\n"
        "Instructions:\n"
        "- Do **not** include any introductory or concluding phrases.\n"
        "- Do **not** modify, interpret, or enhance the content of the inputs.\n"
        "- Strictly follow the format above and output only the merged content as shown."
    ),
    output_key="merged_response",
    generate_content_config=types.GenerateContentConfig(temperature=0.5),
)

# --- Root Agent (Sequential Flow) ---
root_agent = SequentialAgent(
    name="root_agent",
    sub_agents=[aggregator_agent, merger_agent],
    description="Coordinates generation and merging of joke, song, and poem."
)


# --- Interaction Functions ---
def call_agent(prompt: str):
    """
    Send a prompt to the root agent and print structured results.
    """
    print(Panel.fit(f"[bold white]User Prompt:[/bold white] {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        if event.is_final_response() and event.content:
            print(Panel.fit(f"[bold green]{event.author}:[/bold green]\n{event.content.parts[0].text}", title="🤖"))

def inspect_state():
    """
    Print the internal state of the session.
    """
    state = runner.session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID).state
    print(Panel.fit("[bold yellow]Session State[/bold yellow]"))
    for key, value in state.items():
        print(f"[cyan]{key}[/cyan]: {value}")

# --- Main ---
if __name__ == '__main__':
    APP_NAME = "joke_generator_app"
    USER_ID = "dev_user_01"
    SESSION_ID = "dev_user_session_01"

    # --- Session & Runner Setup ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()

    session_service.create_session(
        app_name=APP_NAME,
        user_id=USER_ID,
        session_id=SESSION_ID
    )

    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service
    )

    call_agent("Please generate something funny and poetic.")
    inspect_state()
```

## Workflow: Orchestrator-workers

The **orchestrator–worker pattern** involves a central LLM Agent (the orchestrator) that interprets the input, dynamically decomposes the task into subtasks, assigns these to specialized worker LLMs, and then integrates their outputs into a final result.

**When to use this pattern:**

This workflow is ideal for complex, open-ended tasks where the structure and number of subtasks can’t be known in advance. Unlike parallelization, where subtasks are predefined and run concurrently, the orchestrator–worker setup offers greater adaptability—the orchestrator decides what needs to be done based on the specific input context.

:::tip[Example applications]
- Writing a grant proposal where the orchestrator delegates background research, impact justification, and formatting to different LLM calls based on the application requirements
- Preparing a competitive market analysis, where the orchestrator identifies key competitors, then assigns each to a worker to extract data, analyze strategies, and compare strengths
- Automating legal document review, where the orchestrator dynamically assigns sections (e.g., clauses, terms, jurisdictional elements) to worker agents depending on the document type and structure
:::

**ADK Implementation:**

In this example, we implement an orchestrator agent that coordinates the generation of a joke, song, and poem based on the user prompt/topic. The orchestrator dynamically assigns tasks to worker agents and merges their outputs into a final response.

```python
from typing import AsyncGenerator, List, Dict, Optional
from dotenv import load_dotenv
from rich import print
from rich.panel import Panel

from google.adk import Runner
from google.adk.agents import LlmAgent, LoopAgent, BaseAgent
from google.adk.agents.callback_context import CallbackContext
from google.adk.agents.invocation_context import InvocationContext
from google.adk.artifacts import InMemoryArtifactService
from google.adk.models import LlmRequest, LlmResponse
from google.adk.sessions import InMemorySessionService
from google.adk.events import Event, EventActions
from google.genai import types

# Load .env file
load_dotenv()


# --- Task Definitions ---
TASK_CONFIGS: List[Dict[str, str]] = [
    {
        "name": "joke_generator",
        "instruction": "Generate a joke based on the user prompt",
        "output_key": "joke"
    },
    {
        "name": "song_generator",
        "instruction": "Generate a song based on the user prompt",
        "output_key": "song"
    },
    {
        "name": "poem_generator",
        "instruction": "Generate a poem based on the user prompt",
        "output_key": "poem"
    },
]

# --- Guardrail Callback ---
def on_before_model_callback(callback_context: CallbackContext, llm_request: LlmRequest) -> Optional[LlmResponse]:
    """
    Intercepts the prompt before sending it to the model. Useful for filtering or logging.
    Blocks LLM call if restricted keyword is present.
    """
    prompt = llm_request.contents[0].parts[0].text
    if "bruno" in prompt.lower():
        return LlmResponse(
            content=types.Content(
                role="model",
                parts=[types.Part(text="LLM call was blocked. We don't talk about Bruno!!")],
            )
        )
    return None

# --- Agent Factory ---
def create_task_handler_agent(task: Dict[str, str]) -> LlmAgent:
    """
    Creates an LLM Agent from a task configuration dictionary.
    Each task must include: name, instruction, and output_key.
    """
    return LlmAgent(
        name=task["name"],
        description=f"Generate a {task['output_key']}",
        model=task.get("model", "gemini-2.0-flash"),
        global_instruction=task.get("global_instruction", f"You are a {task['output_key']} generator."),
        instruction=task["instruction"],
        output_key=task["output_key"],
        generate_content_config=types.GenerateContentConfig(
            temperature=task.get("temperature", 1.0)
        ),
        before_model_callback=on_before_model_callback,
    )

# --- Create Agents from Configs ---
task_handler_agents = [create_task_handler_agent(task) for task in TASK_CONFIGS]

# --- Generic CheckCondition Agent ---
class CheckCondition(BaseAgent):
    output_keys : List[str] = []

    async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
        is_done = all(ctx.session.state.get(key) is not None for key in self.output_keys)
        yield Event(author=self.name, actions=EventActions(escalate=is_done))

# --- Setup Orchestrator Agent ---
output_keys = [task["output_key"] for task in TASK_CONFIGS]

orchestrator_agent = LoopAgent(
    name="coordinator_agent",
    max_iterations=10,
    sub_agents=task_handler_agents + [CheckCondition(name="Checker", output_keys=output_keys)]
)

# --- Set root agent for the web user interface ---
root_agent = orchestrator_agent


# --- Agent Interaction Functions ---
def call_agent(prompt: str):
    """
    Trigger the orchestrator with a prompt.
    """
    print(Panel.fit(f"[bold white]User Prompt:[/bold white] {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        if event.is_final_response() and event.content:
            response = event.content.parts[0].text
            print(Panel.fit(f"[bold green]{event.author}:[/bold green] {response}", title="🤖"))

def inspect_state():
    """
    Print session state from memory.
    """
    state = runner.session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID).state
    print(Panel.fit("[bold yellow]Session State[/bold yellow]"))
    for key, value in state.items():
        print(f"[cyan]{key}[/cyan]: {value}")

# --- Main Entry Point ---
if __name__ == '__main__':
    # --- Constants ---
    APP_NAME = "joke_generator_app"
    USER_ID = "dev_user_01"
    SESSION_ID = "dev_user_session_01"

    # --- Session & Runner Setup ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()
    session_service.create_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )

    runner = Runner(
        agent=orchestrator_agent,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service,
    )

    call_agent("Robots")
    # inspect_state()
```

## Workflow: Evaluator-optimizer

The **evaluator–optimizer pattern** involves two roles: one LLM generates an initial output, while another evaluates and provides structured feedback. This feedback is then used to refine the response in an iterative loop, gradually improving quality with each cycle.

**When to use this pattern:**

This workflow is particularly useful when there are well-defined criteria for what makes a response “good,” and when multiple iterations are likely to produce significant improvements. It’s especially effective in scenarios where human feedback would clearly help—but instead, the LLM can act as the evaluator itself. The process mirrors how a writer might draft, receive feedback, and revise a document to improve clarity, tone, or content.

:::tip[Example applications]
- Crafting persuasive essays or position statements, where an evaluator LLM critiques argument strength, coherence, and tone before another round of revision
- Designing user-facing chatbot replies for customer support, where the evaluator checks for tone, helpfulness, and policy compliance
- Developing instructional content, such as tutorials or lesson plans, where the evaluator verifies clarity, pedagogical soundness, and alignment with learning objectives
:::

**ADK Implementation:**

In this example, we implement a code refinement workflow where one agent generates code based on user requirements, while another evaluates the code against those requirements. The process iterates until the code meets the quality standards.


```python
from typing import AsyncGenerator
from rich import print
from rich.panel import Panel
from google.adk import Runner
from google.adk.agents import LlmAgent, LoopAgent, BaseAgent
from google.adk.agents.invocation_context import InvocationContext
from google.adk.artifacts import InMemoryArtifactService
from google.adk.events import Event, EventActions
from google.adk.sessions import InMemorySessionService
from google.genai import types
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# --- Agent Definitions ---
def create_code_refiner() -> LlmAgent:
    return LlmAgent(
        name="CodeRefiner",
        model="gemini-2.0-flash",
        instruction=(
            "Read `state['current_code']` (if present) and `state['requirements']`. "
            "Generate or refine Python code to meet the requirements, "
            "then store the result in `state['current_code']`."
        ),
        output_key="current_code"
    )

def create_quality_checker() -> LlmAgent:
    return LlmAgent(
        name="QualityChecker",
        model="gemini-2.0-flash",
        instruction=(
            "Evaluate the code in `state['current_code']` against `state['requirements']`. "
            "If the code meets the requirements, output 'pass'; otherwise, output 'fail'."
        ),
        output_key="quality_status"
    )

class CheckStatusAndEscalate(BaseAgent):
    """
    Terminates the loop when the quality check passes.
    """
    async def _run_async_impl(self, ctx: InvocationContext) -> AsyncGenerator[Event, None]:
        status = ctx.session.state.get("quality_status", "fail")
        should_stop = status.strip().lower() == "pass"
        yield Event(author=self.name, actions=EventActions(escalate=should_stop))

# --- Loop Agent ---
refinement_loop = LoopAgent(
    name="CodeRefinementLoop",
    max_iterations=5,
    sub_agents=[
        create_code_refiner(),
        create_quality_checker(),
        CheckStatusAndEscalate(name="StopChecker")
    ]
)

# --- Set root agent for the web user interface ---
root_agent = refinement_loop

def call_agent(prompt: str):
    """
    Send user input to the orchestrator agent and stream responses.
    """
    print(Panel.fit(f"[bold white]User Prompt[/bold white]: {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        if event.is_final_response() and event.content:
            response = event.content.parts[0].text
            print(Panel.fit(f"[bold green]{event.author}:[/bold green] {response}", title="🤖"))

def inspect_state():
    """
    Print the internal session state.
    """
    state = session_service.get_session(app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID).state
    print(Panel.fit("[bold yellow]Session State[/bold yellow]"))
    for key, value in state.items():
        print(f"[cyan]{key}[/cyan]:\n{value}\n")

# --- Entry Point ---
if __name__ == '__main__':
    # --- Constants ---
    APP_NAME = "code_refinement_app"
    USER_ID = "user_123"
    SESSION_ID = "session_456"

    # --- Services ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()

    session = session_service.create_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )

    # --- Runner Setup ---
    runner = Runner(
        agent=refinement_loop,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service,
    )
    call_agent("Write a Python function that calculates the factorial of a number."
               "Make sure to add type hints to the function parameters and return type.")
    # inspect_state()

```

## Agents

As LLMs gain capabilities in reasoning, planning, tool use, and error recovery, agents are becoming practical for production use. Agents typically start from a user command or conversation, then plan and act autonomously—looping through tool use, feedback, and self-correction. They may pause for human input when encountering uncertainty or reaching checkpoints, and they rely on real-time feedback (e.g., tool outputs) to stay grounded.
Despite their ability to tackle complex, open-ended problems, agents are often simple in implementation—frequently just an LLM operating within a loop, using tools and adjusting based on observed outcomes. For this reason, careful tool design and clear documentation are critical.

**When to use this pattern**: 

Use agents for open-ended tasks with unpredictable steps, where hardcoding logic is impractical. They’re ideal in trusted environments requiring autonomy over multiple iterations.

:::warning

The autonomous nature of agents means higher costs, and the potential for compounding errors. We recommend extensive testing in sandboxed environments, along with the appr

:::

:::tip[Examples of Agent Use]

- A **research assistant agent** that autonomously gathers, filters, and summarizes information from multiple sources
- A **data cleaning agent** that iteratively inspects a dataset, flags issues, and proposes structured fixes based on schema rules
:::


**ADK Implementation:**

In this example, we implement a code execution agent that generates and executes Python code based on user input. The agent uses the built-in code execution tool to run the generated code and return the results.

```python
import io

from PIL import Image
from dotenv import load_dotenv
from google.adk import Runner
from google.adk.agents import LlmAgent
from google.adk.artifacts import InMemoryArtifactService
from google.adk.sessions import InMemorySessionService
from google.adk.tools import built_in_code_execution
from google.genai import types
from rich import print
from rich.panel import Panel

# Load .env file
load_dotenv()


root_agent = LlmAgent(
    name="CodeAgent",
    model="gemini-2.0-flash",
    tools=[built_in_code_execution],
    instruction="""You are a calculator agent.
    When given a mathematical expression, function, or task, write and EXECUTE the Python code to obtain the result.
    """,
    description="Executes Python code to perform calculations.",
)

def call_agent(prompt: str):
    """
    Send user input to the orchestrator agent and stream responses.
    """
    # --- Services ---
    session_service = InMemorySessionService()
    artifact_service = InMemoryArtifactService()
    session = session_service.create_session(
        app_name=APP_NAME, user_id=USER_ID, session_id=SESSION_ID
    )
    # --- Runner Setup ---
    runner = Runner(
        agent=root_agent,
        app_name=APP_NAME,
        session_service=session_service,
        artifact_service=artifact_service,
    )
    print(Panel.fit(f"[bold white]User Prompt[/bold white]: {prompt}", title="👤"))
    content = types.Content(role="user", parts=[types.Part(text=prompt)])
    events = runner.run(user_id=USER_ID, session_id=SESSION_ID, new_message=content)

    for event in events:
        # --- Check for specific parts FIRST ---
        has_specific_part = False
        if event.content and event.content.parts:
            for part in event.content.parts:  # Iterate through all parts
                if part.executable_code:
                    # Access the actual code string via .code
                    print(f"  Debug: Agent generated code:\n```python\n{part.executable_code.code}\n```")
                    has_specific_part = True
                elif part.code_execution_result:
                    # Access the code execution result for debugging
                    print(f"  Debug: Code Execution Result: {part.code_execution_result.outcome} - Output:\n{part.code_execution_result.output}")
                    has_specific_part = True
                elif part.inline_data:
                    # Access the inline data (e.g., image) and display it
                    if part.inline_data.mime_type == "image/png":
                        # Access the image data and display it
                        image_data = part.inline_data.data
                        image = Image.open(io.BytesIO(image_data))
                        image.show()
                # Also print any text parts found in any event for debugging
                elif part.text and not part.text.isspace():
                    print(f"  Text: '{part.text.strip()}'")
                    # Do not set has_specific_part=True here, as we want the final response logic below

        # --- Check for final response AFTER specific parts ---
        # Only consider it final if it doesn't have the specific code parts we just handled
        if not has_specific_part and event.is_final_response():
            if event.content and event.content.parts and event.content.parts[0].text:
                final_response_text = event.content.parts[0].text.strip()
                print(f"==> Final Agent Response: {final_response_text}")
            else:
                print("==> Final Agent Response: [No text content in final event]")


# --- Entry Point ---
if __name__ == '__main__':
    # --- Constants ---
    APP_NAME = "code_refinement_app"
    USER_ID = "user_123"
    SESSION_ID = "session_456"


    call_agent("Generates an array of 1000 random numbers from a normal distribution with mean 0 and standard deviation 1, "
               "create a histogram of the data, and "
               "save the histogram as a PNG file plot.png")

```

## Key Differences and Summary

To help you choose the right pattern for your use case, the table below summarizes the core ideas, ideal use cases, and ADK components for each of Anthropic’s agent design patterns. This comparison highlights the trade-offs between structure, flexibility, and autonomy when building LLM-powered systems.

| **Pattern**             | **Core Idea**                                                                 | **When to Use**                                                                                     | **ADK Agent Types**              |
|-------------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|----------------------------------|
| 🔁 Prompt Chaining       | Break a task into sequential steps where each step builds on the last        | Tasks with clear, fixed subtasks that benefit from intermediate validation                          | `SequentialAgent`               |
| 🔀 Routing               | Classify input and delegate to specialized agents                             | Inputs that fall into distinct categories requiring tailored responses                              | `LlmAgent` with `sub_agents`    |
| ⚡ Parallelization        | Run tasks concurrently and aggregate results via sectioning or voting         | Tasks that benefit from speed or multiple perspectives                                               | `ParallelAgent` + merger agent  |
| 🧠 Orchestrator–Worker   | Dynamically break down tasks and assign to sub-agents                          | Tasks where subtasks are not known in advance and depend on the input                               | `LoopAgent` or custom loop + `LlmAgent` workers |
| 🧪 Evaluator–Optimizer   | Use one agent to generate, and another to evaluate and refine                 | When iterative improvement is valuable and evaluation criteria are well-defined                     | `LoopAgent` + `LlmAgent` evaluator |
| 🤖 Autonomous Agents     | LLMs operate independently, using tools and state in a reasoning loop         | Open-ended tasks with unclear paths or evolving context over multiple turns                         | `LoopAgent` with memory + tools |


## Conclusion

This post explored Anthropic’s agent design patterns and demonstrated how to implement them using Google’s Agent Development Kit (ADK). Each pattern was accompanied by hands-on examples—from prompt chaining to complex orchestrator–worker setups—showcasing how to build LLM agents capable of handling a wide range of tasks.
While Anthropic’s original post emphasizes that many of these patterns can be implemented in just a few lines of code using direct LLM APIs—allowing developers to avoid the overhead of complex frameworks:

:::quote[Anthropic]

We've worked with dozens of teams building LLM agents across industries. Consistently, the most successful implementations use simple, composable patterns rather than complex frameworks....We suggest that developers start by using LLM APIs directly as many patterns can be implemented in a few lines of code. If you do use a framework, ensure you understand the underlying code. Incorrect assumptions about what's under the hood are a common source of customer error.
::::

It’s also important to recognize the practical advantages that frameworks can offer—particularly as agentic systems grow in complexity and scale. Tools like Google’s ADK, LangGraph, and others provide essential capabilities out of the box, including state persistence across sessions, streaming support for long-running interactions, built-in observability and debugging tools, along with deployment-ready infrastructure. These features can greatly accelerate development, improve reliability, and simplify the orchestration of complex, multi-agent workflows in real-world applications.

In short, while starting simple is often the right approach, thoughtfully leveraging a framework can help you move faster and build more robust, scalable agentic systems.

In future posts, we’ll explore more advanced topics in agent design and implementation, including how to build agents that can learn from user interactions, adapt to changing environments, and collaborate with other agents. We’ll also explore more of ADK’s capabilities through real-world use cases and end-to-end implementations.

Thanks for reading! We hope this guide offered useful insights and practical tools to support your journey in building smarter, more capable LLM agents.
All code examples are available in the [Agents Experiments repository.](https://github.com/haruiz/agents-experiments).
For more on ADK, check out the [official documentation](https://google.github.io/adk-docs/).

## References
<ul>
  <li>
    <a id="anthropic:1" href="https://www.anthropic.com/engineering/building-effective-agents" target="_blank">
      [1] Anthropic (2024). Building Effective Agents.
    </a>
  </li>
  <li>
    <a id="adk:1" href="https://google.github.io/adk-docs/" target="_blank">
      [2] Agent Development Kit (ADK)
    </a>
  </li>
  <li>
    <a id="langgraph:1" href="https://langchain-ai.github.io/langgraph/tutorials/workflows/#agent" target="_blank">
      [3] LangGraph Tutorials – Workflows and Agents
    </a>
  </li>
</ul>

