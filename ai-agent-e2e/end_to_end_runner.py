import asyncio
import datetime
import logging
import os
import sys

from dotenv import load_dotenv

from browser_use import Agent, Browser
from prompts import ALL_PROMPTS

load_dotenv()

logging.basicConfig(level=logging.INFO)
TIMESTAMP = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")


def build_llm():
    provider = os.getenv("LLM_PROVIDER", "google").lower()
    temperature = float(os.getenv("LLM_TEMPERATURE", "0.3"))

    if provider == "google":
        from langchain_google_genai import ChatGoogleGenerativeAI

        model = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        llm = ChatGoogleGenerativeAI(model=model, temperature=temperature)
        return llm, f"google-{model}", True

    if provider == "groq":
        from langchain_groq import ChatGroq

        model = os.getenv("GROQ_MODEL", "llama-3.3-70b-versatile")
        llm = ChatGroq(model=model, temperature=temperature)
        return llm, f"groq-{model}", False

    raise ValueError(f"Unknown LLM_PROVIDER: {provider}. Use 'google' or 'groq'.")


async def run_scenario(prompt, llm, model_name, use_vision, browser):
    logging.info("Running scenario: %s (model=%s) ", prompt.scenario_name, model_name)
    agent = Agent(
        task=prompt.content,
        llm=llm,
        browser=browser,
        generate_gif=True,
        use_vision=use_vision,
        save_conversation_path=f"e2elogs/{model_name}/{prompt.scenario_name}/{TIMESTAMP}",
    )
    await agent.run(max_steps=15)


async def main():
    name_filter = sys.argv[1] if len(sys.argv) > 1 else None
    prompts = [p for p in ALL_PROMPTS if not name_filter or name_filter in p.scenario_name]
    if not prompts:
        logging.warning("No scenarios matched filter '%s'.", name_filter)
        return

    llm, model_name, use_vision = build_llm()
    browser = Browser()
    try:
        for prompt in prompts:
            await run_scenario(prompt, llm, model_name, use_vision, browser)
    finally:
        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())