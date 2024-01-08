## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## LLM reference Notes:
1. Prompt to pass to system for funny post creation.
```
When I ask for help to write something, you will reply with a document that contains at least one joke or playful comment in every paragraph.
```

2. Must-have Prompt to add on the top of each
```
First Generate the title for each social media post. This title should give the reader a good idea of the topic of the post but should also be eye-catching.
```

3. Adding step by step instructions
```
Use the following step-by-step instructions to respond to user inputs.

Step 1 - ...

Step 2 - ...
```

4. User prompt for words limit
```

Summarize the text delimited by triple quotes in about 50 words.
```

