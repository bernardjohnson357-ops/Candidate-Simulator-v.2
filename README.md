# Candidate-Simulator-v.2

---

🗳 Federal Candidate Simulator – AI Edition

Welcome to the Federal Candidate Simulator, an interactive training tool that walks users through the process of running for federal office in the United States.
The simulator uses AI-driven narration, tasks, and decision-making to teach participants about filing requirements, compliance, fundraising, campaigning, and voter engagement — all in a safe, hands-on environment.


---

🚀 Features

Interactive Learning Modules: Step-by-step journey through an election cycle.

Candidate Metrics: Track your Candidate Coins (CC), Signatures, and Voter Approval as you make decisions.

Dynamic Narration: Optional AI narration and text-based prompts.

Branching Choices: Different offices (President, Senate, House) with unique requirements and challenges.

Expandable Content: Modules are stored in JSON files for easy editing and contribution.



---

📸 Screenshots & Demo

Home Screen


Landing page with module selection.

Simulator in Action


Example of interactive narration and tasks.

Candidate Metrics


Candidate Coins, Signatures, and Voter Approval tracking in real time.

Demo GIF


A quick walkthrough of Module 0 (Orientation).

> 📝 Note: Replace these placeholders with actual screenshots/GIFs stored in docs/screenshots/.




---

📂 Project Structure

app/
 ├── components/       # React components (UI, simulator, module display, etc.)
 ├── data/             # JSON-based modules (module0.json, module1.json, …)
 ├── utils/            # Utilities (audio, candidate simulator logic, etc.)
 └── page.tsx          # Main entry point


---

🛠️ Installation & Setup

1. Clone the repo:

git clone https://github.com/your-username/federal-candidate-simulator.git
cd federal-candidate-simulator


2. Install dependencies:

npm install


3. Run the development server:

npm run dev


4. Open in your browser:

http://localhost:3000




---

📚 How to Use

Launch the app and start at Module 0 – Orientation.

Read or listen to the narration.

Complete tasks and make decisions that affect your CC, signatures, and approval.

Advance through modules to simulate a complete federal campaign.



---

📝 Adding New Modules

Modules are stored in app/data/modules/.
Each module is a JSON file with this structure:

{
  "id": 0,
  "title": "Orientation & Introduction",
  "narration": "Welcome to the Federal Candidate Simulator...",
  "tasks": [
    {
      "id": "task1",
      "type": "read",
      "prompt": "This is your first task..."
    }
  ]
}

To add a new module:

1. Create a new JSON file (e.g., module1.json).


2. Add it to modules.json so the simulator can load it.




---

🤝 Contributing

1. Fork the repo and create a feature branch.


2. Add/edit modules or improve the UI/UX.


3. Submit a pull request with a clear description of your changes.




---

⚖️ Disclaimer

This simulator is an educational tool only. It does not provide legal, financial, or campaign advice. Always consult official sources (e.g., the Federal Election Commission) for real requirements.


---
