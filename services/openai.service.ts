import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// to ingest documents
import { MemoryVectorStore } from "langchain/vectorstores/memory";
// to create Document chain
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import * as zod from "zod";
import { genPostSchema } from "@/components/post-questionnaire/validation";
import { getPromptFromVibe } from "./openai-helper";
import { OpenAIStream } from "ai";
import { WebBrowser } from "langchain/tools/webbrowser";

import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";

class PostGenerator {
  static instance: PostGenerator;

  #chain: any;
  //RunnableSequence<any, BaseMessageChunk>
  #chatModel: any;
  #outputParser: any;

  constructor() {
    // prompt for the document chain

    this.#chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      maxTokens: 25,
    });
    this.#outputParser = new StringOutputParser();
  }

  async fetchWebContent(url: string) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      // Process the text as needed, e.g., extract relevant information
      return text;
    } catch (error) {
      console.error("Error fetching web content:", error);
      return "";
    }
  }

  async generatePostFromDocs() {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const loader = new CheerioWebBaseLoader(
      "https://docs.smith.langchain.com/overview"
    );

    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);

    console.log(splitDocs.length);
    console.log(splitDocs[0].pageContent.length);

    // initializing embedding vector
    const embeddings = new OpenAIEmbeddings();

    // ingesting document to embedding vector
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    // prompt for the document chain
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a world class digital content writer.
        
        When I ask for help to write something, you will reply with a where each paragraph contains at least one joke or playful comment.`,
      ],
      [
        "user",
        `Write a social media post for {socialMedia}. Start your response with small but eye catchy summary and then explain the topic in detail.

      topic: {topic}`,
      ],
    ]);

    // creating document chain
    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });

    // retriever to dynamically select the most relevant documents
    const retriever = vectorstore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    const result = await retrievalChain.invoke({
      input: "what is LangSmith?",
    });

    // console.log(result.answer);
    return result.answer;
  }

  async browsingTool() {
    const model = new ChatOpenAI({ temperature: 0 });
    const embeddings = new OpenAIEmbeddings(
      process.env.AZURE_OPENAI_API_KEY
        ? { azureOpenAIApiDeploymentName: "Embeddings2" }
        : {}
    );

    const browser = new WebBrowser({ model, embeddings });

    const result = await browser.call(
      `"https://www.themarginalian.org/2015/04/09/find-your-bliss-joseph-campbell-power-of-myth","who is joseph campbell"`
    );

    console.log(result);
  }

  async generatePost(data: zod.infer<typeof genPostSchema>) {
    const promptTemplate = getPromptFromVibe(data);

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const embeddings = new OpenAIEmbeddings(
      process.env.AZURE_OPENAI_API_KEY
        ? { azureOpenAIApiDeploymentName: "Embeddings2" }
        : {}
    );

    const model = new ChatOpenAI({ temperature: 0 });
    const browser = new WebBrowser({ model, embeddings });

    const result = await browser.call(
      `"https://satria.ai/blog/integrating-openai-api-in-nextjs-14"`
    );

    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        ...promptTemplate,
      ],
    });

    const stream = OpenAIStream(response);
    return stream;
  }
}

export const postGenerator = new PostGenerator();
