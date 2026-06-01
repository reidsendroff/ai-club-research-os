from __future__ import annotations

import base64
import os
from pathlib import Path


ASSETS = Path(r"C:\Projects\AI_Club_Brain\outputs\manual-20260531-ai-club-june1\presentations\leadership-project-showcase\assets")

PROMPTS = {
    "classroom": "Dark cinematic photograph-style scene of high school students presenting an AI project demo in a modern classroom, laptops glowing, blue technical UI light, realistic, no readable text.",
    "demo": "Dark realistic scene of an AI project showcase, students around laptops, projection screen glow, focused collaborative energy, blue and teal lighting, no readable text.",
    "coding": "Cinematic close-up of an agentic coding workspace, laptop with abstract code-like interface, GitHub-inspired repo panels, dark blue grid aesthetic, no readable text.",
    "technical": "Abstract technical operations dashboard for an AI club, dark grid, code windows, database nodes, automation workflow feel, blue and teal accents, no readable text.",
    "competition": "High school AI hackathon competition atmosphere, laptops, project scoreboard shapes, energetic but serious, dark blue cinematic lighting, no readable text.",
    "team": "Small student technical team building an AI product around laptops, realistic classroom workspace, dark blue and teal lighting, collaborative, no readable text.",
}


def main() -> None:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise SystemExit("OPENAI_API_KEY is not set. Set it, then rerun this script.")

    try:
        from openai import OpenAI
    except ImportError as exc:
        raise SystemExit("Install the OpenAI Python package first: pip install openai") from exc

    ASSETS.mkdir(parents=True, exist_ok=True)
    client = OpenAI(api_key=api_key)

    for name, prompt in PROMPTS.items():
        out = ASSETS / f"{name}_gpt_image.png"
        if out.exists():
            print(f"skip existing {out}")
            continue
        result = client.images.generate(
            model="gpt-image-1.5",
            prompt=prompt,
            size="1536x1024",
            quality="medium",
            n=1,
        )
        image_b64 = result.data[0].b64_json
        out.write_bytes(base64.b64decode(image_b64))
        print(f"wrote {out}")


if __name__ == "__main__":
    main()
